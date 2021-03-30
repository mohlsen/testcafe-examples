import { Selector } from 'testcafe';

process.on('uncaughtException', (err, origin) => {
    console.log('uncaughtException, this will cause testcafe to wait forever', {err, origin});
    // I would have assumed that if this is hit, testcafe would fail because we did not use --skip-uncaught-errors,
    // but it does not fail.

    // this will kill the test. 
    // process.exit(1);
});

fixture `Page manipulation`
    .page('https://devexpress.github.io/testcafe/example/')
    .before(async () => {

        console.log('before');
        
        await new Promise((resolve, reject ) => {

            // with nothing in this function body (never resolving or rejecting), testcafe will wait forever, and never timeout

            // The following line will cause the async function to reject, and the test will fail appropriately.
            // throw new Error('Throwing!');

            // The following line will cause the promise to reject, this cause the async function to reject, and the test will fail appropriately.
            // reject('reject');

            // The following line will never resolve or reject the promise. the exception will be seen as unhandled by node.js.
            // setTimeout(function() {
            //     console.log('before throw');
            //     throw new Error('Throwing!');
            // }, 1000);

        });
        
    })
    .beforeEach(async () => {
        console.log('before each');

        // with nothing in this function body (never resolving or rejecting), testcafe will wait forever, and never timeout (just like in the before hook)
        // await new Promise((resolve, reject ) => { });

    })
    .afterEach(async () => {
        console.log('after each');

        // with nothing in this function body (never resolving or rejecting), testcafe will wait forever, and never timeout (just like in the before hook)
        // await new Promise((resolve, reject ) => { });
    })
    .after(async () => {
        console.log('after');

        // with nothing in this function body (never resolving or rejecting), testcafe will wait forever, and never timeout (just like in the before hook)
        // await new Promise((resolve, reject ) => { });
    });

    

test('Fill a textbox', async t => {

    // adding the following will cause the test to run forever, it will not timeout. (just like in the other hooks)
    // await new Promise((resolve, reject ) => {

    // });

    await t.typeText('#developer-name', 'Peter Parker');

    await t.expect(Selector('#developer-name').value).eql('Peter Parker');
});
