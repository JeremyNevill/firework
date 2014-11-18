Items = new Mongo.Collection("items");
Actors = new Mongo.Collection("actors");
Actions = new Mongo.Collection("actions");


Router.configure({
    layoutTemplate: 'ApplicationLayout',
    notFoundTemplate: 'notFound'
});

/*
 Client Code
 */
if (Meteor.isClient) {

    /*
     Routes
     */
    Router.route('/', function () {
        this.render('home');
    });

    Router.route('/account', function () {
        this.render('account');
    });

    Router.route('/timeline', function () {
        this.render('timeline');
    });

    Router.route('/add', function () {
        this.render('add');
    });

    Router.route('/actors', function () {
        this.render('actors');
    });

    Router.route('/actors/:_id', function () {
        var actor = Actors.findOne({_id: this.params._id});
        this.render('ShowActor', {data: item});
    });

    Router.route('/actions', function () {
        this.render('actions');
    });


    /*
     Subscriptions
     */
    Meteor.subscribe("items");
    Meteor.subscribe("actors");
    Meteor.subscribe("actions");


    /*
     Timeline Helpers
     */
    Template.timeline.helpers({
        items: function () {
            if (Session.get("hideArchived")) {
                // If hide archived is checked, filter tasks
                return Items.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
            } else {
                // Otherwise, return all of the tasks
                return Items.find({}, {sort: {createdAt: -1}});
            }
        },
        hideArchived: function () {
            return Session.get("hideArchived");
        }
    });

    /* 
     Actors Helpers
     */
    Template.actors.helpers({
        actors: function () {
            return Actors.find();
        }
    });

    Template.actors_menu.helpers({
        actors: function () {
            return Actors.find();
        }
    });

    /*
     Actions Helpers
     */
    Template.actions.helpers({
        actions: function () {
            return Actions.find();
        }
    });

    Template.actions_menu.helpers({
        actions: function () {
            return Actions.find();
        }
    });

    Template.body.helpers({});

    /*
     Account Helpers
     */
    Template.ApplicationLayout.helpers({
        itemCount: function () {
            return Items.find({checked: {$ne: true}}).count();
        },
        archivedItemCount: function () {
            return Items.find({checked: {$ne: false}}).count();
        },
        publicCount: function () {
            return Items.find({private: {$ne: true}}).count();
        },
        privateCount: function () {
            return Items.find({private: {$ne: false}}).count();
        }
    });

    /*
     Item Helpers
     */
    Template.item.helpers({
        isOwner: function () {
            return this.owner === Meteor.userId();
        }
    });

    /*
     Stat Events
     */
    Template.account.events({
        "change .hide-archived input": function (event) {
            Session.set("hideArchived", event.target.checked);
        }
    });

    /*
     Add Events
     */
    Template.add.events({
        "submit .new-item": function (event) {
            var actor = event.target.actor.value;
            var action = event.target.action.value;
            var amount = event.target.amount.value;
            var units = event.target.units.value;
            var date = new Date(event.target.date.value);

            Meteor.call("addItem", actor, action, amount, units, date);

            // Clear form
            event.target.actor.value = "";
            event.target.action.value = "";
            event.target.amount.value = "";
            event.target.units.value = "";
            event.target.date.value = "";


            // Prevent default form submit
            return false;
        }
    });

    /*
     Body Events
     */
    Template.body.events({});

    /*
     Item Events
     */
    Template.item.events({
        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
            Meteor.call("setChecked", this._id, !this.checked);
        },
        "click .delete": function () {
            Meteor.call("deleteItem", this._id);
        },
        "click .toggle-private": function () {
            Meteor.call("setPrivate", this._id, !this.private);
        }

    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

    Template.item.helpers({
        dateFormatted: function () {

            return moment(this.date).format('MM/DD/YYYY HH:MM');

        }
    });

}

/*
 Meteor Methods
 */
Meteor.methods({
    addItem: function (actor, action, amount, units, date) {
        // Make sure the user is logged in before inserting
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        // Add actor if not existing already
        var existingActor = Actors.findOne({"actor": actor});
        if (typeof existingActor === 'undefined') {
            Actors.insert({
                actor: actor,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username
            });
        }

        // Add action if not existing already
        var existingAction = Actions.findOne({"action": action});
        if (typeof existingAction === 'undefined') {
            Actions.insert({
                action: action,
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
    deleteItem: function (itemId) {
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
    setChecked: function (itemId, setChecked) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(itemId);
        if (item.private && item.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Items.update(itemId, {$set: {checked: setChecked}});
    },
    setPrivate: function (itemId, setToPrivate) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var item = Items.findOne(itemId);

        // Make sure only the task owner can make a task private
        if (item.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Items.update(itemId, {$set: {private: setToPrivate}});
    }
});

/*
 Server Code
 */
if (Meteor.isServer) {

    Meteor.publish("items", function () {
        return Items.find({
                $or: [
                    {private: {$ne: true}},
                    {owner: this.userId}
                ]
            }, {sort: {"date": -1}}
        );
    });

    Meteor.publish("actors", function () {
        return Actors.find({}, {sort: {"actor": 1}});
    });

    Meteor.publish("actions", function () {
        return Actions.find({}, {sort: {"action": 1}});
    });

}
 