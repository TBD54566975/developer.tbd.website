import { test, expect, vi, describe, beforeAll } from 'vitest';
import { DidDhtMethod, DidKeyMethod, DidIonMethod } from '@web5/dids';

import {
  createDidAutomatically,
  createDidDht,
  createDidIon,
  createDidKey,
} from '../../../../code-snippets/web5/build/decentralized-identifiers/how-to-create-did';

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

  test('createDidDht creates a DID with did:dht method', async () => {
    // :snippet-start: createDidDht
    const didDht = await DidDhtMethod.create({ publish: true });

    //DID and its associated data which can be exported and used in different contexts/apps
    const portableDID = JSON.stringify(didDht);

    //DID string
    const did = didDht.did;

    //DID Document
    const didDocument = JSON.stringify(didDht.document);

    //Cryptographic keys associated with DID
    const keys = JSON.stringify(didDht.keySet);

    //Primary form of a DID. more info: https://www.w3.org/TR/did-core/#dfn-canonicalid
    const canonicalId = didDht.canonicalId;

    // :snippet-end:

    expect(didDht.did).toMatch(/^did:dht:/);
  });

  test('createDidKey creates a DID with did:key method', async () => {
    // :snippet-start: createDidKey
    const createdDid = await createDidKey();
    //:snippet-end:
    expect(createdDid).toMatch(/^did:key:/);
  });

  test('createDidIon creates a DID with did:ion method', async () => {
    const createdDid = await createDidIon();
    expect(createdDid).toMatch(/^did:ion:/);
  });
});
