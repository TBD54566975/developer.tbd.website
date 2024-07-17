import { test, expect, describe, beforeAll, afterAll } from 'vitest';
// :snippet-start: walletQuickstartImports
import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials'
// :snippet-end:

let customerDid;
let pfiDid = 'did:dht:ccqamm6qgbe763ya8f3bo5mkrtxx1pz7i789zeqq4bmoae4qnixy';
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

        let customerDidString = '{"uri":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","document":{"id":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","verificationMethod":[{"id":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0","type":"JsonWebKey","controller":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"4dGQOFwyacipPH04UG1rULQkBc8h6jNOhLPMgvoUOgs","kid":"XPokllC3LZAVGizIL0naDdByQHeyY12uLJaXO4j46Nw","alg":"EdDSA"}}],"authentication":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"assertionMethod":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"capabilityDelegation":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"capabilityInvocation":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"]},"metadata":{"published":true,"versionId":"1718740086"},"privateKeys":[{"crv":"Ed25519","d":"iTfn3Z8uPp3gTg-9LxQVZVODGqnP3M0UDjZiIwBEctc","kty":"OKP","x":"4dGQOFwyacipPH04UG1rULQkBc8h6jNOhLPMgvoUOgs","kid":"XPokllC3LZAVGizIL0naDdByQHeyY12uLJaXO4j46Nw","alg":"EdDSA"}]}'

        // Customer DID    
        const portableDid = JSON.parse(customerDidString);
        customerDid = await DidDht.import({ portableDid });

        // :snippet-start: walletQuickstartGetOfferings
        const offerings  = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });
        // :snippet-end:

        //:snippet-start: walletQuickstartSelectOffering
        var matchedOfferings = [];
        if(offerings){
            const filteredOfferings = offerings.filter(offering =>
            offering.data.payin.currencyCode === 'USD' &&
            offering.data.payout.currencyCode === 'KES'
            );
            matchedOfferings.push(...filteredOfferings);
        }

        // Select the first offering that matches our criteria
        selectedOffering = matchedOfferings[0];
        //:snippet-end:

        expect(selectedOffering).toBeDefined();
    });

    test('Pull Wallet Credentials', async () => {

        let issuerDid = '{"uri":"did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny","document":{"id":"did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny","verificationMethod":[{"id":"did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0","type":"JsonWebKey","controller":"did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"4ZHv3tRuu6WCP9Dlr7SxAyxleAT8ZlJzokU0ciO-DsQ","kid":"YovQ1tV4TzP3vEK56W1ALWw4yaakW2YxnTWjRkoisD0","alg":"EdDSA"}}],"authentication":["did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0"],"assertionMethod":["did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0"],"capabilityDelegation":["did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0"],"capabilityInvocation":["did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0"]},"metadata":{"published":true,"versionId":"1720053903"},"privateKeys":[{"crv":"Ed25519","d":"WvJD_vX0s5qqHkW2D4t3RUABg7a_3usAMKet1QEoKj0","kty":"OKP","x":"4ZHv3tRuu6WCP9Dlr7SxAyxleAT8ZlJzokU0ciO-DsQ","kid":"YovQ1tV4TzP3vEK56W1ALWw4yaakW2YxnTWjRkoisD0","alg":"EdDSA"}]}'

        const portableDid = JSON.parse(issuerDid);
        const issuer = await DidDht.import({ portableDid });

        const vc = await VerifiableCredential.create({
            type    : 'SanctionCredential',
            issuer  : issuer.uri,
            subject : customerDid.uri,
            data    : {
              'beep': 'boop'
            }
          })
          
        const vcJwt = await vc.sign({ did: issuer})

        // Hard-coded credential
        let myCredentials = [vcJwt];

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
        const selectedCredentials = credentials;

        // :snippet-start: walletQuickstartCreateRfq
        rfq = Rfq.create({
            metadata: {
            to: pfiDid, // PFI's DID
            from: customerDid.uri,              // Customer DID
            protocol: '1.0'                     // Version of tbDEX protocol you're using
            },
            data: {
            offeringId: selectedOffering.metadata.id,   // The ID of the selected offering
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
                    phoneNumber: '123-456-7890',                 // Details required to execute payment
                    reason: "Payment for services rendered"
                }
            },
            claims: selectedCredentials  // Array of signed VCs required by the PFI
            }
        });
        // :snippet-end:
        
        expect(async () => {
            try{
                await rfq.verifyOfferingRequirements(selectedOffering);
            } catch (e) {
                throw e;
            }
        }).not.toThrow();
    });

    test('Verify, send, and sign RFQ', async () => {
        expect(async () => {
            try{
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

    test('Process Quote', async () => {
        // :snippet-start: walletQuickstartProcessQuote
        // Wait for Quote message to appear in the exchange
        exchangeId = rfq.exchangeId;
        while (!quote) {
            try {
                const exchange = await TbdexHttpClient.getExchange({
                    pfiDid: pfiDid,
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
            } catch (e) {
                if (e.statusCode === 404) {
                    //waiting on RFQ to be processed
                }
                else throw e;
            }
        }
        // :snippet-end:

        expect(quote).toBeDefined();
    });

    test('Create Order', async () => {
        while (!order) {
            try {
                // :snippet-start: walletQuickstartCreateOrder
                order = Order.create({
                    metadata: {
                        from: customerDid.uri,         // Customer's DID
                        to: pfiDid,                    // PFI's DID
                        exchangeId: exchangeId,        // Exchange ID from the Quote
                        protocol: "1.0"                // Version of tbDEX protocol you're using
                    }
                });
                // :snippet-end:

                expect(order).toBeDefined();
            } catch (e) {
                if (e.statusCode === 404) {
                    //race condition bug
                }
                else throw e;
            }
        }
    });
        
    test('Sign and Submit Order', async () => {
        expect(async () => {
            try{
                // :snippet-start: walletQuickstartSubmitOrder
                await order.sign(customerDid);
                await TbdexHttpClient.submitOrder(order);
                // :snippet-end:
            }catch(e){
                if (e.statusCode === 404) {
                    //race condition bug
                }
                else throw e;
            }

        }).not.toThrow();
    });

    test('Process Close', async () => {
        try {
            // :snippet-start: walletQuickstartProcessClose
            var close;
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
            const reasonForClose = close.data.reason;
            const closeSuccess = close.data.success;
            // :snippet-end:

            expect(closeSuccess).toBe(true);
            expect(reasonForClose).toBeDefined(); 
        }catch (e) {
            if (e.statusCode === 404) {
                //race condition bug
            }
            else throw e;
        }    
    });
});
