// :prepend-start: resolveADidJS
import {DidDht, DidJwk} from '@web5/dids';
// :prepend-end:
import { test, expect, describe } from 'vitest';


describe('DID Document Resolver Tests', () => {
    test('didDocument retrieves a valid DID document', async () => {
      const didDht = await DidDht.create({ publish: true });
      const didJwk = await DidJwk.create({ publish: true });
      const didDhtUri = didDht.uri;
      const didJwkUri = didJwk.uri;
  
      // :snippet-start: resolveDidJS
      // resolve did:jwk DID
      const resolvedJwkDid = await DidJwk.resolve(didJwkUri);
      const jwkDidDocument = resolvedJwkDid.didDocument;

      // resolve did:dht DID
      const resolvedDhtDid = await DidDht.resolve(didDhtUri);
      const dhtDidDocument = resolvedDhtDid.didDocument;
      // :snippet-end: 
  
      expect(jwkDidDocument.id).equals(didJwkUri);
      expect(dhtDidDocument.id).equals(didDhtUri);
    });
  });