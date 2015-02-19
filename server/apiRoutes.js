/*
Rest ITEM Api Routes
*/
Router.map(function() {
    this.route('methodExample', {
        path: '/api/items',
        where: 'server',
        action: function() {

            console.log(this.request.method);

            var requestMethod = this.request.method;
            this.response.writeHead(200, {
                'Content-Type': 'text/html'
            });

            if (this.request.method == 'POST') {

                var userid = this.request.headers['user-id'];
                var token = this.request.headers['api-token'];
                var actor = this.request.body.actor;
                var action = this.request.body.action;
                var amount = this.request.body.amount;
                var units = this.request.body.units;
                var date = this.request.body.date;

                Meteor.call("addApiItem", token, userid, actor, action, amount, units, date);
            }

            var test = {
                test: "true"
            };

            this.response.end(JSON.stringify(
                test
            ));
        }
    });
});