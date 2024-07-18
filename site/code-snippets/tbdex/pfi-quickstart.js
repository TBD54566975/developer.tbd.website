import { Quote, Offering, OrderStatus, Close } from '@tbdex/http-client';
import { DidDht } from '@web5/dids';

let context = {};

export async function pfiQuickstartGetDid() {
    context.pfiDid = await DidDht.create({
        options:{
            services: [{
                id: 'pfi',
                type: 'PFI',
                serviceEndpoint: 'https://localhost:8080'
            }]
        }
    });

    context.issuerDid = await DidDht.create();
    context.customerDid = "did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo";
}

export async function pfiQuickstartPingServer() {
    return "HTTP 200:OK";
}

export async function pfiQuickstartAddOffering() {
    context.offering = Offering.create({
        metadata: { from: context.pfiDid.uri },
        data: {
          description: 'fake offering 1',
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
                      description: 'Phone number of the Mobile Money account',
                      type: 'string',
                    },
                    reason: {
                      title: 'Reason for sending',
                      description:
                        'To abide by the travel rules and financial reporting requirements, the reason for sending money',
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
                      description: 'Bank account of the recipient\'s bank account',
                      type: 'string',
                    },
                    reason: {
                      title: 'Reason for sending',
                      description:
                        'To abide by the travel rules and financial reporting requirements, the reason for sending money',
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
                        const: context.issuerDid.trim()
                      }
                    }
                  ],
                },
              },
            ],
          },
        },
      })
      
    return "HTTP 202:OK";
} 

export async function pfiQuickstartGetOfferings() {
    return [context.offering];
}

export async function pfiQuickstartGetExchanges() {

}

export async function pfiQuickstartGetQuote() {
    // Set the Quote's expiration date for 10 days from now
    var quoteExpiration = new Date();
    quoteExpiration.setDate(quoteExpiration.getDate() + 10);

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