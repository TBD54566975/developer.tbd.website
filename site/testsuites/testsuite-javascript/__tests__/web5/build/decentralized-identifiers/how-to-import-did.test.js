// :prepend-start: exportDidJs
import {DidDht, DidJwk} from '@web5/dids';
// :prepend-end:
import { test, expect, describe } from 'vitest';

describe('Import and export DIDs', () => {
    test('Exports a Bearer DID to a Portable DID', async () => {
      const didDht = await DidDht.create({ options: { publish: true } });
      const didJwk = await DidJwk.create();
  
      // :snippet-start: exportDidJs
      // export did:dht DID
      const portableDhtDid = await didDht.export();
      // export did:jwk DID
      const portableJwkDid = await didJwk.export();
      // :snippet-end: 
  
      expect(portableDhtDid.document.id).equals(didDht.uri);
      expect(portableJwkDid.document.id).equals(didJwk.uri);
    });

    test('Imports a Portable DID to a Bearer DID', async () => {
        const didDht = await DidDht.create({ options: { publish: true } });
        const didJwk = await DidJwk.create();
    
        const portableJwkDid = await didJwk.export();
        const portableDhtDid = await didDht.export();

        // :snippet-start: importDidJs
        // import did:dht DID
        const importedDhtDid = await DidDht.import({ portableDid: portableDhtDid });
        // import did:jwk DID
        const importedJwkDid = await DidJwk.import({ portableDid: portableJwkDid });
        // :snippet-end:
      });
  });