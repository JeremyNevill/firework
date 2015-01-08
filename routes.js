/*
 Routes
 */
if (Meteor.isClient) {

    /* 
    Simple Routes
    */
    Router.route('/', function() {
        this.render('home');
    });

    Router.route('/account', function() {
        this.render('account');
    });

    Router.route('/timeline', function() {
        this.render('timeline');
    });

    Router.route('/add', function() {
        this.render('add');
    });

    /*
    Items Routes
    */
    Router.route('/items', function() {
        this.render('items');
    });
    Router.route('/items/:id', function() {
        this.render('items_show', {
            data: function() {
                var templateData = {
                    item: Items.findOne({
                        "_id": this.params.id
                    })
                };
                return templateData;
            }
        });
    }, {
        name: 'items.show'
    });


    /*
    Actor Routes
    */
    Router.route('/actors', function() {
        this.render('actors');
    });

    Router.route('/actors/:actor', function() {
        this.render('actors_show', {
            data: function() {
                var templateData = {
                    actor: Actors.findOne({
                        "actor": this.params.actor
                    }),
                    items: Items.find({
                        "actor": this.params.actor
                    })
                };
                return templateData;
            }
        });
    }, {
        name: 'actors.show'
    });


    /*
    Action Routes
    */
    Router.route('/actions', function() {
        this.render('actions');
    });

    Router.route('/actions/:action', function() {
        this.render('actions_show', {
            data: function() {
                var templateData = {
                    action: Actions.findOne({
                        "action": this.params.action
                    }),
                    items: Items.find({
                        "action": this.params.action
                    })
                };
                return templateData;
            }
        });
    }, {
        name: 'actions.show'
    });


    /*
    Units Routes
    */
    Router.route('/units', function() {
        this.render('units');
    });

    Router.route('/units/:unit', function() {
        this.render('units_show', {
            data: function() {
                var templateData = {
                    unit: Units.findOne({
                        "unit": this.params.unit
                    }),
                    items: Items.find({
                        "units": this.params.unit
                    })
                };
                return templateData;
            }
        });
    }, {
        name: 'units.show'
    });

}

/*
Rest ITEM Api
*/
Router.map(function() {
    this.route('methodExample', {
        path: '/api/items',
        where: 'server',
        action: function() {

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
                // Items.find().fetch()
                test
            ));
        }
    });
});