/*
 Server Code
 */
if (Meteor.isServer) {

    Meteor.publish("items", function() {
        return Items.find({
            owner: this.userId
        }, {
            sort: {
                "createdAt": -1
            },
            limit: 50,

        });
    });

    Meteor.publish("actors", function() {
        return Actors.find({
            itemCount: {
                $gt: 0
            }
        }, {
            owner: this.userId
        }, {
            sort: {
                "actor": 1
            },
            limit: 50
        });
    });

    Meteor.publish("actions", function() {
        return Actions.find({
            itemCount: {
                $gt: 0
            }
        }, {
            owner: this.userId
        }, {
            sort: {
                "action": 1
            },
            limit: 50
        });
    });

    Meteor.publish("units", function() {
        return Units.find({
            itemCount: {
                $gt: 0
            }
        }, {
            owner: this.userId
        }, {
            sort: {
                "unit": 1
            },
            limit: 50
        });
    });
}