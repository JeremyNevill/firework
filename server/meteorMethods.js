Meteor.methods({

    // Create Secret Key and API Token
    createToken: function () {

        // Create new secret
        var newSecret = "";
        var potentialValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 16; i++) {
            newSecret += potentialValues.charAt(Math.floor(Math.random() * potentialValues.length));
        }

        // Create new token using secret and the user id as payload
        var jwt = Meteor.npmRequire('jwt-simple');
        var payload = {
            userid: Meteor.user()._id
        };
        var newToken = jwt.encode(payload, newSecret);

        // Update Profile with secret and token
        Meteor.users.update({
            _id: Meteor.user()._id
        }, {
                $set: {
                    "profile.apiSecret": newSecret
                }
            })
        Meteor.users.update({
            _id: Meteor.user()._id
        }, {
                $set: {
                    "profile.apiToken": newToken
                }
            })
    },


    // Reset Stats
    statsReset: function () {
        console.log("Stats Reset");

        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // Reset Actor Counts
        var userActors = Actors.find({
            owner: Meteor.userId
        }).fetch();
        var actorCount = userActors.length;
        for (var i = 0; i < actorCount; i++) {
            var actor = userActors[i];
            var actorItems = Items.find({
                owner: Meteor.userId,
                actor: actor.actor
            }).fetch();
            var itemCount = actorItems.length;

            console.log(actor.actor + ' - ' + itemCount);

            Actors.update({
                "actor": actor.actor,
                "owner": Meteor.userId
            }, {
                    $set: {
                        "itemCount": itemCount
                    }
                });
        }

        // Reset Action Counts
        var userActions = Actions.find({
            owner: Meteor.userId
        }).fetch();
        var actionCount = userActions.length;
        for (var i = 0; i < actionCount; i++) {
            var action = userActions[i];
            var actionItems = Items.find({
                owner: Meteor.userId,
                action: action.action
            }).fetch();
            var actionItemCount = actionItems.length;

            console.log(action.action + ' - ' + itemCount);

            Actions.update({
                "action": action.action,
                "owner": Meteor.userId
            }, {
                    $set: {
                        "itemCount": actionItemCount
                    }
                });
        }

        // Reset UNITS Counts
        var userUnits = Units.find({
            owner: Meteor.userId
        }).fetch();
        var unitsCount = userUnits.length;
        for (var i = 0; i < unitsCount; i++) {
            var units = userUnits[i];
            var unitsItems = Items.find({
                owner: Meteor.userId,
                units: units.unit
            }).fetch();
            var unitsItemCount = unitsItems.length;

            console.log(units.unit + ' - ' + itemCount);

            Units.update({
                "unit": units.unit,
                "owner": Meteor.userId
            }, {
                    $set: {
                        "itemCount": unitsItemCount
                    }
                });
        }

        console.log('Stats Update Complete');
    },


    // Add Item Via the API
    addApiItem: function (token, userid, actor, action, amount, units, date) {

        var user = Meteor.users.findOne(userid);
        var secretKey = user.profile.apiSecret;

        // decode the jwt
        var jwt = Meteor.npmRequire('jwt-simple');
        var decoded = jwt.decode(token, secretKey);

        if (decoded.userid === userid) {

            // Upsert actor, action, units
            Meteor.call("upsertActor", actor, user._id);
            Meteor.call("upsertAction", action, user._id);
            Meteor.call("upsertUnits", units, user._id);

            var momentDate = moment(date);

            // If the user matches the encoded JWT version 
            // Add the item
            var newItemId = Items.insert({
                actor: actor,
                action: action,
                amount: amount,
                units: units,
                date: momentDate.toDate(),
                createdAt: new Date(),
                owner: user._id,
                private: true,
                username: user.username
            });

            Meteor.call("incrementItemCounts", actor, action, units, user._id);
            Meteor.call("incrementAggregates", user._id, actor, action, amount, units, momentDate);

            return newItemId;
        }
    },


    // Add Item
    addItem: function (actor, action, amount, units, date) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // Upsert actor, action, units
        Meteor.call("upsertActor", actor, Meteor.userId());
        Meteor.call("upsertAction", action, Meteor.userId());
        Meteor.call("upsertUnits", units, Meteor.userId());

        var momentDate = moment(date);
        console.log('MomentDate: ' + momentDate);
        console.log('MomentDate.toDate: ' + momentDate.toDate());

        // Add the item
        var newItemId = Items.insert({
            actor: actor,
            action: action,
            amount: amount,
            units: units,
            date: momentDate.toDate(),
            createdAt: new Date(),
            owner: Meteor.userId(),
            private: true
        });

        Meteor.call("incrementItemCounts", actor, action, units, Meteor.userId());
        Meteor.call("incrementAggregates", Meteor.userId(), actor, action, amount, units, momentDate);

        return newItemId;
    },


    // Update Item
    updateItem: function (id, actor, action, amount, units, date) {

        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(id);
        if (item.owner !== Meteor.userId()) {
            // make sure only the owner can modify
            throw new Meteor.Error("not-authorized");
        }

        var oldActor = item.actor;
        var oldAction = item.action;
        var oldUnits = item.units;

        // Upsert actor, action, units
        Meteor.call("upsertActor", actor, Meteor.userId());
        Meteor.call("upsertAction", action, Meteor.userId());
        Meteor.call("upsertUnits", units, Meteor.userId());

        console.log("Date:" + date);

        Items.update({
            "_id": id
        }, {
                $set: {
                    "actor": actor,
                    "action": action,
                    "amount": amount,
                    "units": units,
                    "date": date
                }
            });

        // Decrement item counts
        Meteor.call("decrementItemCounts", oldActor, oldAction, oldUnits, Meteor.userId());
        // Increment item counts
        Meteor.call("incrementItemCounts", actor, action, units, Meteor.userId());
    },


    // Delete Item
    deleteItem: function (itemId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(itemId);
        if (item.owner !== Meteor.userId()) {
            // make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        var actor = item.actor;
        var action = item.action;
        var units = item.units;

        Items.remove(itemId);

        // Decrement item counts
        Meteor.call("decrementItemCounts", actor, action, units, Meteor.userId());
    },


    // Add actor if not existing already
    upsertActor: function (actor, userId) {
        var existingActor = Actors.findOne({
            "actor": actor,
            "owner": userId
        });
        if (typeof existingActor === 'undefined') {
            Actors.insert({
                actor: actor,
                createdAt: new Date(),
                owner: userId
            });
        }
        else {
            // console.log("Actor already exists");
        }
    },


    // Add action if not existing already
    upsertAction: function (action, userId) {
        var existingAction = Actions.findOne({
            "action": action,
            "owner": userId

        });
        if (typeof existingAction === 'undefined') {
            Actions.insert({
                action: action,
                createdAt: new Date(),
                owner: userId
            });
        }
    },


    // Add unit if not existing already
    upsertUnits: function (units, userId) {
        var existingUnit = Units.findOne({
            "unit": units,
            "owner": userId
        });
        if (typeof existingUnit === 'undefined') {
            Units.insert({
                unit: units,
                createdAt: new Date(),
                owner: userId,
            });
        }
    },

    // Increment the item counts
    incrementItemCounts: function (actor, action, units, userId) {
        Actors.update({
            "actor": actor,
            "owner": userId
        }, {
                $inc: {
                    "itemCount": 1
                }
            });

        Actions.update({
            "action": action,
            "owner": userId
        }, {
                $inc: {
                    "itemCount": 1
                }
            });

        Units.update({
            "unit": units,
            "owner": userId
        }, {
                $inc: {
                    "itemCount": 1
                }
            });
    },

    // Decrement the item counts
    decrementItemCounts: function (actor, action, units, userId) {
        Actors.update({
            "actor": actor,
            "owner": userId
        }, {
                $inc: {
                    "itemCount": -1
                }
            });

        Actions.update({
            "action": action,
            "owner": userId
        }, {
                $inc: {
                    "itemCount": -1
                }
            });

        Units.update({
            "unit": units,
            "owner": userId
        }, {
                $inc: {
                    "itemCount": -1
                }
            });
    },

    // Delete Actor
    deleteActor: function (actorId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var actor = Actors.findOne(actorId);
        if (actor.owner !== Meteor.userId()) {
            // make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Actors.remove(actorId);
    },

    // Delete Action
    deleteAction: function (actionId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var action = Actions.findOne(actionId);
        if (action.owner !== Meteor.userId()) {
            // make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Actions.remove(actionId);
    },

    // Delete Units
    deleteUnits: function (unitId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var unit = Units.findOne(unitId);
        if (unit.owner !== Meteor.userId()) {
            // make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Units.remove(unitId);
    }

});
