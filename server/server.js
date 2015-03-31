/*
 Server Code
 */
if (Meteor.isServer) {

    // Timeline Items
    Meteor.publish("items", function() {
        return Items.find({
            owner: this.userId
        }, {
            sort: {
                "date": -1
            },
            limit: 20
        });
    });


    // Actor Items
    Meteor.publish("actor_items", function(actor) {

        console.log("Meteor.publish - actor_items:" + actor);

        return Items.find({
            owner: this.userId,
            actor: actor
        }, {
            sort: {
                "date": -1
            },
            limit: 20
        });
    });


    // Actors
    Meteor.publish("actors", function() {
        return Actors.find({
            owner: this.userId
        }, {
            sort: {
                "itemCount": -1
            }
        });
    });


    // Actions
    Meteor.publish("actions", function() {
        return Actions.find({
            owner: this.userId
        }, {
            sort: {
                "itemCount": -1
            }
        });
    });


    // Units
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