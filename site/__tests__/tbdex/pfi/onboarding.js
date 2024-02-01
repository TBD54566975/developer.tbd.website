// :snippet-start: pfiOnboardingCreateDidJs
import { DidDhtMethod } from '@web5/dids';

const did = await DidDhtMethod.create({
    publish: true,
    services: [{
        id: 'pfi',
        type: 'PFI',
        serviceEndpoint: 'tbdex-pfi.tbddev.org'
    }]
})

// :snippet-end: