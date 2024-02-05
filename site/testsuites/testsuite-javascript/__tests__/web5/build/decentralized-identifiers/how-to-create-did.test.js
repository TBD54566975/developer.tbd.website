import { test, expect, vi, describe, beforeAll } from 'vitest';
import { DidDht, DidKey, DidJwk } from '@web5/dids';

import {
  createDidAutomatically,
} from '../../../../../../code-snippets/web5/build/decentralized-identifiers/how-to-create-did';
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


  test('show required imports to create did', async () => {
    const requiredImports = `
      // :snippet-start: requiredDidImports
      //did:dht
      import { DidDht } from '@web5/dids'

      //did:key
      import { DidKey } from '@web5/dids'

      //did:jwk
      import { DidJwk } from '@web5/dids'

      // :snippet-end:
    `
  });

  test('createDidAutomatically returns a DID', async () => {
    const did = await createDidAutomatically();
    expect(did).toBeDefined();
    expect(did).toMatch(/^did:/);
  });

  test('createDidDht creates a DID with did:dht method', async () => {
    // :snippet-start: createDidDht
    // Creates a DID using the DHT method and publishes the DID Document to the DHT
    const didDht = await DidDht.create({ publish: true });

    // DID and its associated data which can be exported and used in different contexts/apps
    const portableDid = JSON.stringify(didDht);

    // DID string
    const did = didDht.uri;

    // DID Document
    const didDocument = JSON.stringify(didDht.document);

    // Cryptographic keys associated with DID
   const keys = await DidDht.toKeys({ did: didDht });

    // :snippet-end:

    expect(did).toMatch(/^did:dht:/);
  });

  test('createDidKey creates a DID with did:key method', async () => {
    // :snippet-start: createDidKey
    // Creates a DID using the did:key method
    const didKey = await DidKey.create();

    // DID and its associated data which can be exported and used in different contexts/apps
    const portableDid = JSON.stringify(didKey);

    // DID string
    const did = didKey.uri;

    // DID Document
    const didDocument = JSON.stringify(didKey.document);

    // Cryptographic keys associated with DID
    const keys = await DidKey.toKeys({ did: didKey });


    // :snippet-end:

    expect(did).toMatch(/^did:key:/);
  });

  test('createDidJwk creates a DID with did:jwk method', async () => {
    // :snippet-start: createDidJwk
    //Creates a DID using the did:jwk method
    const didJwk = await DidJwk.create();

    //DID and its associated data which can be exported and used in different contexts/apps
    const portableDid = JSON.stringify(didJwk);

    //DID string
    const did = didJwk.uri;

    //DID Document
    const didDocument = JSON.stringify(didJwk.document);

    //Cryptographic keys associated with DID
    const keys = await DidJwk.toKeys({ did: didJwk });
    // :snippet-end:

    expect(did).toMatch(/^did:jwk:/);
  });
});
