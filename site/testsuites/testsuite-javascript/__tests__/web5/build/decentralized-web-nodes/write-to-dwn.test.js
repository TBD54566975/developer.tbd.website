import { test, beforeAll, expect, describe } from 'vitest';

import {
  createTextRecord,
  createJsonRecord,
  uploadImage,
  uploadFile,
  createMixedRecord,
} from '../../../../../../code-snippets/web5/build/decentralized-web-nodes/write-to-dwn';
import { setUpWeb5 } from '../../../setup-web5';

let web5;
let did;

describe('write-to-dwn', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test('createTextRecord creates a text record', async () => {
    // :snippet-start: createTextRecord
    // Create a plain text record
    const { record } = await web5.dwn.records.create({
      data: {
        content: "Hello Web5",
        description: "Keep Building!"
      },
      message: {
        dataFormat: 'application/json'
      }
    });
    // :snippet-end:
    expect(record).toBeDefined();
  });

  test('createJsonRecord creates a JSON record', async () => {
    // :snippet-start: createJsonRecord
    // Create a JSON record
    const { record } = await web5.dwn.records.create({
      data: {
        content: "Hello Web5",
        description: "Keep Building!"
      },
      message: {
        dataFormat: 'application/json'
      }
    });
     // :snippet-end:
    expect(record).toBeDefined();
  });

  test('uploadImage uploads an image', async () => {
    const mockEvent = {
      currentTarget: {
        files: [new Blob(['fake image data'], { type: 'image/png' })],
      },
    };

    const record = await uploadImage(mockEvent);
    expect(record).toBeDefined();
  });

  test('uploadFile uploads a file', async () => {
    const mockEvent = {
      currentTarget: {
        files: [
          new Blob(['fake file data'], { type: 'application/octet-stream' }),
        ],
      },
    };

    const record = await uploadFile(mockEvent);
    expect(record).toBeDefined();
  });
  test('createMixedRecord creates a message with an image and file', async () => {
    const username = 'testUser';
    const messageText = 'testMessage';
    const imageFile = new Blob(['fake image data'], { type: 'image/png' });

    const record = await createMixedRecord(username, messageText, imageFile);
    expect(record).toBeDefined();
  });
});

test('createRecordFrom creates a record from an existing record', async () => {
  const { record } = await web5.dwn.records.create({
    data: 'Hello, Web5!',
    message: {
      dataFormat: 'text/plain',
    },
  });
  // :snippet-start: createRecordFrom
  // Get existing record by id
  let { record: existingRecord } = await web5.dwn.records.read({
    message: {
      filter: {
        recordId: record.id,
      },
    },
  });

  // Create a new record from an existing record
  const { record: newRecord } = await web5.dwn.records.createFrom({
    record: existingRecord,
    data: 'I am a new version of the original record!',
    message: {
      dataFormat: 'application/json',
      published: true,
    },
  });
  // :snippet-end:
  const newRecordDataText = await newRecord.data.text();
  expect(newRecordDataText).toBe('I am a new version of the original record!');
});