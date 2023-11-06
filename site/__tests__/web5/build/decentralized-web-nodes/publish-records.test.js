import { test, beforeAll, expect, describe } from 'vitest';

import {
  createPublishedRecord,
  createRecordWithDatePublished,
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/publishing-records';

let web5;
let did;

describe('publish-records', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test('createPublishedRecord creates a public record', async () => {
    const record = await createPublishedRecord(web5);
    expect(record.published).toBe(true);
  });

  test('createRecordWithDatePublished creates a record that will be published later', async () => {
    const isDateCorrect = await createRecordWithDatePublished(web5);
    expect(isDateCorrect).toBe(true);
  });
});
