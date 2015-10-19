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
            'user-id': 'wHh6t4k3ExFSeFY2v',
            'api-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3SGg2dDRrM0V4RlNlRlkydiJ9.tgDxA8Yw3L78i6O-JEnu9qTnJGZPK9zlhptzE9NCOZI'
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
