/*
 Meteor Methods
 */
Meteor.methods({


    // Create Secret Key and API Token
    createToken: function() {

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


    // Add Item Via the API
    addApiItem: function(token, userid, actor, action, amount, units, date) {

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

            // If the user matches the encoded JWT version 
            // Add the item
            Items.insert({
                actor: actor,
                action: action,
                amount: amount,
                units: units,
                date: date,
                createdAt: new Date(),
                owner: user._id,
                private: true,
                username: user.username
            });
        }
    },


    // Add Item
    addItem: function(actor, action, amount, units, date) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // Upsert actor, action, units
        Meteor.call("upsertActor", actor, Meteor.userId());
        Meteor.call("upsertAction", action, Meteor.userId());
        Meteor.call("upsertUnits", units, Meteor.userId());

        // Add the item
        Items.insert({
            actor: actor,
            action: action,
            amount: amount,
            units: units,
            date: date,
            createdAt: new Date(),
            owner: Meteor.userId(),
            private: true
        });
    },


    // Update Item
    updateItem: function(id, actor, action, amount, units, date) {

        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(id);
        if (item.owner !== Meteor.userId()) {
            // make sure only the owner can modify
            throw new Meteor.Error("not-authorized");
        }

        // Upsert actor, action, units
        Meteor.call("upsertActor", actor, Meteor.userId());
        Meteor.call("upsertAction", action, Meteor.userId());
        Meteor.call("upsertUnits", units, Meteor.userId());

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
    },


    // Delete Item
    deleteItem: function(itemId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(itemId);
        if (item.owner !== Meteor.userId()) {
            // make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Items.remove(itemId);
    },


    // Add actor if not existing already
    upsertActor: function(actor, userId) {
        // console.log('upsertActor:' + actor + " by " + userId);
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
    },


    // Add action if not existing already
    upsertAction: function(action, userId) {
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
    upsertUnits: function(units, userId) {
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

    // Delete Actor
    deleteActor: function(actorId) {
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
    deleteAction: function(actionId) {
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
    deleteUnits: function(unitId) {
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
