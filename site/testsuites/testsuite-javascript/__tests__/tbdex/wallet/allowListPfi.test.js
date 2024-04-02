import { test, expect, describe, beforeAll } from 'vitest';
import { DidDht } from '@web5/dids';
// :prepend-start: isPFIJs
import { resolveDid } from '@tbdex/protocol'
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
    const didDocument = await resolveDid(pfiDid);
    const isPFI = didDocument.service.some(service => service.type === 'PFI');
    // :snippet-end:
    expect(isPFI).toBe(true)
  });

});