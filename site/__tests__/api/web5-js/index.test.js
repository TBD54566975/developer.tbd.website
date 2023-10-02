import { test, expect } from 'vitest';
import { createDidWithDWNEndpoint } from '../../../code-snippets/api/web5-js';

test('result comes back with a DID', async () => {
  const result = await createDidWithDWNEndpoint();
  expect(typeof result.myDid).toBe('string');
});
