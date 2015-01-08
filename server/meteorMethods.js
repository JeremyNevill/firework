/*
 Meteor Methods
 */
Meteor.methods({

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

    addApiItem: function(token, userid, actor, action, amount, units, date) {
        
        var user = Meteor.users.findOne(userid);
        var secretKey = user.profile.apiSecret;

        var jwt = Meteor.npmRequire('jwt-simple');
        var decoded = jwt.decode(token, secretKey);
        console.log(decoded);

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
    },

    addItem: function(actor, action, amount, units, date) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // Add actor if not existing already
        var existingActor = Actors.findOne({
            "actor": actor
        });
        if (typeof existingActor === 'undefined') {
            Actors.insert({
                actor: actor,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            });
        }

        // Add action if not existing already
        var existingAction = Actions.findOne({
            "action": action
        });
        if (typeof existingAction === 'undefined') {
            Actions.insert({
                action: action,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            });
        }

        // Add unit if not existing already
        var existingUnit = Units.findOne({
            "unit": units
        });
        if (typeof existingUnit === 'undefined') {
            Units.insert({
                unit: units,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            });
        }

        // Add the item
        Items.insert({
            actor: actor,
            action: action,
            amount: amount,
            units: units,
            date: date,
            createdAt: new Date(),
            owner: Meteor.userId(),
            private: true,
            username: Meteor.user().username
        });
    },

    deleteItem: function(itemId) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(itemId);
        if (item.private && item.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Items.remove(itemId);
    },

    setChecked: function(itemId, setChecked) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(itemId);
        if (item.private && item.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Items.update(itemId, {
            $set: {
                checked: setChecked
            }
        });
    },

    setPrivate: function(itemId, setToPrivate) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(itemId);

        // Make sure only the task owner can make a task private
        if (item.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Items.update(itemId, {
            $set: {
                private: setToPrivate
            }
        });
    }
});
