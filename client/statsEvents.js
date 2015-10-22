Template.stats.helpers({
    dailyStats: function() {
        return Stats.find({}, {
            sort: {
                itemCount: -1
            }
        });
    }
});