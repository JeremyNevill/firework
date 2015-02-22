/*
 Server Code
 */
if (Meteor.isServer) {

    Meteor.publish("items", function() {
        return Items.find({
            owner: this.userId
        }, {
            sort: {
                "date": 1
            },
            limit: 100
        });
    });

    Meteor.publish("actors", function() {
        return Actors.find({
            owner: this.userId
        }, {
            sort: {
                "actor": 1
            } ,
            limit: 100
        });
    });

    Meteor.publish("actions", function() {
        return Actions.find({
            owner: this.userId
        }, {
            sort: {
                "action": 1
            } ,
            limit: 100
        });
    });

    Meteor.publish("units", function() {
        return Units.find({
            owner: this.userId
        }, {
            sort: {
                "unit": 1
            } ,
            limit: 100
        });
    });
}