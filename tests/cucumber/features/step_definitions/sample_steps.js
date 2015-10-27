 module.exports = function() {

  var webdriverio = require('webdriverio');
  var expect = require('chai').expect;

  var client = webdriverio.remote({
   desiredCapabilities: {
    browserName: 'phantomjs',
    'phantomjs.binary.path': '/home/ubuntu/workspace/tests/node_modules/phantomjs/lib/phantom/bin/phantomjs'
   }
  });

  this.Given(/^I am on the homepage$/, {
   timeout: 8 * 1000
  }, function(callback) {
   client
    .init()
    .url('http://nevill.net')
    .getTitle()
    .then(function('Title: ' + title) {
     console.log(title);
     expect(title).to.have.string('Firework');
     callback();
    })
    .callback;
  });

 };