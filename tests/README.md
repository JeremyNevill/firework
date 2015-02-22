# Tests

## End to End Tests

###  GhostInspector

* Ghost Inspector is a hosted end to end test platform.
* Tests are gathered into suites, and the start url of the test can be set to enable a suite to run against multiple environments.
* Tests are run using the ghost-inspector npm package.

To run tests, from the ```/tests``` directory:

Set the environment variables:

```
export GHOST_API_KEY="57ca536f7a08bf58428e28de22b89f1d0fa5af08"
export GHOST_TEST_URL="https://firework-jeremynevill-2.c9.io/"
export GHOST_SUITE="54ceb629e2f4f6677ef70f52"
```

Run the tests:

```
node ghost/main.js
```
