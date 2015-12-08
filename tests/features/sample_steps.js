module.exports = function () {

    var webdriverio = require("webdriverio");
    var client = webdriverio.remote({desiredCapabilities: {browserName: "chrome"}});

    this.Given(/^I am on the "(.*)" page$/, {timeout: 30000}, function (page, callback) {
        client
            .init()
            .url("http://localhost:3000/")
            .call(callback);
    });

    this.Given(/^I login$/, {timeout: 30000}, function (callback) {
        client.click(".dropdown-toggle")
            .click("#login-username-or-email")
            .keys('selenium')
            .click('#login-password')
            .keys('robottester')
            .click('#login-buttons-password')
            .waitForExist('*=selenium', 15000)
            .call(callback);
    });

    this.Then(/^I see the "(.*)" text$/, {timeout: 30000}, function (word, callback) {
        console.log(word);

        client
            .click("=Firework")
            .call(callback);
    });

    this.Then(/^All is well$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
};