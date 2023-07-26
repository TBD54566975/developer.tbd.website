import { test, beforeAll, expect, describe } from 'vitest';
import { didCreate, dwnWriteTextRecord } from '../src/util/web5';

let web5;
let aliceDid;
let recordResult;

const textInput = 'YEEERR!';
const updatedTextInput = 'YEEERR! UPDATED';

beforeAll(async () => {
  const result = await didCreate();
  web5 = result.web5;
  aliceDid = result.aliceDid;
});

describe('/site/tests/quickstart.test.js', () => {
  test('didCreate returns a decentralized ID', async () => {
    expect(typeof aliceDid).toBe('string');
    const didRegex = /^did:[a-z0-9]+:.+/i;
    expect(didRegex.test(aliceDid)).toBe(true);
  });

  test('dwnWriteTextRecord returns a record with aliceDid being the same value as the author attribute', async () => {
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
