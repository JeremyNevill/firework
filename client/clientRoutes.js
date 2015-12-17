/* 
Simple Routes
*/
Router.route('/', function() {
    document.title = "Home";
    this.render('home');
});

Router.route('/account', function() {
    document.title = "Account";
    this.render('account');
});

Router.route('/timeline', function() {
    document.title = "Timeline";
    this.render('timeline');
});

Router.route('/add', function() {
    document.title = "Add";
    this.render('items_add');
});

Router.route('/stats', function() {
    document.title = "Stats";
    this.render('stats');
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

Router.route('/items/:id/edit', function() {
    this.render('items_edit', {
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
    name: 'items.edit'
});


/*
Actor Routes
*/
Router.route('/actors', function() {
    document.title = "Actors";
    this.render('actors');
});

Router.route('/actors/:actor', function() {
    this.render('actors_show', {
        data: function() {

            Session.set('currentActor', this.params.actor);

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
    document.title = "Actions";
    this.render('actions');
});

Router.route('/actions/:action', function() {
    this.render('actions_show', {
        data: function() {

            Session.set('currentAction', this.params.action);

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
    document.title = "Units";
    this.render('units');
});

Router.route('/units/:unit', function() {
    this.render('units_show', {
        data: function() {

            Session.set('currentUnit', this.params.unit);

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
