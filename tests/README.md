# Tests

## End to End Tests

###  GhostInspector

* Ghost Inspector is a hosted end to end test platform.
* Tests are gathered into suites, and the start url of the test can be set to enable a suite to run against multiple environments.
* Tests are run using the ghost-inspector npm package.

To run tests, from the ```/tests``` directory:

Set the environment variables:

```
export GHOST_API_KEY="YourApiKey"
export GHOST_TEST_URL="YourTestUrl"
export GHOST_SUITE="YourTestSuite"
```

Run the tests:

```
node ghost/main.js
```
