  class StatDate {
    constructor(date) {
      this.date = date;
    }

    toYYYYMMDD() {
      return moment(this.date).format('YYYYMMDD');
    }
  }

  Meteor.methods({
    incrementAggregates: function(userid, actor, action, amount, units, date) {
      testDate = new StatDate(date);

      // Daily (and potentially hourly) Stats Ids
      // Note these are user specific
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

      //      var actionStatId = userid + "_action_" + action + "_" + testDate.toYYYYMMDD();
      //      var unitsStatId = userid + "_units_" + units + "_" + testDate.toYYYYMMDD();
    }
  });