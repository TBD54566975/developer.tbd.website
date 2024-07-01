import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht } from '@web5/dids';

let context = {};

export async function quickstartDidCreate() {
    const customerDid = await DidDht.create({
        options: { publish: true },
      });

    const didExport = customerDid.export();
    context.customerDid = customerDid;
    context.pfiDid = 'did:dht:ccqamm6qgbe763ya8f3bo5mkrtxx1pz7i789zeqq4bmoae4qnixy';
    return customerDid;
}

export async function quickstartGetOfferings() {
    await getOfferings();

    return context.selectedOffering;
}

export async function quickstartGetCredentials() {
    await getCredentials();

    return context.credentials;
}

export async function quickstartCreateRfq() {
    await createRfq();

    return context.rfq;
}

export async function quickstartSendRfq() {
    await sendRfq();

    return context.rfq;
}

export async function quickstartProcessQuote() {
    await processQuote();

    return context.quote;
}

export async function quickstartCreateOrder() {
    await createOrder();

    return context.order;
}

export async function quickstartSubmitOrder() {
    await submitOrder();

    return context.order;
}   

export async function quickstartProcessClose() {
    await processClose();

    return context.reasonForClose;
}

async function getOfferings() {

    try {
        const offerings  = await TbdexHttpClient.getOfferings({ pfiDid: context.pfiDid });
    
        context.selectedOffering = offerings[0];
    } catch (e) {
        console.log(e.message);
    }
    
}

async function getCredentials() {
    // Hard-coded credential
    let myCredentials = [];

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
        to: context.selectedOffering.metadata.from, // PFI's DID
        from: context.customerDid,              // Customer DID
        protocol: '1.0'                     // Version of tbDEX protocol you're using
        },
        data: {
        offeringId: context.selectedOffering.metadata.id,   // The ID of the selected offering
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
            pfiDid: context.rfq.metadata.to,
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
    context.reasonForClose = close.data.reason;
}