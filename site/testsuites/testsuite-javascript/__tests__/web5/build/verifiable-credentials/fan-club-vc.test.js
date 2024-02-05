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
    test('import dids package and create dids', async () => {
        const importAndCreateDids = `
      // :snippet-start: importAndCreateDids
      import { DidKeyMethod } from '@web5/dids';

      const fanClubIssuerDid = await DidKeyMethod.create();
      const aliceDid = await DidIonMethod.create();
      // :snippet-end:
    `
    });

    test('import credentials package and create class for credential', async () => {
        const importAndCreateClassCredential = `
      // :snippet-start: importAndCreateClassCredential
      import { VerifiableCredential } from '@web5/credentials';

        class SwiftiesFanClub {
            constructor(level, legit) {
                // indicates the fan's dedication level
                this.level = level;

                // indicates if the fan is a genuine Swiftie
                this.legit = legit;
            }
        }
      // :snippet-end:
    `
    });
    test('createFanClubVc creates a vc for fan club', async () => {
        // :snippet-start: createFanClubVc
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

    test('signFanClubVc signs a vc for fan club and returns jwt', async () => {
        // :snippet-start: signFanClubVc
        const signedVcJwt = await vc.sign({ did: fanClubIssuerDid });
        // :snippet-end:
        expect(typeof signedVcJwt).toBe('string');
        expect(signedVcJwt).not.toBe('');
    });

    test('satisfiesPresentationDefinitionFanClubVc checks if VC satisfies the presentation definition', async () => {
        const logSpy = vi.spyOn(console, 'log');
        // :snippet-start: satisfiesPresentationDefinitionFanClubVc
        // Does VC Satisfy the Presentation Definition
        try {
            PresentationExchange.satisfiesPresentationDefinition({ vcJwts: [signedVcJwt], presentationDefinition: presentationDefinition });
            console.log('\nVC Satisfies Presentation Definition!\n');
        } catch (err) {
            console.log('VC does not satisfy Presentation Definition: ' + err.message);
        }
        // :snippet-end:
        expect(logSpy).toHaveBeenCalledWith('\nVC Satisfies Presentation Definition!\n');
        logSpy.mockRestore();
    });

    test('createPresentationFromCredentialsFanClubVc creates presentation from credentials and checks the presentation result', async () => {
        // :snippet-start: createPresentationFromCredentialsFanClubVc
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
    test('verifyFanClubVc checks if VC verification is successful', async () => {
        const logSpy = vi.spyOn(console, 'log');
        // :snippet-start: verifyFanClubVc
        try {
            await VerifiableCredential.verify({ vcJwt: signedVcJwt });
            console.log('\nVC Verification successful!\n');
        } catch (err) {
            console.log('\nVC Verification failed: ' + err.message + '\n');
        }
        // :snippet-end:
        expect(logSpy).toHaveBeenCalledWith('\nVC Verification successful!\n');
        logSpy.mockRestore();
    });

    test('parseFanClubJwt parses the signed VC JWT', async () => {
        // :snippet-start: parseFanClubJwt
        const parsedVC = await VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
        // :snippet-end:
        expect(parsedVC).toHaveProperty('vcDataModel');
        expect(parsedVC.vcDataModel).toHaveProperty('credentialSubject');
        expect(parsedVC.vcDataModel.credentialSubject.level).toBe('Stan');
        expect(parsedVC.vcDataModel.credentialSubject.legit).toBe(true);
    });
});

