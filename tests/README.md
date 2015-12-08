# Tests

## End to End Tests

###  GhostInspector

* Ghost Inspector is a hosted end to end test platform.
* Tests are gathered into suites, and the start url of the test can be set to enable a suite to run against multiple environments.
* Tests are run using the ghost-inspector npm package.

To run tests, from the ```/tests/ghost``` directory:

Set the environment variables:

```
export GHOST_API_KEY=""
export GHOST_TEST_URL=""
export GHOST_SUITE=""
```

Run the tests:

```
node ghost/main.js
```


### Cucumber, Wedriver, Selenium Standalone and Chai

#### Install

Note: This is not using the Meteor cucumber setup as I couldn't get it working on Mac and C9 Ubuntu.
      So the following is the old skool node way using Cucumber, Wedriver, Selenium Standalone and Chai

From the /tests directory, install the npm packages you need locally:

```
npm install
```

Which is the same as:

```
npm install chai --save-dev
npm install cucumber --save-dev
npm install webdriverio --save-dev
```

For the command line tools:

```
npm install cucumber -g
npm install phantomjs -g
npm install selenium-standalone -g
selenium-standalone install
```

Make sure to note down the location that phantomjs is installed to, e.g.
```
/home/ubuntu/workspace/tests/node_modules/phantomjs/lib/phantom/bin/phantomjs
```

#### Run Tests

Terminal window 1:
```
selenium-standalone start
```

Terminal window 2: 
```
npm test
```



