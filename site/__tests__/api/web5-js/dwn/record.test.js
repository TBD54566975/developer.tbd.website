import { test, beforeAll, expect, describe } from 'vitest';

import {
  createRecord,
  deleteRecord,
  updateRecord,
  readRecord,
} from '../../../../code-snippets/api/web5-js/dwn/record';

let web5;
let record;
let myDid;

describe('record', () => {
  beforeAll(async () => {
    web5 = globalThis.web5;
    myDid = globalThis.did;
  });

  describe('tests for /api/web5-js/dwn/record', async () => {
    test('createRecord creates a record', async () => {
      const result = await createRecord(web5, myDid);
      record = result;

      expect(result).toBeDefined();
    });

    test('readRecord reads the created record', async () => {
      const result = await readRecord(record);

      expect(result).toBe('Hello World!'); 
    });

    test('updateRecord updates the created record', async () => {
      const result = await updateRecord(record);

      expect.soft(result.status.code).toBe(202);
    });

    test('deleteRecord deletes the updated record', async () => {
      const result = await deleteRecord(record);

      expect.soft(result.status.code).toBe(202);
    });
  });
});
