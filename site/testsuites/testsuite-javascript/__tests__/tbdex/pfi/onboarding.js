import { DidDhtMethod } from '@web5/dids';

// :snippet-start: pfiOnboardingCreateDidJs
const did = await DidDhtMethod.create({
    publish: true,
    services: [{
        id: 'pfi',
        type: 'PFI',
        serviceEndpoint: 'tbdex-pfi.tbddev.org'
    }]
})
// :snippet-end: