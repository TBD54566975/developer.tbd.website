import { DidDhtMethod } from '@web5/dids';

// :snippet-start: pfiOnboardingCreateDidJs
const pfiDid = await DidDhtMethod.create({
    publish: true,
    services: [{
        id: 'pfi',
        type: 'PFI',
        serviceEndpoint: 'https://example.com/'
    }]
})
// :snippet-end: