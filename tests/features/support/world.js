var webdriverio = require("webdriverio");

function World() {
    console.log("================= World ======================");
    this.client = webdriverio.remote({desiredCapabilities: {browserName: "firefox"}}).init();
}

module.exports = function() {
    this.World = World;
};

