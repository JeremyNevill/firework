var request = require('request');

var loopCounter = 0;
var loopSize = 1000000;
var loopInterval = 50; // ms

var i = setInterval(function() {

    request({
        url: 'https://firework-jeremynevill-7.c9users.io/api/items',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'user-id': 'MERLugoQWTzCyGbkn',
            'api-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJNRVJMdWdvUVdUekN5R2JrbiJ9.iY_7hfrRX6EK1cZd0PAmPWt-aGHZEesMKI1LMTrPnPg'
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
