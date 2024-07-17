import { it, expect, describe } from 'vitest';
// :snippet-start: walletQuickstartImports
import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht,DidJwk } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials'
// :snippet-end:

let pfiDid = 'did:dht:ccqamm6qgbe763ya8f3bo5mkrtxx1pz7i789zeqq4bmoae4qnixy';

describe('Wallet: Quickstart', () => {

    it('Testing Quickstart Workflow', async () => {

        // :snippet-start: walletQuickstartDidCreate
        var customerDid = await DidJwk.create({
            options: {
                publish: true
            },
        });
        // :snippet-end:

        // :snippet-start: walletQuickstartGetOfferings
        const offerings  = await TbdexHttpClient.getOfferings({ pfiDid: pfiDid });
        // :snippet-end:

        //:snippet-start: walletQuickstartSelectOffering
        var selectedOffering;
        if(offerings){
            selectedOffering = offerings.find(offering =>
            offering.data.payin.currencyCode === 'USD' &&
            offering.data.payout.currencyCode === 'KES'
            );
        }
        //:snippet-end:

        expect(selectedOffering).toBeDefined();

 //TODO: REMOVE THIS ISSUER DID AND ISSUE THE VC WITH THE PFI'S BEARER DID       
        let issuerDidString = '{"uri":"did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny","document":{"id":"did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny","verificationMethod":[{"id":"did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0","type":"JsonWebKey","controller":"did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"4ZHv3tRuu6WCP9Dlr7SxAyxleAT8ZlJzokU0ciO-DsQ","kid":"YovQ1tV4TzP3vEK56W1ALWw4yaakW2YxnTWjRkoisD0","alg":"EdDSA"}}],"authentication":["did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0"],"assertionMethod":["did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0"],"capabilityDelegation":["did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0"],"capabilityInvocation":["did:dht:hge69zswp474myt94d149pftycsgk6yr9tufrh7new48re76b5ny#0"]},"metadata":{"published":true,"versionId":"1720053903"},"privateKeys":[{"crv":"Ed25519","d":"WvJD_vX0s5qqHkW2D4t3RUABg7a_3usAMKet1QEoKj0","kty":"OKP","x":"4ZHv3tRuu6WCP9Dlr7SxAyxleAT8ZlJzokU0ciO-DsQ","kid":"YovQ1tV4TzP3vEK56W1ALWw4yaakW2YxnTWjRkoisD0","alg":"EdDSA"}]}'

        let issuerPortableDid = JSON.parse(issuerDidString);
        const issuerDid = await DidDht.import({ portableDid: issuerPortableDid });

        await DidDht.publish({ did: issuerDid });

        const vc = await VerifiableCredential.create({
            type    : 'SanctionCredential',
            issuer  : issuerDid.uri,
            subject : customerDid.uri,
            data    : {
              'beep': 'boop'
            }
          })
          
        const vcJwt = await vc.sign({ did: issuerDid})

        // Hard-coded credential
        let myCredentials = [vcJwt];

        // :snippet-start: walletQuickstartSelectCredentials
        const selectedCredentials = PresentationExchange.selectCredentials({
            vcJwts: myCredentials,
            presentationDefinition: selectedOffering.data.requiredClaims,
        });
        // :snippet-end:

        expect(selectedCredentials.length).toBe(1);

        // :snippet-start: walletQuickstartCreateRfq
        var rfq = Rfq.create({
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
                // :snippet-start: walletQuickstartSendRfq
                await rfq.verifyOfferingRequirements(selectedOffering);
                await rfq.sign(customerDid);
                await TbdexHttpClient.createExchange(rfq);
                // :snippet-end:
            } catch (e) {
                throw e;
            }
        }).not.toThrow();

        // :snippet-start: walletQuickstartProcessQuote
        // Wait for Quote message to appear in the exchange
        let exchangeId = rfq.exchangeId;
        let quote;
        let close;
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
                if (e.statusCode === 404 || e.statusCode === 401) {
                    //waiting on RFQ to be processed
                }
                else throw e;
            }
        }
        // :snippet-end:

        expect(quote).toBeDefined();

        let order; 
        while (!order) {
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
        }

        expect(async () => {
            try {
                // :snippet-start: walletQuickstartSubmitOrder
                await order.sign(customerDid);
                await TbdexHttpClient.submitOrder(order);
                // :snippet-end:
            } catch (e) {
                if (e.statusCode === 404) {
                    //waiting on RFQ to be processed
                }
                else throw e;
            }
        }).not.toThrow();

        // :snippet-start: walletQuickstartProcessClose
        while (!close) {
            try {
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
            } catch (e) {
                if (e.statusCode === 404 || e.statusCode === 401) {
                    //waiting on RFQ to be processed
                }
                else throw e;
            }
        }
        const reasonForClose = close.data.reason;
        const closeSuccess = close.data.success;
        // :snippet-end:

        expect(closeSuccess).toBe(true);
        expect(reasonForClose).toBeDefined();   
    });
});
