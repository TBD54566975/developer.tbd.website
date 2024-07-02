import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials'

let context = {};

export async function quickstartDidCreate() {
    let customerDidString = '{"uri":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","document":{"id":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","verificationMethod":[{"id":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0","type":"JsonWebKey","controller":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"4dGQOFwyacipPH04UG1rULQkBc8h6jNOhLPMgvoUOgs","kid":"XPokllC3LZAVGizIL0naDdByQHeyY12uLJaXO4j46Nw","alg":"EdDSA"}}],"authentication":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"assertionMethod":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"capabilityDelegation":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"capabilityInvocation":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"]},"metadata":{"published":true,"versionId":"1718740086"},"privateKeys":[{"crv":"Ed25519","d":"iTfn3Z8uPp3gTg-9LxQVZVODGqnP3M0UDjZiIwBEctc","kty":"OKP","x":"4dGQOFwyacipPH04UG1rULQkBc8h6jNOhLPMgvoUOgs","kid":"XPokllC3LZAVGizIL0naDdByQHeyY12uLJaXO4j46Nw","alg":"EdDSA"}]}'

    const portableDid = JSON.parse(customerDidString);
    context.customerDid = await DidDht.import({ portableDid });
    context.pfiDid = 'did:dht:ccqamm6qgbe763ya8f3bo5mkrtxx1pz7i789zeqq4bmoae4qnixy';
    return context.customerDid.uri;
}

export async function quickstartGetOfferings() {
    await getOfferings();

    return JSON.stringify(context.selectedOffering);
}

export async function quickstartGetCredentials() {
    await getCredentials();

    return context.credentials;
}

export async function quickstartCreateRfq() {
    await createRfq();
    await sendRfq();

    return JSON.stringify(context.rfq);
}

export async function quickstartProcessQuote() {
    await processQuote();

    return JSON.stringify(context.quote);
}

export async function quickstartCreateOrder() {
    await createOrder();
    await submitOrder();

    return JSON.stringify(context.order);
}

export async function quickstartProcessClose() {
    await processClose();

    return context.reasonForClose;
}

async function getOfferings() {

    try {
        const offerings  = await TbdexHttpClient.getOfferings({ pfiDid: context.pfiDid });
    
        context.selectedOffering = offerings[0];
        console.log(context.selectedOffering);
    } catch (e) {
        console.log(e.message);
    }
    
}

async function getCredentials() {
    let issuerDid = '{"uri":"did:dht:91szhs8sagq3rq9x6fraono8gci7ekcz7s5ubfenjpkqk1dbi8po","document":{"id":"did:dht:91szhs8sagq3rq9x6fraono8gci7ekcz7s5ubfenjpkqk1dbi8po","verificationMethod":[{"id":"did:dht:91szhs8sagq3rq9x6fraono8gci7ekcz7s5ubfenjpkqk1dbi8po#0","type":"JsonWebKey","controller":"did:dht:91szhs8sagq3rq9x6fraono8gci7ekcz7s5ubfenjpkqk1dbi8po","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"5ax3B9NJSaxwEgXXc11CdtOdEybefUaf6RDgrL2VjLs","kid":"9pIk_m7d5-1etmbk94DleDYaQra4CsKjrt37q28sugk","alg":"EdDSA"}}],"authentication":["did:dht:91szhs8sagq3rq9x6fraono8gci7ekcz7s5ubfenjpkqk1dbi8po#0"],"assertionMethod":["did:dht:91szhs8sagq3rq9x6fraono8gci7ekcz7s5ubfenjpkqk1dbi8po#0"],"capabilityDelegation":["did:dht:91szhs8sagq3rq9x6fraono8gci7ekcz7s5ubfenjpkqk1dbi8po#0"],"capabilityInvocation":["did:dht:91szhs8sagq3rq9x6fraono8gci7ekcz7s5ubfenjpkqk1dbi8po#0"]},"metadata":{"published":true,"versionId":"1718729356"},"privateKeys":[{"crv":"Ed25519","d":"FMPebUFD4ZskD1Z7WzRPC52Zl0zt4qwxPQq8DMaWfEQ","kty":"OKP","x":"5ax3B9NJSaxwEgXXc11CdtOdEybefUaf6RDgrL2VjLs","kid":"9pIk_m7d5-1etmbk94DleDYaQra4CsKjrt37q28sugk","alg":"EdDSA"}]}'

        const portableDid = JSON.parse(issuerDid);
        const issuer = await DidDht.import({ portableDid });

        const vc = await VerifiableCredential.create({
            type    : 'SanctionCredential',
            issuer  : issuer.uri,
            subject : context.customerDid.uri,
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
        presentationDefinition: context.selectedOffering.data.requiredClaims,
    });
    // :snippet-end:
    context.credentials = selectedCredentials;
}

async function createRfq() {
    const BTC_ADDRESS = 'bc1q52csjdqa6cq5d2ntkkyz8wk7qh2qevy04dyyfd'
    const selectedCredentials = context.credentials;

    // :snippet-start: walletQuickstartCreateRFQ
    context.rfq = Rfq.create({
        metadata: {
            to: context.pfiDid, // PFI's DID
            from: context.customerDid.uri,              // Customer DID
            protocol: '1.0'                     // Version of tbDEX protocol you're using
            },
            data: {
            offeringId: context.selectedOffering.metadata.id,   // The ID of the selected offering
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
                    phoneNumber: '123-456-7890',                 // Recipient's BTC wallet address
                    reason: "Payment for services rendered"
                }
            },
            claims: selectedCredentials  // Array of signed VCs required by the PFI
            }
    });
}

async function sendRfq() {
    try{
        context.rfq.verifyOfferingRequirements(context.selectedOffering);
        await context.rfq.sign(context.customerDid);
        await TbdexHttpClient.createExchange(context.rfq);
    } catch (e) {
        // handle failed verification
    }
}

async function processQuote() {
    context.exchangeId = context.rfq.exchangeId;
    while (!context.quote) {
        const exchange = await TbdexHttpClient.getExchange({
            pfiDid: context.pfiDid,
            did: context.customerDid,
            exchangeId: context.exchangeId
        });

        context.quote = exchange.find(msg => msg instanceof Quote);

        if (!context.quote) {
            // Make sure the exchange is still open
            context.close = exchange.find(msg => msg instanceof Close);
            
            if(context.close) { break; } 
            else {
            // Wait 2 seconds before making another request
            await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }
}

async function createOrder() {
    context.order = Order.create({
        metadata: {
        from: context.customerDid,         // Customer's DID
        to: context.pfiDid,       // PFI's DID
        exchangeId: context.exchangeId,  // Exchange ID from the Quote
        protocol: "1.0"                // Version of tbDEX protocol you're using
        }
    });
}

async function submitOrder() {
    await context.order.sign(context.customerDid);
    await TbdexHttpClient.submitOrder(context.order);
}

async function processClose() {
    while (!close) {
        const exchange = await TbdexHttpClient.getExchange({
            pfiDid: context.pfiDid,
            did: context.customerDid,
            exchangeId: context.exchangeId
        })

        for (const message of exchange) {
            if (message instanceof Close) {
                close = message
            }
        }
    }
    
    context.closeSuccess = close.data.success;
    context.reasonForClose = close.data.reason;
}