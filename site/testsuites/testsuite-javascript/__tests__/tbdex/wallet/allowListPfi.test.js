import { test, expect, describe, beforeAll } from 'vitest';
import { DidDhtMethod } from '@web5/dids';

let pfiDid;

describe('allowlist PFIs', () => {
  beforeAll(async () => {
    pfiDid = await DidDhtMethod.create({
        publish: true,
        services: [{
            id: 'pfi',
            type: 'PFI',
            serviceEndpoint: 'tbdex-pfi.tbddev.org'
        }]
    })
  });
  
  test('PFI DID has PFI service', async () => {
    // :snippet-start: isPFIJs
    const isPFI = pfiDid.document.service.some(service => service.type === 'PFI');
    // :snippet-end:
    expect(isPFI).toBe(true)
  });

});