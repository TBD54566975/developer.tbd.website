import { DidDht } from '@web5/dids';
import { test, expect, describe, beforeAll } from 'vitest';

describe('PFI: Onboarding', () => {
    test('Create DID for a PFI', async () => {
        // :snippet-start: pfiOnboardingCreateDidJs
        const pfiDid = await DidDht.create({
            options:{
                publish: true,
                services: [{
                    id: 'pfi',
                    type: 'PFI',
                    serviceEndpoint: 'https://example.com/'
                }]
            }
        })
        // :snippet-end:
        expect(pfiDid.document).toHaveProperty('service');
    });
  });