import { test, expect, beforeAll, describe } from 'vitest';

import { createMyDid } from '../../../code-snippets/api/web5-js/did';

let web5;

describe('did', () => {
  beforeAll(async () => {
    web5 = globalThis.web5;
  });

  test.skip('create did', async () => {
    // Passing Web5 directly to createMydid() instead of the results of Web5.connect()
    const did = await createMyDid(Web5);

    expect(did.id).toMatch(/did:ion:.*$/);
  });
});
