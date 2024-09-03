import { describe, test, expect, beforeAll } from 'vitest';
import { VerifiableCredential } from '@web5/credentials';
import { DidDht } from '@web5/dids';
import { Offering } from '@tbdex/http-client';

describe("Known Business Credential", () => {
    let pfiDid;
    let subjectDidUri;
    beforeAll(async () => {
        pfiDid = await DidDht.create({
            options: {
                publish: true,
                services: [{
                    id: 'pfi',
                    type: 'PFI',
                    serviceEndpoint: 'https://example.com/'
                }]
            },
        })
        const subjectDid = await DidDht.create()
        subjectDidUri = subjectDid.uri;
    })

    test("Issue Known Business Credential", async () => {
        // :snippet-start: issueKbcJs
        const kbc = await VerifiableCredential.create({
            issuer: pfiDid.uri, // Issuer's DID URI
            subject: subjectDidUri, // Wallet app's DID URI
            expirationDate: '2025-09-30T12:34:56Z', // Date the KBC should expire
            data: {
                //Custom attributes for the KBC 
                },
            credentialSchema: {
                type: "JsonSchema", // Format type of the schema used for the KBC
                id: "https://vc.schemas.host/kbc.schema.json" // URL to the schema used for the KBC
            }
        })
        const signedKbc = await kbc.sign({ did: pfiDid });
        // :snippet-end:
        expect(kbc).toBeDefined();
        expect.soft(kbc).toHaveProperty('issuer', pfiDid.uri);
        expect(typeof signedKbc).toBe('string');

    })

    test("Required claims in Known Business Credential", async () => {
        // :snippet-start: kbcPresentationDefinitionJs
        const pd = {
            id: "presentation-definition-kbc", // required unique id for presentation definition
            name: "KYB Verification",
            purpose: "Verifiying your business status.",
            format: {
                jwt_vc: {
                    alg: ["ES256K", "EdDSA"]
                }
            },
            input_descriptors: [
                {
                    id: "known-business-credential_1", // required unique id for the input descriptor
                    name: "Known Business Credential",
                    purpose: "Please present your Known Business Credential for verification.",
                    constraints: {
                        fields: [
                            {
                                path: ["$.vc.credentialSchema[0].id"],
                                filter: {
                                    type: "string",
                                    const: "https://vc.schemas.host/kbc.schema.json"
                                }
                            },
                            {
                                path: ["$.vc.issuer"],
                                filter: {
                                    type: "string",
                                    const: pfiDid.uri
                                }
                            }
                        ]
                    },
                }
            ]
        };
        // :snippet-end:

        try {
            // :snippet-start: kbcCreateOfferingJs
            const offering = Offering.create({
                metadata: {
                    from: pfiDid.uri,
                },
                data: {
                    description: "Selling BTC for USD",
                    payin: {
                        currencyCode: "USD",
                        max: "100.00",
                        methods: [
                          {
                            description: "Pay in via Debit Card, Apple Pay, or CashApp Pay",
                            kind: "PAYMENT_LINK",
                            name: "Debit Card, ApplePay, CashApp Pay"
                          }
                        ]
                    },
                    payout: {
                        currencyCode: 'BTC',
                        methods: [
                            {
                                kind: 'BTC_ADDRESS',
                                estimatedSettlementTime: 60,
                                fee: '0.25',
                            }
                        ]
                    },
                    payoutUnitsPerPayinUnit: '0.00003826',
                    // highlight-next-line
                    requiredClaims: pd
                }
            });

            await offering.sign(pfiDid);
            offering.validate();

            // :snippet-end:

        } catch (e) {
            expect.fail(e.message)
        }
    })
})