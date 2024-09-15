import { Quote, Offering, OrderStatus, Close, Rfq } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials'

let context = {};

export async function pfiQuickstartGetDid() {
    context.pfiDid = await DidDht.create({
        options:{
            services: [{
                id: 'pfi',
                type: 'PFI',
                serviceEndpoint: 'https://pfiexemplar.tbddev.org/'
            }]
        }
    });

    context.issuerDid = await DidDht.create();
    context.customerDid = "did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo";

    return context.pfiDid.uri;
}

export async function pfiQuickstartAddOffering() {
    context.offering = Offering.create({
        metadata: { from: context.pfiDid.uri },
        data: {
          description: 'Exchange USD to KES',
          payoutUnitsPerPayinUnit: '0.0069', // ex. we send 100 dollars, so that means 14550.00 KES
          payin: {
            currencyCode: 'USD',
            methods: [
              {
                kind: 'USD_LEDGER',
                requiredPaymentDetails: {},
              },
            ],
          },
          payout: {
            currencyCode: 'KES',
            methods: [
              {
                kind: 'MOMO_MPESA',
                requiredPaymentDetails: {
                  $schema: 'http://json-schema.org/draft-07/schema#',
                  title: 'Mobile Money Required Payment Details',
                  type: 'object',
                  required: ['phoneNumber', 'reason'],
                  additionalProperties: false,
                  properties: {
                    phoneNumber: {
                      title: 'Mobile money phone number',
                      description: 'Phone number',
                      type: 'string',
                    },
                    reason: {
                      title: 'Reason for sending',
                      description:
                        'Required for legal reasons',
                      type: 'string',
                    },
                  },
                },
                estimatedSettlementTime: 10
              },
              {
                kind: 'BANK_FIRSTBANK',
                requiredPaymentDetails: {
                  $schema: 'http://json-schema.org/draft-07/schema#',
                  title: 'Bank Transfer Required Payment Details',
                  type: 'object',
                  required: ['accountNumber', 'reason'],
                  additionalProperties: false,
                  properties: {
                    accountNumber: {
                      title: 'Bank account number',
                      description: 'Recepient bank account',
                      type: 'string',
                    },
                    reason: {
                      title: 'Reason for sending',
                      description:
                        'Required for legal reasons',
                      type: 'string',
                    },
                  },
                },
                estimatedSettlementTime: 10
              },
            ],
          },
          requiredClaims: {
            id: '7ce4004c-3c38-4853-968b-e411bafcd945',
            input_descriptors: [
              {
                id: 'bbdb9b7c-5754-4f46-b63b-590bada959e0',
                constraints: {
                  fields: [
                    {
                      path: ['$.type[*]'],
                      filter: {
                        type: 'string',
                        pattern: '^SanctionCredential$',
                      },
                    },
                    {
                      path: ['$.issuer'],
                      filter: {
                        type: 'string',
                        const: context.issuerDid.uri
                      }
                    }
                  ],
                },
              },
            ],
          },
        },
      })
    const createdOffering = context.offering;

    await context.offering.sign(context.issuerDid);

    return [createdOffering];
}

export async function pfiQuickstartGetOfferings() {
    await pfiQuickstartAddOffering();
    return [context.offering];
}

export async function pfiQuickstartGetExchanges() {

  const vc = await VerifiableCredential.create({
    type    : 'SanctionCredential',
    issuer  : context.issuerDid.uri,
    subject : context.customerDid,
    data    : {
        'beep': 'boop'
    }
  });

  const vcJwt = await vc.sign({ did: context.issuerDid});

  let rfq = Rfq.create({
    metadata: {
      to: context.pfiDid.uri, // PFI's DID
      from: context.customerDid,              // Customer DID
      protocol: '1.0'                     // Version of tbDEX protocol you're using
    },
    data: {
      offeringId: context.offering.metadata.id,   // The ID of the selected offering
      payin: {
          kind: 'USD_LEDGER',                       // The method of payment
          amount: '500.65',                         // The amount of the payin currency
          paymentDetails: {
          cardNumber: '1234567890123456',
          expiryDate: '05/25',
          cardHolderName: 'Alice Doe',
          cvv: '123'
          }
      },
      payout: {
          kind: 'MOMO_MPESA',                      // The method for receiving payout
          paymentDetails: {
              phoneNumber: '123-456-7890',                 // Details to execute payment
              reason: "Payment for services rendered"
          }
      },
      claims: vcJwt  // Array of signed VCs required by the PFI
    }
  });

  await rfq.sign(context.pfiDid);

  return [rfq];
}

export async function pfiQuickstartGetQuote() {
    // Set the Quote's expiration date for 1 day from now
    var quoteExpiration = new Date();
    quoteExpiration.setDate(quoteExpiration.getDate() + 1);

    const quote = Quote.create({
    metadata: {
        from: context.pfiDid.uri,
        to: context.customerDid,
        exchangeId: "rfq_01j1xmd1v5eybr00ta4xevpvrj",
        protocol: '1.0'
    },
    data: {
        expiresAt: quoteExpiration.toLocaleDateString('en-us'),
        payin: {
        currencyCode: context.offering.data.payin.currencyCode,
        amount: '0.01',
        fee: '0.0001',
        paymentInstruction : {
            link: 'https://example.com/paymentInstructions',
            instruction: 'Detailed payment instructions'
        }
        },
        payout: {
        currencyCode: context.offering.data.payout.currencyCode,
        amount: '1000.00',
        paymentInstruction : {
            link: 'https://example.com/paymentInstructions',
            instruction: 'Detailed payout instructions'
        }
        }
    }
    });

    await quote.sign(context.pfiDid);

    return quote;
}

export async function pfiQuickstartGetOrderStatus() {
    const orderStatus = OrderStatus.create({
        metadata: {
            from: context.pfiDid.uri,
            to: context.customerDid,
            exchangeId: "rfq_01j1xmd1v5eybr00ta4xevpvrj"
        },
        data: { orderStatus: 'PROCESSING' }
    })

    await orderStatus.sign(context.pfiDid)

    return orderStatus;
}

export async function pfiQuickstartGetClose() {
    const closeMessage = Close.create({
        metadata: {
            from: context.pfiDid.uri,
            to: context.customerDid,
            exchangeId: "rfq_01j1xmd1v5eybr00ta4xevpvrj"
        },
        data: {
            reason: 'COMPLETED',
            success: true // Indicates the transaction was successful
        }
    })

    await closeMessage.sign(context.pfiDid)

    return closeMessage;
}
