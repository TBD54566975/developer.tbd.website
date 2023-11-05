import { test, beforeAll, expect } from 'vitest';
import {
  createPublishedRecord,
  createRecordWithDatePublished
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/publishing-records';
import { Web5 } from '@web5/api/browser';

let web5;
let did;

// connect to web5 beforeAll tests and assign it to web5 variable
beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  did = result.did;
});

test('createPublishedRecord creates a public record', async () => {
  const record = await createPublishedRecord(web5);
  expect(record.published).toBe(true);
});

test('createRecordWithDatePublished creates a record that will be published later', async () => {
  const isDateCorrect = await createRecordWithDatePublished(web5);
  expect(isDateCorrect).toBe(true);
});