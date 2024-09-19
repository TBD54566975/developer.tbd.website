// :prepend-start: exportDidJs
import { DidDht, DidJwk } from '@web5/dids';
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
    const didDht = await DidDht.create({ options: { publish: true } });
    const didJwk = await DidJwk.create();

    const portableDhtDid = await didDht.export();
    const portableJwkDid = await didJwk.export();

    // :snippet-start: importDidJs
    // import did:dht DID
    const bearerDidDht = await DidDht.import({ portableDid: portableDhtDid });
    // import did:jwk DID
    const bearerDidJwk = await DidJwk.import({ portableDid: portableJwkDid });
    // :snippet-end:

    expect(bearerDidDht.document.id).equals(didDht.uri);
    expect(bearerDidJwk.document.id).equals(didJwk.uri);
  });
});