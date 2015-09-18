beforeAll(function(done) {
    var self = this;
    wdio.getGhostDriver(function(browser) {
        self.browser = browser;
        done();
    });
});


describe('Homepage Logged Out', function() {
    it('should have the correct title', function(done) {
        this.browser
            .init()
            .url('http://0.0.0.0:8080/')
            .title(function(err, res) {
                console.log('Title was: ' + res.value);
                expect(res.value).toBe('Firework - Real-Time Logging and Analytics');
            })
            .end()
            .call(done);
    });

    it('should have a link to github', function(done) {
        this.browser
            .init()
            .url('http://0.0.0.0:8080/')
            .getText('=Firework Github Repo', function(err, text) {
                console.log(text); // outputs: "WebdriverIO"
            })
            .click('=Firework Github Repo')
            .end()
            .call(done);
    });

    it('should have a link to the docs', function(done) {
        this.browser
            .init()
            .url('http://0.0.0.0:8080/')
            .click('=Documentation')
            .end()
            .call(done);
    });

});