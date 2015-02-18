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

    toastr.options = {
        "positionClass": "toast-bottom-right"
    };


    /*
     Timeline Helpers
     */
    Template.timeline.helpers({
        items: function() {
            return Items.find({}, {
                sort: {
                    date: -1
                },
                limit: 25
            });
        }
    });


    /* 
     Actors Helpers
     */
    Template.actors.helpers({
        actors: function() {
            return Actors.find({}, {
                sort: {
                    itemCount: -1
                },
                limit: 50
            });
        }
    });
    Template.actors_menu.helpers({
        actors: function() {
            return Actors.find({}, {
                //sort: {
                //    itemCount: -1
                //},
                //limit: 20
            });
        }
    });


    /*
     Actions Helpers
     */
    Template.actions.helpers({
        actions: function() {
            return Actions.find({}, {
                sort: {
                    itemCount: -1
                },
                limit: 50
            });
        }
    });
    Template.actions_menu.helpers({
        actions: function() {
            return Actions.find({}, {
                //sort: {
                //    itemCount: -1
                //},
                //limit: 50
            });
        }
    });


    /*
     Units Helpers
     */
    Template.units.helpers({
        units: function() {
            return Units.find({}, {
                sort: {
                    itemCount: -1
                },
                limit: 50
            });
        }
    });
    Template.units_menu.helpers({
        units: function() {
            return Units.find({}, {
                //sort: {
                //    itemCount: -1
                //},
                //limit: 50
            });
        }
    });


    /*
     Account Helpers
     */
    Template.ApplicationLayout.helpers({
        totalCount: function() {
            return Items.find({}).count();
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
     Item Add Events
     */
    Template.items_add.events({
        "submit .new-item": function(event) {

            var actor = event.target.actor.value;
            var action = event.target.action.value;
            var amount = event.target.amount.value;
            var units = event.target.units.value;
            var date = new Date(event.target.date.value);

            Meteor.call("addItem", actor, action, amount, units, date);
            Router.go('/timeline');
            toastr.success("Add Item", "Item added");

            return false;
        }
    });

    /* 
    Item Edit Events 
    */
    Template.items_edit.events({
        "submit .edit-item": function(event) {

            var id = event.target.id.value;
            var actor = event.target.actor.value;
            var action = event.target.action.value;
            var amount = event.target.amount.value;
            var units = event.target.units.value;
            var date = new Date(event.target.date.value);

            Meteor.call("updateItem", id, actor, action, amount, units, date);
            Router.go('/timeline');
            toastr.success("Update Item", "Item Updated");

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
        }
    });

    Template.items_show.events({
        "click .delete": function() {
            Meteor.call("deleteItem", this.item._id);
            toastr.success("Delete Item", "Item deleted");
        }
    });

    Template.actors.events({
        "click .delete": function() {
            Meteor.call("deleteActor", this._id);
            toastr.success("Delete Actor", "Actor deleted");
        }
    });

    Template.actions.events({
        "click .delete": function() {
            Meteor.call("deleteAction", this._id);
            toastr.success("Delete Action", "Action deleted");
        }
    });

    Template.units.events({
        "click .delete": function() {
            Meteor.call("deleteUnits", this._id);
            toastr.success("Delete Units", "Units deleted");
        }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
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

    Template.registerHelper('formatDate', function(date) {
        return moment(date).format('MM/DD/YYYY HH:MM');
    });

    Template.items_add.rendered = function() {
        $('#datetimepicker').datetimepicker({
            format: "MM/DD/YYYY HH:MM"
        });
        var newDate = new Date();
        $('input[id="date"]').val(moment(newDate).format('MM/DD/YYYY HH:MM'));
    };

    Template.items_edit.rendered = function() {
        $('#datetimepicker').datetimepicker({
            format: "MM/DD/YYYY HH:MM"
        });
    };

}
