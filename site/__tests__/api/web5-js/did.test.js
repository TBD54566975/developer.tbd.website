import { test, expect, beforeAll } from 'vitest';
import { createMyDid } from '../../../code-snippets/api/web5-js/did';
import { Web5 } from '@web5/api/browser';

let web5;

beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
});

test.skip('create did', async () => {
  // Passing Web5 directly to createMydid() instead of the results of Web5.connect()
  const did = await createMyDid(Web5);

  expect(did.id).toMatch(/did:ion:.*$/);
});
