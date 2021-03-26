import { Selector } from 'testcafe';

fixture `Page manipulation`
    .page('https://devexpress.github.io/testcafe/example/')
    .before(async () => {

        console.log('before');
        
        //process.on('unhandledRejection', e => console.log(e.stack));
        
        await new Promise((resolve) => {
            setTimeout(function() {
                console.log('before throw');
                throw 'lol its going to hang';
                console.log('after throw');
                resolve();
            }, 1000);
          }) 
        
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


test('Fill a textbox', async t => {
    await t.typeText('#developer-name', 'Peter Parker');

    await t.expect(Selector('#developer-name').value).eql('Peter Parker');
});
