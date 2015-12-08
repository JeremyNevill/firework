var request = require('request');

var loopCounter = 0;
var loopSize = 1000000;
var loopInterval = 100; // ms

var i = setInterval(function() {

    request({
        url: 'http://localhost:3000/api/items',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'user-id': 'sxDqa3ZwXse84fj6Q',
            'api-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJzeERxYTNad1hzZTg0Zmo2USJ9.K3LhkNRUh4phnXQoprdwB3bsYzx0DZT3WeGidMoymhY'
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
