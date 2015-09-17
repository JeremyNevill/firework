describe('Item', function() {

    it('can be added', function() {

        // setup
        spyOn(Items, "insert").and.returnValue(1);

        var momentDate = moment(date);

        var actor = "Fred";
        var action = "jumped";
        var amount = 5;
        var units = "metres";
        var date = new Date();
        var owner = "abcdedf";
        var createdAt = new Date();

        // execute
        var newItemId = Items.insert({
            actor: actor,
            action: action,
            amount: amount,
            units: units,
            date: momentDate.toDate(),
            createdAt: createdAt,
            owner: owner,
            private: true
        });

        // verify
        expect(Items.insert).toHaveBeenCalledWith({
            actor: "Fred",
            action: "jumped",
            amount: 5,
            units: "metres",
            date: momentDate.toDate(),
            createdAt: createdAt,
            owner: owner,
            private: true
        });

    });

    it('can be added again', function() {

        // setup
        spyOn(Items, "insert").and.returnValue(1);

        var momentDate = moment(date);

        var actor = "Jane";
        var action = "flew";
        var amount = 5;
        var units = "metres";
        var date = new Date();
        var owner = "abcdedf";
        var createdAt = new Date();

        // execute
        var newItemId = Items.insert({
            actor: actor,
            action: action,
            amount: amount,
            units: units,
            date: momentDate.toDate(),
            createdAt: createdAt,
            owner: owner,
            private: true
        });
        
        Meteor.call("addItem", actor, action, amount, units, date);

        // verify
        expect(Items.insert).toHaveBeenCalledWith({
            actor: "Jane",
            action: "flew",
            amount: 5,
            units: "metres",
            date: momentDate.toDate(),
            createdAt: createdAt,
            owner: owner,
            private: true
        });

    });


});