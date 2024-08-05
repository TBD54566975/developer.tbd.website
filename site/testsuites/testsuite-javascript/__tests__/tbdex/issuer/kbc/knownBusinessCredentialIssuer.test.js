import { describe, test, expect, beforeAll } from 'vitest';
// :snippet-start: importKnownBusinessCredentialJs
import { VerifiableCredential } from '@web5/credentials';
import { DidDht } from '@web5/dids';
import { Offering } from '@tbdex/http-client';
// :snippet-end:

describe("Known Business Credential", () => {
    let pfiDid;
    let subjectDid;
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
        subjectDid = await DidDht.create()
    })

    test("Issue and Sign Known Business Credential", async () => {
        // :snippet-start: kbcCredentialClass
        class KbcCredential {
            constructor(id, credentialSchema) {
                this.data = {
                    id: id
                };
                this.credentialSchema = credentialSchema;
            }
        }
        // :snippet-end:

        // :snippet-start: issueKbcJs
        const vc = await VerifiableCredential.create({
            issuer: pfiDid.uri,
            subject: subjectDid.uri,
            expirationDate: '2025-09-30T12:34:56Z',
            data: new KbcCredential(
                subjectDid.uri,
                {
                    type: "JsonSchema",
                    id: "https://vc.schemas.host/kbc.schema.json"
                },
            )
        });
        const signedVc = await vc.sign({ did: pfiDid })
        // :snippet-end:
        expect(vc).toBeDefined();
        expect.soft(vc).toHaveProperty('issuer', pfiDid.uri);
        expect(typeof signedVc).toBe('string');

    })

    test("Required claims in Known Business Credential", async () => {
        // :snippet-start: kbcPresentationDefinitionJs
        const pd = {
            id: "presentation-definition-kbc",
            name: "KYB Verification",
            purpose: "Verifiying your business status.",
            format: {
                jwt_vc: {
                    alg: ["ES256K", "EdDSA"]
                }
            },
            input_descriptors: [
                {
                    id: "known-business-credential",
                    name: "Known Business Credential",
                    purpose: "Please present your Known Business Credential for verification.",
                    constraints: {
                        fields: [
                            {
                                path: ["$.credentialSchema.id"],
                                filter: {
                                    type: "string",
                                    const: "https://vc.schemas.host/kbc.schema.json"
                                }
                            },
                            {
                                path: ["$.issuer"],
                                filter: {
                                    type: "string",
                                    const: pfiDid.uri
                                }
                            }
                        ]
                    }
                }
            ]
        };
        // :snippet-end:

        try {
            // :snippet-start: kbcCreateOfferingJs
            const offering = Offering.create({
                metadata: {
                    from: pfiDid.uri,
                    protocol: "1.0"
                },
                data: {
                    description: "Selling BTC for USD",
                    payin: {
                        currencyCode: "USD",
                        methods: [{
                            kind: "DEBIT_CARD",
                            requiredPaymentDetails: {
                                "$schema": "http://json-schema.org/draft-07/schema",
                                "type": "object",
                                "properties": {
                                    "cardNumber": {
                                        "type": "string",
                                        "description": "The 16-digit debit card number",
                                        "minLength": 16,
                                        "maxLength": 16
                                    },
                                    "expiryDate": {
                                        "type": "string",
                                        "description": "The expiry date of the card in MM/YY format",
                                        "pattern": "^(0[1-9]|1[0-2])\\/([0-9]{2})$"
                                    },
                                    "cardHolderName": {
                                        "type": "string",
                                        "description": "Name of the cardholder as it appears on the card"
                                    },
                                    "cvv": {
                                        "type": "string",
                                        "description": "The 3-digit CVV code",
                                        "minLength": 3,
                                        "maxLength": 3
                                    }
                                }
                            }
                        }]
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
            // :snippet-end:


            await offering.sign(pfiDid);

            offering.validate();

        } catch (e) {
            expect.fail(e.message)
        }
    })



})
