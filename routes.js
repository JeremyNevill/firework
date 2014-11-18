/*
     Routes
     */
if (Meteor.isClient) {


    Router.route('/', function () {
        this.render('home');
    });

    Router.route('/account', function () {
        this.render('account');
    });

    Router.route('/timeline', function () {
        this.render('timeline');
    });

    Router.route('/add', function () {
        this.render('add');
    });

    Router.route('/actors', function () {
        this.render('actors');
    });

    Router.route('/actors/:actor', function () {
        this.render('actorsShow',
            {
                data: function () {
                    var actor = Actors.findOne({"actor": this.params.actor});
                    return actor;
                }
            });
    }, {name: 'actors.show'});

    Router.route('/actions', function () {
        this.render('actions');
    });

    Router.route('/actions/:action', function () {
        this.render('actionsShow',
            {
                data: function () {
                    var action = Actions.findOne({"action": this.params.action});
                    return action;
                }
            });
    }, {name: 'actions.show'});
}