// :prepend-start: resolveADidJS
import { resolveDid } from '@tbdex/protocol';
// :prepend-end:
import { test, expect, describe } from 'vitest';
import { DidDht} from '@web5/dids';

describe('DID Document Resolver Tests', () => {
    test('didDocument retrieves a valid DID document', async () => {
      // Create a DID using the DidDht class
      const userDid = await DidDht.create({ publish: true });
      const userDidUri = userDid.uri;
  
      // :snippet-start: resolveADidJS
      const didDocument = await resolveDid(userDidUri);
      // :snippet-end: 
  
      expect(didDocument).toHaveProperty('id');
      expect(didDocument).toHaveProperty('verificationMethod');
      expect(didDocument).toHaveProperty('authentication');
      expect(didDocument).toHaveProperty('assertionMethod');
      expect(didDocument).toHaveProperty('capabilityInvocation');
      expect(didDocument).toHaveProperty('capabilityDelegation');
    });
  });