import { test, beforeAll, expect, describe } from 'vitest';
import { didCreate, dwnWriteTextRecord } from '../src/util/web5';

// This is the web5 instance that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let web5;
// This is the decentralized ID that will be referred to for all tests. This comes back as a result from Web5.connect() being used in the didCreate function.
let aliceDid;
// This record result is what comes back from the dwnWriteTextRecord function. This is used to test the record's attributes and methods.
let recordResult;

const textInput = 'YEEERR!';
const updatedTextInput = 'YEEERR! UPDATED';

describe('/site/tests/quickstart.test.js', () => {
  // This is where we create a DID, assign the web5 and aliceDid variables, and then use the aliceDid to write a text record.
  beforeAll(async () => {
    const result = await didCreate();
    web5 = result.web5;
    aliceDid = result.aliceDid;
  });

  test('didCreate returns a decentralized ID', async () => {
    expect(typeof aliceDid).toBe('string');
    const didRegex = /^did:[a-z0-9]+:.+/i;
    expect(didRegex.test(aliceDid)).toBe(true);
  });

  test('dwnWriteTextRecord returns a record with aliceDid being the same value as the author attribute', async () => {
    // This is where we write a text record and assign the result to the recordResult variable.
    const record = await dwnWriteTextRecord(web5, textInput);
    recordResult = record;
    expect(record.author).toBe(aliceDid);
  });

  test('recordResult returns a record with the textInput being the same value as the data attribute', async () => {
    const textResult = await recordResult.data.text();
    expect(textResult).toBe(textInput);
  });

  test('recordResult successfully sends an updated textInput', async () => {
    const updatedRecordResult = await recordResult.update({
      data: updatedTextInput,
    });

    expect(updatedRecordResult.status.code).toBe(202);
    expect(updatedTextInput).toBe(await recordResult.data.text());
  });

  test('recordResult successfully deletes the record', async () => {
    const deletedRecordResult = await recordResult.delete();
    expect(deletedRecordResult.status.code).toBe(202);

    expect(recordResult.isDeleted).toBe(true);
  });
});
