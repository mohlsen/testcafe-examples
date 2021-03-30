# Testcafe timeout issue

There seems to be a condition when code under test throws an unhandled exception or if a asyn function never completes, testcafe will just hang forever, 
and does not respect any timeout flags.

For this example test, run the following:
`npx testcafe chrome examples/unhandled-exception-promise`

and to be specific with timeouts try:
`npx testcafe chrome examples/unhandled-exception-promise --selector-timeout 10000 --assertion-timeout 10000 --page-load-timeout 10000 --ajax-request-timeout 10000 --page-request-timeout 10000 --browser-init-timeout 10000`

The test will just run forever.

## Code

The code in `unhandled.js` will hang forever as is. There are several other examples commented out in the code that also show the same problem.  We realize 
that code under test (or in setup) that never resolves, rejects or throws is bad.  But it happens in real world code that is hard to prevent. We are 
questioning why testcafe never times out in these condition, it will run forever, not respecting any timeout flags. In this case, we need to rely on our
CI infrastructure (jenkins)to timeout). While this works, it is configured much longer since it encapsulated the entire test and CI setup, and it should
rather handle test timeouts with testcafe so it can be controled per test.
