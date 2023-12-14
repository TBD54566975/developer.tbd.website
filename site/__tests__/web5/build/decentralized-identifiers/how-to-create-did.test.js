import { test, expect } from 'vitest';
import {
  createDidAutomatically,
} from '../../../../code-snippets/web5/build/decentralized-identifiers/how-to-create-did';


test('createDidAutomatically returns a DID', async () => {
  const did = await createDidAutomatically();

  expect(did).toBeDefined();
  expect(did).toMatch(/^did:/);
});
