import { test, expect, describe, beforeAll, afterAll } from 'vitest';
// :snippet-start: walletQuickstartImports
import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht } from '@web5/dids';
// :snippet-end:

let customerDid;
let pfiDid = 'did:dht:zwxd1e77xp875it79so7hyhaw7ojdp3gzdomxw1zje9dm1ft7mho';
let selectedOffering;
let credentials;
let exchangeId;
let rfq;
let quote;
let order;

describe('Wallet: Quickstart', () => {

    test('getOfferings HTTP Call', async () => {

        // :snippet-start: walletQuickstartDidCreate
        customerDid = await DidDht.create({
            options: {
                publish: true
            },
        });
        // :snippet-end:

        // :snippet-start: walletQuickstartGetOfferings
        const offerings  = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });
        // :snippet-end:

        // TODO: Get credentials and the presentation definition

        selectedOffering = offerings[0];
        expect(selectedOffering).toBeDefined();
    });

    test('Pull Wallet Credentials', async () => {
        // Get the credential like this:
        // https://github.com/TBD54566975/tbdex-pfi-exemplar/blob/268bf174362d67b1f0408e3342b0807cc31461af/src/example/issue-credential.ts

        let myCredentials = [];

        // :snippet-start: walletQuickstartSelectCredentials
        const selectedCredentials = PresentationExchange.selectCredentials({
            vcJwts: myCredentials,
            presentationDefinition: selectedOffering.data.requiredClaims,
        });
        // :snippet-end:
        credentials = selectedCredentials;
        expect(selectedCredentials.length).toBe(1);
    });
    
    test('Create RFQ', async () => {
        const BTC_ADDRESS = 'bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd'
        const selectedCredentials = credentials;

        // :snippet-start: walletQuickstartCreateRfq
        rfq = Rfq.create({
            metadata: {
            to: selectedOffering.metadata.from, // PFI's DID
            from: customerDid.uri,              // Customer DID
            protocol: '1.0'                     // Version of tbDEX protocol you're using
            },
            data: {
            offeringId: selectedOffering.metadata.id,   // The ID of the selected offering
            payin: {
                kind: 'DEBIT_CARD',                       // The method of payment
                amount: '500.65',                         // The amount of the payin currency 
                paymentDetails: {
                cardNumber: '1234567890123456',
                expiryDate: '05/25',
                cardHolderName: 'Alice Doe',
                cvv: '123'
                }
            },
            payout: {
                kind: 'BTC_ADDRESS',                      // The method for receiving payout                         
                paymentDetails: {
                btcAddress: BTC_ADDRESS                 // Recipient's BTC wallet address
                }
            },
            claims: selectedCredentials  // Array of signed VCs required by the PFI
            }
        });
        // :snippet-end:
        
        expect(() => {
            try{
                rfq.verifyOfferingRequirements(selectedOffering);
            } catch (e) {
                // handle failed verification
            }
        }).not.toThrow();
    });

    test('Verify, send, and sign RFQ', async () => {
        expect(async () => {
            // :snippet-start: walletQuickstartSendRfq
            try{
                rfq.verifyOfferingRequirements(selectedOffering);
                await rfq.sign(customerDid);
                await TbdexHttpClient.createExchange(rfq);
            } catch (e) {
                // handle failed verification
            }
            // :snippet-end:
        }).not.toThrow();
    });

    test('Process Quote and Create Order', async () => {
        // :snippet-start: walletQuickstartProcessQuote
        // Wait for Quote message to appear in the exchange
        exchangeId = rfq.exchangeId;
        while (!quote) {
            const exchange = await TbdexHttpClient.getExchange({
                pfiDid: rfq.metadata.to,
                did: customerDid,
                exchangeId: exchangeId
            });

            quote = exchange.find(msg => msg instanceof Quote);

            if (!quote) {
                // Make sure the exchange is still open
                close = exchange.find(msg => msg instanceof Close);
                
                if(close) { break; } 
                else {
                // Wait 2 seconds before making another request
                await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }
        // :snippet-end:

        expect(quote).toBeDefined();
    });

    test('Create Order', async () => {
        // :snippet-start: walletQuickstartCreateOrder
        const order = Order.create({
            metadata: {
            from: customerDid,         // Customer's DID
            to: pfiDid,       // PFI's DID
            exchangeId: exchangeId,  // Exchange ID from the Quote
            protocol: "1.0"                // Version of tbDEX protocol you're using
            }
        });
        // :snippet-end:

        expect(order).toBeDefined();
    });
        
    test('Sign and Submit Order', async () => {
        expect(async () => {
            // :snippet-start: walletQuickstartSubmitOrder
            await order.sign(customerDid);
            await TbdexHttpClient.submitOrder(order);
            // :snippet-end:
        }).not.toThrow();
    });

    test('Process Close', async () => {
        while (!close) {
            const exchange = await TbdexHttpClient.getExchange({
                pfiDid: pfiDid,
                did: customerDid,
                exchangeId: exchangeId
            })

            for (const message of exchange) {
                if (message instanceof Close) {
                    close = message
                }
            }
        }

        // :snippet-start: walletQuickstartProcessClose
        const reasonForClose = close.data.reason;
        // :snippet-end:

        expect(reasonForClose).toBeDefined();
        });
});
