import { test, expect, describe, beforeAll } from 'vitest';
import { PresentationExchange } from '@web5/credentials';
import { Offering } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';


describe("PFI: Offerings", () => {

    let pfiDid;
    let pd;

    beforeAll(async () => {
        pfiDid = await DidDht.create();
        // :snippet-start: kccPresentationDefintionJs
        pd = {
            id: "presentation-definition-kcc",
            name: "KYC Verification",
            purpose: "We need to verify your customer status and necessary checks.",
            format: {
              jwt_vc: {
                alg: ["ES256K", "EdDSA"]
              }
            },
            input_descriptors: [
              {
                id: "known-customer-credential",
                name: "Known Customer Credential",
                purpose: "Please present your Known Customer Credential for verification.",
                constraints: {
                  fields: [
                    {
                      path: ["$.type[*]"],
                      filter: {
                        type: "string",
                        pattern: "KnownCustomerCredential"
                      }
                    },
                    {
                      path: ["$.evidence[*].kind"],
                      filter: {
                        type: "string",
                        pattern: "sanction_screening"
                      }
                    },
                    {
                      path: ["$.credentialSubject.countryOfResidence"],
                      filter: {
                        type: "string",
                        const: "US"
                      }
                    },
                    {
                      path: ["$.issuer"],
                      filter: {
                        type: "string",
                        const: "did:dht:d4sgiggd3dwimo4ubki7spo45q5dazxphrizbxhcgapapcnzpouy"
                      }
                    }
                  ]
                }
              }
            ]
        };
        // :snippet-end:  
    })

    test("Create Offering", async () => {
        try{
            // :snippet-start: pfiCreateOfferingJs
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
                    requiredClaims: pd
                }
            });
            // :snippet-end:

            // :snippet-start: pfiSignOfferingJs
            await offering.sign(pfiDid);
            // :snippet-end:

            // :snippet-start: pfiValidateOfferingJs
            offering.validate();
            // :snippet-end:
        } catch(e) {
            expect.fail(e.message)
        }
    })

    test("Validate KCC PD", async () => {
        try {
            // :snippet-start: kccValidatePdJs
            PresentationExchange.validateDefinition({ 
                presentationDefinition: pd 
            });
            // :snippet-end:
          } catch (e) {
            expect.fail(e.message)
          }
    })
})
