describe('Item', function() {

    it('can be added', function() {

        spyOn(Items, "insert").and.returnValue(1);

        var momentDate = moment(date);

        var actor = "Fred";
        var action = "jumped";
        var amount = 5;
        var units = "metres";
        var date = new Date();
        var owner = "abcdedf";
        var createdAt = new Date();

        // Add the item
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

        console.log('New id: ' + newItemId);

        // Test actual versus expected
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
});