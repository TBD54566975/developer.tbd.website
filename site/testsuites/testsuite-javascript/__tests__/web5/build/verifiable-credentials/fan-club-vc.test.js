// import { test, expect, vi, describe, beforeAll } from 'vitest';
// import { DidKeyMethod } from '@web5/dids';
// import { VerifiableCredential } from '@web5/credentials';
// import { setUpWeb5 } from '../../../setup-web5';

// let web5;

// describe('fan-club-vc', () => {
//     beforeAll(async () => {
//         await setUpWeb5();
//         web5 = globalThis.web5;
//         did = globalThis.did;

//         vi.mock('@web5/api', () => {
//             return {
//                 Web5: {
//                     connect: vi.fn(() => {
//                         return {
//                             web5,
//                             did,
//                         };
//                     }),
//                 },
//             };
//         });
//     });

//     test('createDidKeys creates an issuer DID and alice DID with did:key method', async () => {
//         // :snippet-start: createDidKeys
//         const fanClubIssuerDid = await DidKeyMethod.create();
//         const aliceDid = await DidKeyMethod.create();
//         // :snippet-end:

//         expect(aliceDid.did).toMatch(/^did:key:/);
//         expect(fanClubIssuerDid.did).toMatch(/^did:key:/);
//     });

//     test('createSwiftieFanClubClass creates a class for a vc', async () => {
//         // :snippet-start: createSwiftieFanClubClass
//         class SwiftiesFanClub {
//             constructor(level, legit) {
//                 // indicates the fan's dedication level
//                 this.level = level;

//                 // indicates if the fan is a genuine Swiftie
//                 this.legit = legit;
//             }
//         }
//         // :snippet-end:
//         const fan = new SwiftiesFanClub('High', true);
//         expect(fan.legit).toBe(true);
//         expect(fan.level).toBe('High');
//     });

//     test('createVerifiableCredential creates a vc', async () => {
//         const fanClubIssuerDid = await DidKeyMethod.create();
//         const aliceDid = await DidKeyMethod.create();

//         class SwiftiesFanClub {
//             constructor(level, legit) {
//                 // indicates the fan's dedication level
//                 this.level = level;

//                 // indicates if the fan is a genuine Swiftie
//                 this.legit = legit;
//             }
//         }
//         // :snippet-start: createVerifiableCredential
//         const vc = await VerifiableCredential.create({
//             type: 'SwiftiesFanClub',
//             issuer: fanClubIssuerDid.did,
//             subject: aliceDid.did,
//             data: new SwiftiesFanClub('Stan', true)
//         });
//         // :snippet-end:
//         expect(vc).toHaveProperty('vcDataModel');
//         expect(vc.vcDataModel).toHaveProperty('@context');
//         expect(vc.vcDataModel).toHaveProperty('type');
//         expect(vc.vcDataModel).toHaveProperty('id');
//         expect(vc.vcDataModel).toHaveProperty('issuer');
//         expect(vc.vcDataModel).toHaveProperty('issuanceDate');
//         expect(vc.vcDataModel).toHaveProperty('credentialSubject');
//         expect(vc.vcDataModel.credentialSubject).toHaveProperty('id');
//         expect(vc.vcDataModel.credentialSubject).toHaveProperty('level');
//         expect(vc.vcDataModel.credentialSubject).toHaveProperty('legit');
//     });

//     test('signVC creates a vc', async () => {
//         const fanClubIssuerDid = await DidKeyMethod.create();
//         const aliceDid = await DidKeyMethod.create();

//         class SwiftiesFanClub {
//             constructor(level, legit) {
//                 // indicates the fan's dedication level
//                 this.level = level;

//                 // indicates if the fan is a genuine Swiftie
//                 this.legit = legit;
//             }
//         }
//         const vc = await VerifiableCredential.create({
//             type: 'SwiftiesFanClub',
//             issuer: fanClubIssuerDid.did,
//             subject: aliceDid.did,
//             data: new SwiftiesFanClub('Stan', true)
//         });
//         // :snippet-start: signVC
//         const signedVcJwt = await vc.sign({ did: fanClubIssuerDid });
//         // :snippet-end:
//         expect(typeof signedVcJwt).toBe('string');
//         expect(signedVcJwt).not.toBe('');
//     });
// }); 
import { test, expect, vi, describe, beforeAll } from 'vitest';
import { DidKeyMethod } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials';
import { setUpWeb5 } from '../../../setup-web5';

describe('fan-club-vc', () => {
    let web5, did, fanClubIssuerDid, aliceDid, SwiftiesFanClub, vc;

    beforeAll(async () => {
        await setUpWeb5();
        web5 = globalThis.web5;
        did = globalThis.did;

        fanClubIssuerDid = await DidKeyMethod.create();
        aliceDid = await DidKeyMethod.create();

        SwiftiesFanClub = class {
            constructor(level, legit) {
                this.level = level;
                this.legit = legit;
            }
        };
        vc = await VerifiableCredential.create({
            type: 'SwiftiesFanClub',
            issuer: fanClubIssuerDid.did,
            subject: aliceDid.did,
            data: new SwiftiesFanClub('Stan', true)
        });

        vi.mock('@web5/api', () => ({
            Web5: {
                connect: vi.fn(() => ({ web5, did })),
            },
        }));
    });

    test('createDidKeys creates an issuer DID and alice DID with did:key method', async () => {
        // :snippet-start: createDidKeys
        const fanClubIssuerDid = await DidKeyMethod.create();
        const aliceDid = await DidKeyMethod.create();
        // :snippet-end:
        expect(aliceDid.did).toMatch(/^did:key:/);
        expect(fanClubIssuerDid.did).toMatch(/^did:key:/);
    });

    test('createSwiftieFanClubClass creates a class for a vc', async () => {
        // :snippet-start: createSwiftieFanClubClass
        class SwiftiesFanClub {
            constructor(level, legit) {
                this.level = level;
                this.legit = legit;
            }
        }
        // :snippet-end:
        const fan = new SwiftiesFanClub('High', true);
        expect(fan.legit).toBe(true);
        expect(fan.level).toBe('High');
    });

    test('createVerifiableCredential creates a vc', async () => {
        // :snippet-start: createVerifiableCredential
        const vc = await VerifiableCredential.create({
            type: 'SwiftiesFanClub',
            issuer: fanClubIssuerDid.did,
            subject: aliceDid.did,
            data: new SwiftiesFanClub('Stan', true)
        });
        // :snippet-end:
        expect(vc).toHaveProperty('vcDataModel');
        expect(vc.vcDataModel).toHaveProperty('@context');
        expect(vc.vcDataModel).toHaveProperty('type');
        expect(vc.vcDataModel).toHaveProperty('id');
        expect(vc.vcDataModel).toHaveProperty('issuer');
        expect(vc.vcDataModel).toHaveProperty('issuanceDate');
        expect(vc.vcDataModel).toHaveProperty('credentialSubject');
        expect(vc.vcDataModel.credentialSubject).toHaveProperty('id');
        expect(vc.vcDataModel.credentialSubject).toHaveProperty('level');
        expect(vc.vcDataModel.credentialSubject).toHaveProperty('legit');
    });

    test('signVC creates a vc', async () => {
        // :snippet-start: signVC
        const signedVcJwt = await vc.sign({ did: fanClubIssuerDid });
        // :snippet-end:
        expect(typeof signedVcJwt).toBe('string');
        expect(signedVcJwt).not.toBe('');
    });
});
