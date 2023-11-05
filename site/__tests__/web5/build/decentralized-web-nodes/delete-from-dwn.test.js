import { test, beforeAll, expect } from 'vitest';
import {
  deleteFromLocalDWN
} from '../../../../code-snippets/web5/build/decentralized-web-nodes/delete-from-dwn';
import {createLocalRecord} from '../../../../code-snippets/web5/build/decentralized-web-nodes/send';
import { Web5 } from '@web5/api/browser';

let web5;
let did;

// connect to web5 beforeAll tests and assign it to web5 variable
beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
  did = result.did;
});

test('deleteFromLocalDWN deletes a record', async () => {
  const record = await createLocalRecord(web5);
  const result = await deleteFromLocalDWN(web5, record.id);
  expect(result.status.code).toBe(202);
});
