var webdriverio = require("webdriverio");
var option = {desiredCapabilities: {browserName: "chrome"}};
var client = webdriverio.remote(option);

client
    .init()
    .url("http://localhost:3000/")
    .click(".dropdown-toggle")
    .click("#login-username-or-email")
    .keys('selenium')
    .click('#login-password')
    .keys('robottester')
    .click('#login-buttons-password');

