import { test, expect, vi, describe, beforeAll } from 'vitest';
import { DidKeyMethod } from '@web5/dids';
import { VerifiableCredential, PresentationExchange } from '@web5/credentials';
import { setUpWeb5 } from '../../../setup-web5';

describe('fan-club-vc', () => {
    let web5, did, fanClubIssuerDid, aliceDid, SwiftiesFanClub, vc, signedVcJwt, presentationDefinition;

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

        signedVcJwt = await vc.sign({ did: fanClubIssuerDid });

        presentationDefinition = {
            'id': 'presDefId123',
            'name': 'Swifties Fan Club Presentation Definition',
            'purpose': 'for proving membership in the fan club',
            'input_descriptors': [
                {
                    'id': 'legitness',
                    'purpose': 'are you legit or not?',
                    'constraints': {
                        'fields': [
                            {
                                'path': [
                                    '$.credentialSubject.legit',
                                ]
                            }
                        ]
                    }
                }
            ]
        };

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
        const fan = new SwiftiesFanClub('Stan', true);
        expect(fan.legit).toBe(true);
        expect(fan.level).toBe('Stan');
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
        expect(vc.vcDataModel).toHaveProperty('credentialSubject');
        expect(vc.vcDataModel.credentialSubject.level).toBe('Stan');
        expect(vc.vcDataModel.credentialSubject.legit).toBe(true);
    });

    test('signVC creates a vc', async () => {
        // :snippet-start: signVC
        const signedVcJwt = await vc.sign({ did: fanClubIssuerDid });
        // :snippet-end:
        expect(typeof signedVcJwt).toBe('string');
        expect(signedVcJwt).not.toBe('');
    });

    test('createPresentationDefinition creates a presentation definition', async () => {
        // :snippet-start: createPresentationDefinition
        const presentationDefinition = {
            'id': 'presDefId123',
            'name': 'Swifties Fan Club Presentation Definition',
            'purpose': 'for proving membership in the fan club',
            'input_descriptors': [
                {
                    'id': 'legitness',
                    'purpose': 'are you legit or not?',
                    'constraints': {
                        'fields': [
                            {
                                'path': [
                                    '$.credentialSubject.legit',
                                ]
                            }
                        ]
                    }
                }
            ]
        };

        const definitionValidation = PresentationExchange.validateDefinition({ presentationDefinition });
        // :snippet-end:
        expect(definitionValidation).toHaveLength(1);
        expect(definitionValidation[0]).toHaveProperty('message', 'ok');
        expect(definitionValidation[0]).toHaveProperty('status', 'info');
        expect(definitionValidation[0]).toHaveProperty('tag', 'root');
    })

    test('satisfiesDefinition checks if VC satisfies the presentation definition', async () => {
        const logSpy = vi.spyOn(console, 'log');
        // :snippet-start: satisfiesDefinition
        // Does VC Satisfy the Presentation Definition
        try {
            PresentationExchange.satisfiesPresentationDefinition({ vcJwts: [signedVcJwt], presentationDefinition: presentationDefinition });
            console.log('VC Satisfies Presentation Definition!');
        } catch (err) {
            console.log('VC does not satisfy Presentation Definition: ' + err.message);
        }
        // :snippet-end:
        expect(logSpy).toHaveBeenCalledWith('VC Satisfies Presentation Definition!');
        logSpy.mockRestore();
    });

    test('createPresentationFromCredentials creates presentation from credentials and checks the presentation result', async () => {
        // :snippet-start: createPresentationFromCredentials
        // Create Presentation Result that contains a Verifiable Presentation and Presentation Submission
        const presentationResult = PresentationExchange.createPresentationFromCredentials({ vcJwts: [signedVcJwt], presentationDefinition: presentationDefinition });
        console.log('\nPresentation Result: ' + JSON.stringify(presentationResult));
        // :snippet-end:
        
        expect(presentationResult.presentation).toHaveProperty('@context');
        expect(presentationResult.presentation).toHaveProperty('type');
        expect(presentationResult.presentation).toHaveProperty('presentation_submission');
        expect(presentationResult).toHaveProperty('presentationSubmissionLocation');
        expect(presentationResult).toHaveProperty('presentationSubmission');
    });
    test('verify VC checks if VC verification is successful', async () => {
        // :snippet-start: verifyVC
        let result
        
        try {
            result = await VerifiableCredential.verify({ vcJwt: signedVcJwt });
            console.log('VC Verification Successful!');
        } catch (err) {
            console.log('VC Verification failed:' + err.message);
        }
        // :snippet-end:
        expect(result).toHaveProperty('vc');
        expect(result.vc).toHaveProperty('credentialSubject');
        expect(result.vc.credentialSubject.level).toBe('Stan');
        expect(result.vc.credentialSubject.legit).toBe(true);
    });

    test('parseSignedVcJwt parses the signed VC JWT', async () => {
        // :snippet-start: parseSignedVcJwt
        const vc = VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
        // :snippet-end:
        expect(vc).toHaveProperty('vcDataModel');
        expect(vc.vcDataModel).toHaveProperty('credentialSubject');
        expect(vc.vcDataModel.credentialSubject.level).toBe('Stan');
        expect(vc.vcDataModel.credentialSubject.legit).toBe(true);
    });
});
