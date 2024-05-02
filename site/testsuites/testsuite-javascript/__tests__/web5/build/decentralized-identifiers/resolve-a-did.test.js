// :prepend-start: resolveADidJS
import {DidDht, DidJwk} from '@web5/dids';
// :prepend-end:
import { test, expect, describe } from 'vitest';


describe('DID Document Resolver Tests', () => {
    test('didDocument retrieves a valid DID document', async () => {
      // Create a DID using the DidDht class
      const userDid = await DidDht.create({ publish: true });
      const userDidUri = userDid.uri;
  
      // :snippet-start: resolveADidJS
      // resolve JWK method DIDs
      const resolvedJwkDid = await DidJwk.resolve(userDidUri);

      // resolve DHT method DIDs
      const resolvedDhtDid = await DidDht.resolve(userDidUri);

      // access DID Document
      const didDocument = resolvedDhtDid.didDocument; // resolvedJwkDid.didDocument;
      // :snippet-end: 
  
      expect(didDocument).toHaveProperty('id');
      expect(didDocument).toHaveProperty('verificationMethod');
      expect(didDocument).toHaveProperty('authentication');
      expect(didDocument).toHaveProperty('assertionMethod');
      expect(didDocument).toHaveProperty('capabilityInvocation');
      expect(didDocument).toHaveProperty('capabilityDelegation');
    });
  });