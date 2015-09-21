Meteor.methods({
    incrementAggregates: function(userid, actor, action, amount, units, date) {

        var actorStatId = userid + "_actor_" + actor;
        console.log("actorStatId: " + actorStatId);

        var actionStatId = userid + "_action_" + action;
        console.log("actionStatId: " + actionStatId);

        var unitsStatId = userid + "_units_" + units;
        console.log("unitsStatId: " + unitsStatId);
    }
});
