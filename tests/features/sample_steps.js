var assert = require('assert');

module.exports = function () {

    var webdriverio = require("webdriverio");

    this.Before(function (scenario) {
        console.log("=========== Before =================");
    });

    this.After(function (scenario) {
        console.log("=========== After ==================");
        this.client.close();
    });

    this.Given(/^I go directly to the "(.*)" page$/, {timeout: 30000}, function (page, callback) {

        var url = "http://localhost:3000/";
        if (typeof (page) === 'undefined') {
        }
        else {
            url = url + page;
        }

        this.client
            .url(url)
            .call(callback);
    });

    this.Given(/^I login$/, {timeout: 30000}, function (callback) {
        this.client
            .waitForExist('.dropdown-toggle', 15000)
            .click(".dropdown-toggle")
            .click("#login-username-or-email")
            .keys('selenium')
            .click('#login-password')
            .keys('robottester')
            .click('#login-buttons-password')
            .waitForExist('*=selenium', 15000)
            .call(callback);
    });

    this.Given(/^I click the "([^"]*)" link$/, {timeout: 30000}, function (link, callback) {
        var link = "=" + link;
        this.client
            .click(link)
            .call(callback);
    });

    this.Then(/^I am on the "([^"]*)" page$/, {timeout: 30000}, function (expectedTitle, callback) {
        this.client.getTitle(function (err, actualTitle) {
            assert.equal(actualTitle, expectedTitle);
        }).call(callback);
    });

    this.Then(/^I close the browser$/, function (callback) {
        this.client.close().call(callback);
    });
};



