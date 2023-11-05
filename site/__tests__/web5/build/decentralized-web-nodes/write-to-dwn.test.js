import { test, beforeAll, expect } from 'vitest';
import {
    createTextRecord,
    createJsonRecord
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/write-to-dwn';
import { Web5 } from '@web5/api/browser';

let web5;
let did;

// connect to web5 beforeAll tests and assign it to web5 variable
beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  did = result.did;
});

test('createTextRecord creates a text record', async () => {
  const record = await createTextRecord(web5);
  expect(record).toBeDefined();
});

test('createJsonRecord creates a JSON record', async () => {
    const record = await createJsonRecord(web5);
    expect(record).toBeDefined();
});


