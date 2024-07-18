import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials'

let context = {};

export async function quickstartDidCreate() {
    let customerDidString = '{"uri":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","document":{"id":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","verificationMethod":[{"id":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0","type":"JsonWebKey","controller":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"4dGQOFwyacipPH04UG1rULQkBc8h6jNOhLPMgvoUOgs","kid":"XPokllC3LZAVGizIL0naDdByQHeyY12uLJaXO4j46Nw","alg":"EdDSA"}}],"authentication":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"assertionMethod":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"capabilityDelegation":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"capabilityInvocation":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"]},"metadata":{"published":true,"versionId":"1718740086"},"privateKeys":[{"crv":"Ed25519","d":"iTfn3Z8uPp3gTg-9LxQVZVODGqnP3M0UDjZiIwBEctc","kty":"OKP","x":"4dGQOFwyacipPH04UG1rULQkBc8h6jNOhLPMgvoUOgs","kid":"XPokllC3LZAVGizIL0naDdByQHeyY12uLJaXO4j46Nw","alg":"EdDSA"}]}'

    const portableDid = JSON.parse(customerDidString);
    context.customerDid = await DidDht.import({ portableDid });
    context.pfiDid = 'did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo';
    return context.customerDid.uri;
}

export async function quickstartGetOfferings() {
    await getOfferings();

    return context.selectedOffering;
}

export async function quickstartApplyForCredential() {
    await applyForCredentials();

    return context.credentials;
}

export async function quickstartGetCredentials() {
    await getCredentials();

    return context.credentials;
}

export async function quickstartCreateRfq() {
    await createRfq();
    await sendRfq();

    return context.rfq;
}

export async function quickstartSendRfq() {
    return "HTTP 202: Successfully Submitted RFQ";
}

export async function quickstartProcessQuote() {
    await processQuote();

    return context.quote;
}

export async function quickstartCreateOrder() {
    await createOrder();
    await submitOrder();

    return context.order;
}

export async function quickstartSendOrder() {
    return "HTTP 202: Successfully Submitted Order";
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

async function applyForCredentials() {
    let issuerDid = '{"uri":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo","document":{"id":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo","verificationMethod":[{"id":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0","type":"JsonWebKey","controller":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"In71mcx1pEBaAjFPnNIbNIccBDwVVsgRl2AmRSNFXW8","kid":"yBmVo8U4VzCFqhj0a88kiZPOU_gpMxEmHUy-tdvKqHM","alg":"EdDSA"}}],"authentication":["did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0"],"assertionMethod":["did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0"],"capabilityDelegation":["did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0"],"capabilityInvocation":["did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#0"],"service":[{"id":"did:dht:rj9xmgqcqs1rysongf833wo5g1dtabbhnimcorczcyurke4fmizo#pfi","type":"PFI","serviceEndpoint":"https://pfiexemplar.tbddev.org"}]},"metadata":{"published":true,"versionId":"1721323484"},"privateKeys":[{"crv":"Ed25519","d":"rTGqrDYW2rQUGsnPAtpPO0ZVe585WDbbtkufheCAloU","kty":"OKP","x":"In71mcx1pEBaAjFPnNIbNIccBDwVVsgRl2AmRSNFXW8","kid":"yBmVo8U4VzCFqhj0a88kiZPOU_gpMxEmHUy-tdvKqHM","alg":"EdDSA"}]}'
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
    context.credentials = [vcJwt];

    return vcJwt;
}

async function getCredentials() {
    let myCredentials = context.credentials;

    // :snippet-start: walletQuickstartSelectCredentials
    const selectedCredentials = PresentationExchange.selectCredentials({
        vcJwts: myCredentials,
        presentationDefinition: context.selectedOffering.data.requiredClaims,
    });
    // :snippet-end:
    context.credentials = selectedCredentials;
}

async function createRfq() {
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
                    phoneNumber: '123-456-7890',                 // Details to execute payment
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
        throw e;
    }
}

async function processQuote() {
    // Wait to ensure exchange is created

    context.exchangeId = context.rfq.exchangeId;
    while (!context.quote) {
        try {
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
        } catch (e) {
            if (e.statusCode === 404 || e.statusCode === 401) {
                //waiting on RFQ to be processed
            }
            else throw e;
        }
    }
}

async function createOrder() {
    context.order = Order.create({
        metadata: {
        from: context.customerDid.uri,         // Customer's DID
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
    let close = null;
    while (!close) {
        try {
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
        } catch (e) {
            if (e.statusCode === 404 || e.statusCode === 401) {
                //waiting on RFQ to be processed
            }
            else throw e;
        }
    }

    context.reasonForClose = close.data.reason;
}