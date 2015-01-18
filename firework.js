Items = new Mongo.Collection("items");
Actors = new Mongo.Collection("actors");
Actions = new Mongo.Collection("actions");
Units = new Mongo.Collection("units");

Router.configure({
    layoutTemplate: 'ApplicationLayout',
    notFoundTemplate: 'notFound'
});

/*
 Client Code
 */
if (Meteor.isClient) {
    /*
     Subscriptions
     */
    Meteor.subscribe("items");
    Meteor.subscribe("actors");
    Meteor.subscribe("actions");
    Meteor.subscribe("units");

    /*
     Timeline Helpers
     */
    Template.timeline.helpers({
        items: function() {
            if (Session.get("hideArchived")) {
                // If hide archived is checked, filter tasks
                return Items.find({
                    checked: {
                        $ne: true
                    }
                }, {
                    sort: {
                        date: -1
                    }
                });
            }
            else {
                // Otherwise, return all of the tasks
                return Items.find({}, {
                    sort: {
                        date: -1
                    }
                });
            }
        },
        hideArchived: function() {
            return Session.get("hideArchived");
        }
    });

    /* 
     Actors Helpers
     */
    Template.actors.helpers({
        actors: function() {
            return Actors.find();
        }
    });

    Template.actors_menu.helpers({
        actors: function() {
            return Actors.find();
        }
    });

    /*
     Actions Helpers
     */
    Template.actions.helpers({
        actions: function() {
            return Actions.find();
        }
    });

    Template.actions_menu.helpers({
        actions: function() {
            return Actions.find();
        }
    });

    /*
     Units Helpers
     */
    Template.units.helpers({
        units: function() {
            return Units.find();
        }
    });

    Template.units_menu.helpers({
        units: function() {
            return Units.find();
        }
    });

    Template.body.helpers({});

    /*
     Account Helpers
     */
    Template.ApplicationLayout.helpers({

        publicCount: function() {
            return Items.find({
                private: {

                    $ne: true


                }
            }).count();
        },
        privateCount: function() {
            return Items.find({
                private: {
                    $ne: false
                }
            }).count();
        }

    });

    /*
     Item Helpers
     */
    Template.item.helpers({
        isOwner: function() {
            return this.owner === Meteor.userId();
        }
    });
    Template.items_show.helpers({
        isOwner: function() {
            return this.item.owner === Meteor.userId();
        }
    });
    Template.items_edit.helpers({
        isOwner: function() {
            return this.item.owner === Meteor.userId();
        }
    });


    /*
     Account Events
     */
    Template.account.events({

        "change .hide-archived input": function(event) {
            Session.set("hideArchived", event.target.checked);
        },

        "submit .new-tokens": function(event) {
            Meteor.call("createToken");
            return false;
        }

    });

    /*
     Add Events
     */
    Template.add.events({
        "submit .new-item": function(event) {

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

            Router.go('/timeline');

            toastr.success("Add Item", "Item added");

            return false;
        }
    });

    /*
     Item Events
     */
    Template.item.events({
        "click .toggle-checked": function() {
            // Set the checked property to the opposite of its current value
            Meteor.call("setChecked", this._id, !this.checked);
        },
        "click .delete": function() {
            Meteor.call("deleteItem", this._id);
            toastr.success("Delete Item", "Item deleted");
        },
        "click .toggle-private": function() {
            Meteor.call("setPrivate", this._id, !this.private);
        },
        "click .edit": function() {
            Meteor.call("editItem", this._id);
        }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

    Template.item.helpers({
        dateFormatted: function() {
            return moment(this.date).format('MM/DD/YYYY HH:MM');
        }
    });

    Template.items_show.helpers({
        dateFormatted: function() {
            return moment(this.date).format('MM/DD/YYYY HH:MM');
        }
    });

    Template.ApplicationLayout.rendered = function() {
        //$('.navbar-collapse a').click(function() {
        //    $(".navbar-collapse").collapse('hide');
        //});
    };

    Template.add.rendered = function() {
        //    $('#date').datepicker();
    }

}
