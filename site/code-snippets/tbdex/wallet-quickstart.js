import { TbdexHttpClient, Rfq, Quote, Order, Close } from '@tbdex/http-client';
import { PresentationExchange } from '@web5/credentials';
import { DidDht } from '@web5/dids';
import { VerifiableCredential } from '@web5/credentials'

let context = {};

export async function quickstartDidCreate() {
    context.pfiDid = 'did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y';
    let customerDidString = '{"uri":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","document":{"id":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","verificationMethod":[{"id":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0","type":"JsonWebKey","controller":"did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo","publicKeyJwk":{"crv":"Ed25519","kty":"OKP","x":"4dGQOFwyacipPH04UG1rULQkBc8h6jNOhLPMgvoUOgs","kid":"XPokllC3LZAVGizIL0naDdByQHeyY12uLJaXO4j46Nw","alg":"EdDSA"}}],"authentication":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"assertionMethod":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"capabilityDelegation":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"],"capabilityInvocation":["did:dht:h8e3yqnhgjwhtkjhxwhfy5mmkn4nebqxr8idguwrsxgef6ow8efo#0"]},"metadata":{"published":true,"versionId":"1718740086"},"privateKeys":[{"crv":"Ed25519","d":"iTfn3Z8uPp3gTg-9LxQVZVODGqnP3M0UDjZiIwBEctc","kty":"OKP","x":"4dGQOFwyacipPH04UG1rULQkBc8h6jNOhLPMgvoUOgs","kid":"XPokllC3LZAVGizIL0naDdByQHeyY12uLJaXO4j46Nw","alg":"EdDSA"}]}'
    const portableDid = JSON.parse(customerDidString);
    context.customerDid = await DidDht.import({ portableDid });

    return context.customerDid.uri;
}

export async function quickstartGetOfferings() {
    try {
      const offerings  = await TbdexHttpClient.getOfferings({ pfiDid: context.pfiDid });

      if (offerings) {
          context.selectedOffering = offerings.find(
              (offering) =>
                  offering.data.payin.currencyCode === 'USD' &&
                  offering.data.payout.currencyCode === 'KES'
          );
      }

    } catch (e) {
        console.log(e.message);
    }

    return context.selectedOffering;
}

export async function quickstartApplyForCredential() {
    const vcJwt = await fetch(`https://mock-idv.tbddev.org/kcc?name=alice&country=US&did=${context.customerDid.uri}`).then(res => res.text());

    context.credentials = [vcJwt];

    return context.credentials;
}

export async function quickstartGetCredentials() {
    let customerCredentials = context.credentials;

    const selectedCredentials = PresentationExchange.selectCredentials({
        vcJwts: customerCredentials,
        presentationDefinition: context.selectedOffering.data.requiredClaims,
    });

    context.credentials = selectedCredentials;

    return context.credentials;
}

export async function quickstartCreateRfq() {
      context.rfq = Rfq.create({
      metadata: {
          to: context.pfiDid, // PFI's DID
          from: context.customerDid.uri, // Customer DID
          protocol: '1.0', // Version of tbDEX protocol you're using
      },
      data: {
          offeringId: context.selectedOffering.metadata.id, // The ID of the selected offering
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
          claims: context.credentials, // Array of signed VCs required by the PFI
      },
  });
    return context.rfq;
}

export async function quickstartSendRfq() {
    try {
        context.rfq.verifyOfferingRequirements(context.selectedOffering);
        await context.rfq.sign(context.customerDid);
        await TbdexHttpClient.createExchange(context.rfq);

        return "Submitted RFQ";

    } catch (e) {
        throw e;
    }

}

export async function quickstartProcessQuote() {
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

    return context.quote;
}

export async function quickstartCreateOrder() {
    context.order = Order.create({
      metadata: {
        from: context.customerDid.uri,         // Customer's DID
        to: context.pfiDid,       // PFI's DID
        exchangeId: context.exchangeId,  // Exchange ID from the Quote
        protocol: "1.0"                // Version of tbDEX protocol you're using
      }
    });

    return context.order;
}

export async function quickstartSendOrder() {
  try{
    await context.order.sign(context.customerDid);
    await TbdexHttpClient.submitOrder(context.order);

    return "Submitted Order";
  } catch (e) {
        throw e;
  }
}

export async function quickstartProcessClose() {
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

    return context.reasonForClose;
}
