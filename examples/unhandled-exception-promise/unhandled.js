import { Selector } from 'testcafe';

process.on('uncaughtException', (err, origin) => {
    console.log('uncaughtException', {err, origin});
    //process.exit(1);
});

fixture `Page manipulation`
    .page('https://devexpress.github.io/testcafe/example/')
    .before(async () => {

        console.log('before');
        
        return await new Promise((resolve, reject ) => {

            setTimeout(function() {
                console.log('before throw');
                throw new Error('Throwing!');
                console.log('after throw');
                resolve();
            }, 1000);

            //throw new Error('Throwing!');

            //reject('reject');
          });
        
    })
    .beforeEach(async () => {
        console.log('before each');

    })
    .afterEach(async () => {
        console.log('after each');

    })
    .after(async () => {
        console.log('after');
    });

    
// async function throwingFunction() {
//     return await new Promise((resolve) => {
//         setTimeout(function() {
//             console.log('before throw');
//             throw new Error('Throwing!');
//             console.log('after throw');
//             resolve();
//         }, 1000);
//       });
// }

test('Fill a textbox', async t => {

    // await throwingFunction().catch((err) => {
    //     console.log('catch', {err});
    // }) 

    await t.typeText('#developer-name', 'Peter Parker');

    await t.expect(Selector('#developer-name').value).eql('Peter Parker');
});
