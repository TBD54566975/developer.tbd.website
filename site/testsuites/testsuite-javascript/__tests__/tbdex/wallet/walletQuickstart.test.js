import { it, expect, describe } from 'vitest';
// :snippet-start: walletQuickstartImports
import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht, DidJwk } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials';
// :snippet-end:

// Implementation in /site/code-snippets/tbdex/wallet-quickstart.js

// using https://aqf-mock-pfis.tbddev.org/ from mock-pfis
// :snippet-start: walletQuickstartPfiDid
const pfiDid = 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y';
// :snippet-end:

let customerDid, customerCredentials, selectedOffering, selectedCredentials, rfq, exchangeId, quote, close;

describe('Wallet: Quickstart', () => {

    it('should import existing customer DID', async () => {
        // :snippet-start: walletQuickstartDidCreate
        customerDid = await DidDht.create({
            options: {
                publish: true,
            },
        });
        // :snippet-end:
    });

    it('should get offerings and select one', async () => {
      // :snippet-start: walletQuickstartGetOfferings
      const offerings = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });
      // :snippet-end:

      //:snippet-start: walletQuickstartSelectOffering
      if (offerings) {
          selectedOffering = offerings.find(
              (offering) =>
                  offering.data.payin.currencyCode === 'USD' &&
                  offering.data.payout.currencyCode === 'KES'
          );
      }
      //:snippet-end:

      expect(selectedOffering).toBeDefined();
    });

    it('should successfully request a verifiable credential', async () => {
        const vcJwt = await fetch(`https://mock-idv.tbddev.org/kcc?name=angie&country=US&did=${customerDid.uri}`).then(res => res.text());
        customerCredentials = [vcJwt];

        expect(typeof vcJwt).toBe('string');
        expect(customerCredentials).toBeDefined();
    });

    it('should select credentials', async () => {
        // :snippet-start: walletQuickstartSelectCredentials
        selectedCredentials = PresentationExchange.selectCredentials({
            vcJwts: customerCredentials,
            presentationDefinition: selectedOffering.data.requiredClaims,
        });
        // :snippet-end:

        expect(selectedCredentials.length).toBe(1);
    });

    it('should create and send RFQ', async () => {
        // :snippet-start: walletQuickstartCreateRfq
        rfq = Rfq.create({
            metadata: {
                to: pfiDid, // PFI's DID
                from: customerDid.uri, // Customer DID
                protocol: '1.0', // Version of tbDEX protocol you're using
            },
            data: {
                offeringId: selectedOffering.metadata.id, // The ID of the selected offering
                payin: {
                    kind: 'USD_BANK_TRANSFER', // The method of payment
                    amount: '500.65', // The amount of the payin currency
                    paymentDetails: {
                        accountNumber: '1234567890',
                        routingNumber: '123456789',
                    },
                },
                payout: {
                    kind: 'KES_BANK_TRANSFER', // The method for receiving payout
                    paymentDetails: {
                        accountNumber: '3245231234', // Details required to execute payment
                    },
                },
                claims: selectedCredentials, // Array of signed VCs required by the PFI
            },
        });
        // :snippet-end:

        expect(async () => {
            try {
                // :snippet-start: walletQuickstartSendRfq
                await rfq.verifyOfferingRequirements(selectedOffering);
                await rfq.sign(customerDid);
                await TbdexHttpClient.createExchange(rfq);
                // :snippet-end:
            } catch (e) {
                throw e;
            }
        }).not.toThrow();
    });

    it('should process the quote', async () => {
        // :snippet-start: walletQuickstartProcessQuote
        // Wait for Quote message to appear in the exchange
        exchangeId = rfq.exchangeId;
        let attempts = 0;
        const maxAttempts = 30;
        const delay = 2000; // 2 seconds

        while (!quote && attempts < maxAttempts) {
            try {
                const exchange = await TbdexHttpClient.getExchange({
                    pfiDid: pfiDid,
                    did: customerDid,
                    exchangeId: exchangeId,
                });

                quote = exchange.find((msg) => msg instanceof Quote);

                if (!quote) {
                    // Make sure the exchange is still open
                    close = exchange.find((msg) => msg instanceof Close);

                    if (close) {
                        break;
                    } else {
                        // Wait 2 seconds before making another request
                        await new Promise((resolve) => setTimeout(resolve, delay));
                    }
                }
            } catch (e) {
                if (e.statusCode === 404 || e.statusCode === 401) {
                    // Waiting on RFQ to be processed
                } else throw e;
            }
            attempts++;
        }
        // :snippet-end:

        expect(quote).toBeDefined();
    });

    it('should create and submit an order', async () => {
        let order;
        while (!order) {
            // :snippet-start: walletQuickstartCreateOrder
            order = Order.create({
                metadata: {
                    from: customerDid.uri, // Customer's DID
                    to: pfiDid, // PFI's DID
                    exchangeId: exchangeId, // Exchange ID from the Quote
                    protocol: '1.0', // Version of tbDEX protocol you're using
                },
            });
            // :snippet-end:

            expect(order).toBeDefined();
        }

        expect(async () => {
            try {
                // :snippet-start: walletQuickstartSubmitOrder
                await order.sign(customerDid);
                await TbdexHttpClient.submitOrder(order);
                // :snippet-end:
            } catch (e) {
                if (e.statusCode === 404) {
                    // Waiting on RFQ to be processed
                } else throw e;
            }
        }).not.toThrow();
    });

    it('should process close message', async () => {
        // :snippet-start: walletQuickstartProcessClose
        let attempts = 0;
        const maxAttempts = 30;
        const delay = 2000; // 2 seconds

        while (!close && attempts < maxAttempts) {
            try {
                const exchange = await TbdexHttpClient.getExchange({
                    pfiDid: pfiDid,
                    did: customerDid,
                    exchangeId: exchangeId,
                });

                for (const message of exchange) {
                    if (message instanceof Close) {
                        close = message;
                    }
                }
            } catch (e) {
                if (e.statusCode === 404 || e.statusCode === 401) {
                    // Waiting on RFQ to be processed
                } else throw e;
            }
            attempts++;
            if (!close) await new Promise((resolve) => setTimeout(resolve, delay));
        }
        const reasonForClose = close.data.reason;
        const closeSuccess = close.data.success;
        // :snippet-end:

        expect(closeSuccess).toBe(true);
        expect(reasonForClose).toBeDefined();
    });
});
