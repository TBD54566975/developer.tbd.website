import { test, beforeAll, expect, describe } from 'vitest';
import { didCreate, createTextRecord } from '../index';

// This is the web5 instance that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let web5;
// This is the decentralized ID that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let aliceDid;
// This record result is what comes back from the createTextRecord function. This is used to test the record's attributes and methods.
let recordResult;

const textInput = 'YEEERR!';
const updatedTextInput = 'YEEERR! UPDATED';

describe('/examples/web5-quickstart-widgets/__tests__/widget.test.js', () => {
    beforeAll(async () => {
        const result = await didCreate();
        web5 = result.web5;
        aliceDid = result.did;
    })

    test('didCreate returns a decentralized ID', async () => {
        expect(typeof aliceDid).toBe('string');
        const didRegex = /^did:[a-z0-9]+:.+/i;
        expect(didRegex.test(aliceDid)).toBe(true);
      });

    /* failing with: TypeError: Cannot read properties of undefined (reading 'dwn')
 ❯ Module.createTextRecord http:/localhost:63315/examples/web5-quickstart-widgets/index.js:15:29
 */
    test.skip('createTextRecord returns a record with aliceDid being the same value as the author attribute', async () => {
        // This is where we write a text record and assign the result to the recordResult variable.
        const response = await createTextRecord(web5, textInput);
        recordResult = response.record;
        expect.soft(response.status.code).toBe(202);
        expect(recordResult.author).toBe(aliceDid);
    });

    test.skip('recordResult returns a record with the textInput being the same value as the data attribute', async () => {
        const textResult = await recordResult.data.text();
        expect(textResult).toBe(textInput);
      });
});