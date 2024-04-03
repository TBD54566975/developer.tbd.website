// :snippet-start: pfiOnboardingImportsJs
import { DidDht } from '@web5/dids';
import { LocalKeyManager } from '@web5/crypto'; // optional
// :snippet-end:
import { test, expect, describe } from 'vitest';

describe('PFI: Onboarding', () => {
    test('Create DID for a PFI', async () => {
        const keyManager = new LocalKeyManager();
        // :snippet-start: pfiOnboardingCreateDidJs
        const pfiDid = await DidDht.create({
            options:{
                publish: true,
                services: [{
                    id: 'pfi',
                    type: 'PFI',
                    serviceEndpoint: 'https://example.com/'
                }]
            },
            keyManager
        })

        // :snippet-end:
        expect(pfiDid.document).toHaveProperty('service');
    });
  });