import { test, expect, vi, describe, beforeAll } from 'vitest';

import {
  createDidAutomatically,
  createDidDht,
  createDidIon,
  createDidKey,
} from '../../../../code-snippets/web5/build/decentralized-identifiers/how-to-create-did';
import { setUpWeb5 } from '../../../setup-web5';

let web5;

describe('how-to-create-did', () => {
  beforeAll(async () => {
    await setUpWeb5();
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

  test('createDidDht creates a DID with did:dht method', async () => {
    const createdDid = await createDidDht();
    expect(createdDid).toMatch(/^did:dht:/);
  });

  test('createDidKey creates a DID with did:key method', async () => {
    const createdDid = await createDidKey();
    expect(createdDid).toMatch(/^did:key:/);
  });

  test('createDidIon creates a DID with did:ion method', async () => {
    const createdDid = await createDidIon();
    expect(createdDid).toMatch(/^did:ion:/);
  });
});
