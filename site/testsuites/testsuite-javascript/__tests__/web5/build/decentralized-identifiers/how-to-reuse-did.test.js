// :prepend-start: exportDidJs
import {DidDht, DidJwk} from '@web5/dids';
// :prepend-end:
import { test, expect, describe } from 'vitest';

describe('Import and export DIDs', () => {
    test('Exports a Bearer DID to a Portable DID', async () => {
      const didDhtBearerDid = await DidDht.create({ options: { publish: true } });
      const didJwkBearerDid = await DidJwk.create();
  
      // :snippet-start: exportDidJs
      // export did:dht DID
      const portableDhtDid = await didDhtBearerDid.export();
      // export did:jwk DID
      const portableJwkDid = await didJwkBearerDid.export();
      // :snippet-end: 
  
      expect(portableDhtDid.document.id).equals(didDhtBearerDid.uri);
      expect(portableJwkDid.document.id).equals(didJwkBearerDid.uri);
    });

    test('Imports a Portable DID to a Bearer DID', async () => {
        const didDhtBearerDid = await DidDht.create({ options: { publish: true } });
        const didJwkBearerDid = await DidJwk.create();
        
        const portableDhtDid = await didDhtBearerDid.export();
        const portableJwkDid = await didJwkBearerDid.export();

        // :snippet-start: importDidJs
        // import did:dht DID
        const importedDhtDid = await DidDht.import({ portableDid: portableDhtDid });
        // import did:jwk DID
        const importedJwkDid = await DidJwk.import({ portableDid: portableJwkDid });
        // :snippet-end:

        expect(importedDhtDid.document.id).equals(didDhtBearerDid.uri);
        expect(importedJwkDid.document.id).equals(didJwkBearerDid.uri);
      });
  });