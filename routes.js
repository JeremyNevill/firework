/*
 Routes
 */
if (Meteor.isClient) {

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

    Router.route('/actors', function() {
        this.render('actors');
    });

    Router.route('/actors/:actor', function() {
        this.render('actorsShow', {
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

    Router.route('/actions', function() {
        this.render('actions');
    });

    Router.route('/actions/:action', function() {
        this.render('actionsShow', {
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

    Router.route('/units', function() {
        this.render('units');
    });

    Router.route('/units/:action', function() {
        this.render('unitsShow', {
            data: function() {
                var templateData = {
                    unit: Units.findOne({
                        "unit": this.params.unit
                    }),
                    items: Items.find({
                        "unit": this.params.unit
                    })
                };
                return templateData;
            }
        });
    }, {
        name: 'units.show'
    });

}