var request = require('request');

var loopCounter = 0;
var loopSize = 10000;
var loopInterval = 25; // ms

var i = setInterval(function() {

    request({
        url: 'http://0.0.0.0:8080/api/items',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'user-id': '33yDFoimhvZRoBsmT',
            'api-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiIzM3lERm9pbWh2WlJvQnNtVCJ9.uXrju8Q_myjCScYbeaN8Xn5OEwpPT5qH09C8SFMUSHE'
        },
        json: {
            actor: 'Frank',
            action: 'laughed',
            amount: loopCounter,
            units: 'times'
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
