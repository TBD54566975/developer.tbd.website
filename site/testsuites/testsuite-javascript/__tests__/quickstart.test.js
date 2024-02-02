import { test, beforeAll, expect, describe } from 'vitest';
import {
  createTextRecord,
  readTextRecord,
  updateTextRecord,
  deleteTextRecord,
} from '../../../code-snippets/web5/quickstart';
import { setUpWeb5 } from './setup-web5';

// This is the web5 instance that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let web5;
// This is the decentralized ID that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let aliceDid;
// This record result is what comes back from the createTextRecord function. This is used to test the record's attributes and methods.
let recordResult;

const textInput = 'Hello, Web5!';
const updatedTextInput = 'Hello, Web5! I am updated.';

describe('/site/tests/quickstart.test.js', async () => {
  // This is where we create a DID, assign the web5 and aliceDid variables, and then use the aliceDid to write a text record.
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    aliceDid = globalThis.did;
  });

  test('didCreate returns a decentralized ID', async () => {
    expect(typeof aliceDid).toBe('string');
    const didRegex = /^did:[a-z0-9]+:.+/i;
    expect(didRegex.test(aliceDid)).toBe(true);
  });

  test('createTextRecord returns a record with aliceDid being the same value as the author attribute', async () => {
    // This is where we write a text record and assign the result to the recordResult variable.
    const response = await createTextRecord(web5, textInput);
    recordResult = response.record;
    expect(recordResult.author).toBe(aliceDid);
  });

  test('recordResult returns a record with the textInput being the same value as the data attribute', async () => {
    const textResult = await readTextRecord(recordResult);
    expect(textResult).toBe(textInput);
  });

  test('recordResult successfully sends an updated textInput', async () => {
    const updatedRecordResult = await updateTextRecord(recordResult);

    expect.soft(updatedRecordResult.status.code).toBe(202);
    expect(updatedTextInput).toBe(await recordResult.data.text());
  });

  test('recordResult successfully deletes the record', async () => {
    const deletedRecordResult = await deleteTextRecord(
      web5,
      aliceDid,
      recordResult,
    );
    expect.soft(deletedRecordResult.status.code).toBe(202);
  });
});

function getFrontPageHtml(pariss) {}
