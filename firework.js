Items = new Mongo.Collection("items");

if (Meteor.isClient) {


    // Replace the existing Template.body.helpers
    Template.body.helpers({
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
        },
        itemCount: function () {
            return Items.find({checked: {$ne: true}}).count();
        },
        archivedItemCount: function () {
            return Items.find({checked: {$ne: false}}).count();
        }
    });


    Template.body.events({


        // Add to Template.body.events
        "change .hide-archived input": function (event) {
            Session.set("hideArchived", event.target.checked);
        },

        "submit .new-item": function (event) {
            // This function is called when the new task form is submitted

            var text = event.target.text.value;

            Items.insert({
                text: text,
                actor: text,
                action: text,
                amount: text,
                units: text,
                date: text,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.text.value = "";

            // Prevent default form submit
            return false;
        }
    });


    // In the client code, below everything else
    Template.item.events({
        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
            Items.update(this._id, {$set: {checked: !this.checked}});
        },
        "click .delete": function () {
            Items.remove(this._id);
        }
    });


}