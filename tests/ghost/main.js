var GhostApiKey = process.env.GHOST_API_KEY;
var GhostTestUrl = process.env.GHOST_TEST_URL;
var GhostInspector = require('ghost-inspector')(GhostApiKey);

var options = {
    startUrl: GhostTestUrl
};

GhostInspector.executeSuite('54ceb629e2f4f6677ef70f52', options, function(err, results, passing) {
    if (err) return console.log('Error: ' + err);
    console.log(passing === true ? 'Passed' : 'Failed');
    console.log(results);
});