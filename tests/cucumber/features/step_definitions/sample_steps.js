 module.exports = function() {

  var webdriverio = require('webdriverio');
  var expect = require('chai').expect;

  var client = webdriverio.remote({

   desiredCapabilities: {
    browserName: 'phantomjs',
    'phantomjs.binary.path': '/home/ubuntu/workspace/tests/node_modules/phantomjs/lib/phantom/bin/phantomjs'
   }

  });


  this.Given(/^I am on the homepage$/, function(callback) {

   client
    .init()
    .url('http://nevill.net')
    .getTitle()
    .then(function(title) {
     //console.log('Title: ' + title);
     expect(title).to.have.string('Nevill.net');
     callback();
    })
    .callback;

  });


  this.When(/^I view the main content area$/, function(callback) {

   client
    .getTitle()
    .then(function(title) {
     //console.log('Title again: ' + title);
     expect(title).to.have.string('Nevill.net');
     callback();
    })
    .callback;

  });


  this.Then(/^I should see the welcome message$/, function(callback) {

   client
    .getTitle()
    .then(function(title) {
     //console.log('Title finally: ' + title);
     expect(title).to.have.string('Nevill.net');
     callback();
    })
    .callback;

  });

 };