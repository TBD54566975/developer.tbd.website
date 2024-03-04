import { test, expect, describe, beforeAll } from 'vitest';
// :prepend-start: isPFIJs
import { DidResolver, DidDht, DidJwk } from '@web5/dids';
// :prepend-end:

let pfiDid;

describe('Wallet: Allowlist PFIs', () => {
  beforeAll(async () => {
    const bearerDid = await DidDht.create({
      options:{
        publish: true,
        services: [{
            id: 'pfi',
            type: 'PFI',
            serviceEndpoint: 'https://example.com/'
        }]
      }
    })
    pfiDid = bearerDid.uri;
  });

  test('PFI DID has PFI service', async () => {
    // :snippet-start: isPFIJs
    const resolver = new DidResolver({ didResolvers: [DidDht, DidJwk] });
    const resolvedDid = await resolver.resolve(pfiDid);
    const isPFI = resolvedDid.didDocument.service.some(service => service.type === 'PFI');
    // :snippet-end:
    expect(isPFI).toBe(true)
  });

});