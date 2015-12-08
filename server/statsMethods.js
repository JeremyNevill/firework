class StatDate {
  constructor(date) {
    this.date = date;
  }

  toYYYYMMDD() {
    return moment(this.date).format('YYYYMMDD');
  }
}

Meteor.methods({
  incrementAggregates: function (userid, actor, action, amount, units, date) {
    testDate = new StatDate(date);

    // User specific stats ids and records
    // One document per actor/action/unit per day
    
    // Actor Stat
    var actorStatId = userid + "_actor_" + actor + "_" + testDate.toYYYYMMDD();
    Stats.upsert({
      "id": actorStatId,
      "owner": userid,
      "actor": actor
    }, {
        $inc: {
          "itemCount": 1
        }
      });
 
    // Action Stat
    var actionStatId = userid + "_action_" + action + "_" + testDate.toYYYYMMDD();
    Stats.upsert({
      "id": actionStatId,
      "owner": userid,
      "action": action
    }, {
        $inc: {
          "itemCount": 1
        }
      });

  // Unit Stat
    var unitsStatId = userid + "_units_" + units + "_" + testDate.toYYYYMMDD();
             Stats.upsert({
      "id": unitsStatId,
      "owner": userid,
      "units": units
    }, {
        $inc: {
          "itemCount": 1
        }
      });
      
    console.log(actorStatId);
    console.log(actionStatId);
    console.log(unitsStatId);
  }
});