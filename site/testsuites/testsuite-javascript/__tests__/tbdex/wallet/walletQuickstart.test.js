import { it, expect, describe } from 'vitest';
// :snippet-start: walletQuickstartImports
import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht,DidJwk } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials'
// :snippet-end:

// :snippet-start: walletQuickstartPfiDid
const pfiDid = 'did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo';
// :snippet-end:

describe('Wallet: Quickstart', () => {

    it('Testing Quickstart Workflow', async () => {

        // :snippet-start: walletQuickstartDidCreate
        var customerDid = await DidJwk.create({
            options: {
                publish: true
            },
        });
        // :snippet-end:
      
        const pfiDidString = '{"uri":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo","document":{"id":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo","verificationMethod":[{"id":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0","type":"JsonWebKey","controller":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"In71mcx1pEBaAjFPnNIbNIccBDwVVsgRl2AmRSNFXW8","kid":"yBmVo8U4VzCFqhj0a88kiZPOU_gpMxEmHUy-tdvKqHM","alg":"EdDSA"}}],"authentication":["did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0"],"assertionMethod":["did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0"],"capabilityDelegation":["did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0"],"capabilityInvocation":["did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0"],"service":[{"id":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#pfi","type":"PFI","serviceEndpoint":"https://pfiexemplar.tbddev.org"}]},"metadata":{"published":true,"versionId":"1721323484"},"privateKeys":[{"crv":"Ed25519","d":"rTGqrDYW2rQUGsnPAtpPO0ZVe585WDbbtkufheCAloU","kty":"OKP","x":"In71mcx1pEBaAjFPnNIbNIccBDwVVsgRl2AmRSNFXW8","kid":"yBmVo8U4VzCFqhj0a88kiZPOU_gpMxEmHUy-tdvKqHM","alg":"EdDSA"}]}';

        const pfiPortableDid = JSON.parse(pfiDidString);
        const pfiBearerDid = await DidDht.import({ portableDid: pfiPortableDid });

        await DidDht.publish({ did: pfiBearerDid });

        const vc = await VerifiableCredential.create({
            type    : 'SanctionCredential',
            issuer  : pfiBearerDid.uri,
            subject : customerDid.uri,
            data    : {
              'beep': 'boop'
            }
          })
          
        const vcJwt = await vc.sign({ did: pfiBearerDid})

        // Hard-coded credential
        let myCredentials = [vcJwt];

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
