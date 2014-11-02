Items = new Mongo.Collection("items");

if (Meteor.isClient) {
    // This code only runs on the client

    Template.body.helpers({
        items: function () {
            return Items.find({}, {sort: {text: -1}});
        }
    });



    Template.body.events({


        // Add to Template.body.events
        "change .hide-completed input": function (event) {
            Session.set("hideCompleted", event.target.checked);
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