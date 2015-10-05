Meteor.methods({
    incrementAggregates: function(userid, actor, action, amount, units, date) {
        testDate = new StatDate(date);

        // Daily (and potentially hourly) Stats Ids
        // Note these are user specific
        var actorStatId = userid + "_actor_" + actor + "_" + testDate.toYYYYMMDD();
        //console.log("actorStatId: " + actorStatId);

        var actionStatId = userid + "_action_" + action + "_" + testDate.toYYYYMMDD();
        //console.log("actionStatId: " + actionStatId);

        var unitsStatId = userid + "_units_" + units + "_" + testDate.toYYYYMMDD();
        //console.log("unitsStatId: " + unitsStatId);
    }
});


class StatDate {
    constructor(date) {
        this.date = date;
    }

    toYYYYMMDD() {
        return moment(this.date).format('YYYYMMDD');
    }
}
