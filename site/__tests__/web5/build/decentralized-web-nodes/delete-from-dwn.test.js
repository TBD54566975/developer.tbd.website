import { test, beforeAll, expect, describe } from 'vitest';

import { deleteFromLocalDWN } from '../../../../code-snippets/web5/build/decentralized-web-nodes/delete-from-dwn';
import { createLocalRecord } from '../../../../code-snippets/web5/build/decentralized-web-nodes/send';
import { setUpWeb5 } from '../../../setup-web5';

let web5;
let did;

describe('delete-from-dwn', () => {
  // connect to web5 beforeAll tests and assign it to web5 variable
  beforeAll(async () => {
    await setUpWeb5();
    web5 = globalThis.web5;
    did = globalThis.did;
  });

  test('deleteFromLocalDWN deletes a record', async () => {
    const record = await createLocalRecord(web5);
    const result = await deleteFromLocalDWN(web5, record.id);
    expect(result.status.code).toBe(202);
  });
});
