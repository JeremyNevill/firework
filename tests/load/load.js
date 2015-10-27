var request = require('request');

var loopCounter = 0;
var loopSize = 1000000;
var loopInterval = 10; // ms

var i = setInterval(function() {

    request({
        url: 'http://0.0.0.0:8080/api/items',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'user-id': 'sdXfRMxqHTpJa8swR',
            'api-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJzZFhmUk14cUhUcEphOHN3UiJ9.lf6U6e-piD4Xp_WJumoMcRHmcjEj8kG8zBTHYyYcxiU'
        },
        json: {
            actor: 'Jimbo',
            action: 'skipped',
            amount: loopCounter,
            units: 'miles'
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error:', error);
        }
        else {
            console.log(loopCounter, response.statusCode);
        }
    });

    loopCounter++;
    if (loopCounter === loopSize) {
        clearInterval(i);
    }
}, loopInterval);
