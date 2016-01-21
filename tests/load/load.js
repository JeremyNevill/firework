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
            'user-id': 'ebbxy7Fxm9WmHQJjh',
            'api-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJlYmJ4eTdGeG05V21IUUpqaCJ9.56LJbEJan5JWU5QfsLAWOJ9zRAt7_7PzY25nWoqR5M4'
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
