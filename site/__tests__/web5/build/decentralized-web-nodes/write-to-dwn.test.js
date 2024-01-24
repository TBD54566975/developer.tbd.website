import { test, beforeAll, expect, describe } from 'vitest';

import {
  createTextRecord,
  createJsonRecord,
  uploadImage,
  uploadFile,
  createMixedRecord,
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/write-to-dwn';
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
    const record = await createTextRecord(web5);
    expect(record).toBeDefined();
  });

  test('createJsonRecord creates a JSON record', async () => {
    const record = await createJsonRecord(web5);
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
