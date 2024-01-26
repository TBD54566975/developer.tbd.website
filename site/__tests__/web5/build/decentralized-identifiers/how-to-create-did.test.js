import { test, expect, vi, describe, beforeAll } from 'vitest';
import { DidDhtMethod, DidKeyMethod, DidIonMethod } from '@web5/dids';

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
    // :snippet-start: createDidDht

    //Creates a DID using the DHT method and publishes the DID Document to the DHT
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

    //Creates a DID using the did:key method
    const didKey = await DidKeyMethod.create();

    //DID and its associated data which can be exported and used in different contexts/apps
    const portableDID = JSON.stringify(didKey);

    //DID string
    const did = didKey.did;

    //DID Document
    const didDocument = JSON.stringify(didKey.document);

    //Cryptographic keys associated with DID
    const keys = JSON.stringify(didKey.keySet);

    //Primary form of a DID. more info: https://www.w3.org/TR/did-core/#dfn-canonicalid
    const canonicalId = didKey.canonicalId;

    // :snippet-end:

    expect(didKey.did).toMatch(/^did:key:/);
  });

  test('createDidIon creates a DID with did:ion method', async () => {
    // :snippet-start: createDidIon

    //Creates a DID using the did:ion method
    const didIon = await DidIonMethod.create();

    //DID and its associated data which can be exported and used in different contexts/apps
    const portableDID = JSON.stringify(didIon);

    //DID string
    const did = didIon.did;

    //DID Document
    const didDocument = JSON.stringify(didIon.document);

    //Cryptographic keys associated with DID
    const keys = JSON.stringify(didIon.keySet);

    //Primary form of a DID. more info: https://www.w3.org/TR/did-core/#dfn-canonicalid
    const canonicalId = didIon.canonicalId;
   
    // :snippet-end:

    expect(didIon.did).toMatch(/^did:ion:/);

  });
});
