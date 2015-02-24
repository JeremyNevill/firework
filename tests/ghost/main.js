var GhostApiKey = process.env.GHOST_API_KEY;
var GhostTestUrl = process.env.GHOST_TEST_URL;
var GhostSuite = process.env.GHOST_SUITE;

var GhostInspector = require('ghost-inspector')(GhostApiKey);

var options = {
    startUrl: GhostTestUrl
};

// Run the Main ghost test suite, against the test url, using the api key
GhostInspector.executeSuite(GhostSuite, options, function(err, results, passing) {
    if (err) return console.log('Error: ' + err);
    console.log(passing === true ? 'Passed' : 'Failed');
    //console.log(results);
});