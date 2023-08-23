import { test, expect } from 'vitest';
import {
  createDidManually,
  createDidAutomatically,
} from '../../../../code-snippets/web5/build/decentralized-identifiers/how-to-create-did';

test('createDidManually returns a DID', async () => {
  const result = await createDidManually();

  expect(result).toBeDefined();
  expect(result.id).toMatch(/^did:ion:/);
});

test('createDidAutomatically returns a DID', async () => {
  const did = await createDidAutomatically();

  expect(did).toBeDefined();
  expect(did).toMatch(/^did:/);
});
