import { test, expect, vi, describe, beforeAll } from 'vitest';
import { createDidAutomatically } from '../../../../code-snippets/web5/build/decentralized-identifiers/how-to-create-did';

let web5;

describe('how-to-create-did', () => {
  beforeAll(async () => {
    web5 = globalThis.web5;
    did = globalThis.did;

    vi.mock('@web5/api', () => {
      return {
        Web5: {
          connect: vi.fn(() => {
            return {
              web5,
              did,
            };
          }),
        },
      };
    });
  });

  test('createDidAutomatically returns a DID', async () => {
    const did = await createDidAutomatically();

    expect(did).toBeDefined();
    expect(did).toMatch(/^did:/);
  });
});
