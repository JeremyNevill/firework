var pageLimit = 15;

// Timeline Items
Meteor.publish("items", function() {
    return Items.find({
        owner: this.userId
    }, {
        sort: {
            "date": -1
        },
        limit: pageLimit
    });
});


// Actor Items
Meteor.publish("actor_items", function(actor) {
    return Items.find({
        owner: this.userId,
        actor: actor
    }, {
        sort: {
            "date": -1
        },
        limit: pageLimit
    });
});


// Action Items
Meteor.publish("action_items", function(action) {
    return Items.find({
        owner: this.userId,
        action: action
    }, {
        sort: {
            "date": -1
        },
        limit: pageLimit
    });
});

// Unit Items
Meteor.publish("unit_items", function(unit) {
    return Items.find({
        owner: this.userId,
        units: unit
    }, {
        sort: {
            "date": -1
        },
        limit: pageLimit
    });
});

// Actors
Meteor.publish("actors", function() {
    return Actors.find({
        owner: this.userId,
        itemCount: {
            $gt: 0
        }
    }, {
        sort: {
            "itemCount": -1
        }
    });
});


// Actions
Meteor.publish("actions", function() {
    return Actions.find({
        owner: this.userId,
        itemCount: {
            $gt: 0
        }
    }, {
        sort: {
            "itemCount": -1
        }
    });
});


// Units
Meteor.publish("units", function() {
    return Units.find({
        owner: this.userId,
        itemCount: {
            $gt: 0
        }
    }, {
        sort: {
            "itemCount": -1
        }
    });
});