import { test, expect, beforeAll } from 'vitest';
import { createMyDid } from '../../../code-snippets/api/web5-js/did';
import { Web5 } from '@tbd54566975/web5/browser';

let web5;

beforeAll(async () => {
  const result = await Web5.connect();
  web5 = result.web5;
});

test('create did', async () => {
  const did = await createMyDid(web5);

  expect(did.id).toMatch(/did:ion:.*$/);
});
