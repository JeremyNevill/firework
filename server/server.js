/*
 Server Code
 */
if (Meteor.isServer) {

    Meteor.publish("items", function() {
        return Items.find({
            owner: this.userId
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
                "itemCount": -1
            }
        });
    });

    Meteor.publish("actions", function() {
        return Actions.find({
            owner: this.userId
        }, {
            sort: {
                "itemCount": -1
            }
        });
    });

    Meteor.publish("units", function() {
        return Units.find({
            owner: this.userId
        }, {
            sort: {
                "itemCount": -1
            }
        });
    });

    //    itemCount: {
    //        $gt: 0
    //   }
    //}, {

}