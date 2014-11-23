/*
 Server Code
 */
if (Meteor.isServer) {

    Meteor.publish("items", function() {
        return Items.find({
            // $or: [
            // {private: {$ne: true}},
            //{
            owner: this.userId
                //}
                // ]
        }, {
            sort: {
                "date": -1
            }
        });
    });

    Meteor.publish("actors", function() {
        return Actors.find({
            owner: this.userId
        }, {
            sort: {
                "actor": 1
            }
        });
    });

    Meteor.publish("actions", function() {
        return Actions.find({
            owner: this.userId
        }, {
            sort: {
                "action": 1
            }
        });
    });

    Meteor.publish("units", function() {
        return Units.find({
            owner: this.userId
        }, {
            sort: {
                "unit": 1
            }
        });
    });
}