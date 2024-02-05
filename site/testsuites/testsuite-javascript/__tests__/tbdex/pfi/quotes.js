import {
    Rfq,
    Quote
} from '@tbdex/http-client';

const config = {
    did: {
        privateKey: "",
        kid: "",
        id: ""
    }
}

async function createQuoteFromRfq(message) {
    // :snippet-start: pfiQuotesWriteJs
    // Write the message to your exchanges database
    await dataProvider.insert('exchange', {
        exchangeid: message.exchangeId,
        messagekind: message.kind,
        messageid: message.id,
        subject: message.subject,
        message: JSON.stringify(message)
    });

    //highlight-start
    const offering = await offeringApiProvider.getOffering(message.offeringId)
    //highlight-end
    // :snippet-end:

    // :snippet-start: pfiQuotesProcessJs
    const rfqOptions = {
        data: message.data(), 
        metadata: message.metadata()
    };

    const rfq = Rfq.create(rfqOptions)

    try {
        await rfq.verifyOfferingRequirements(offering)
    } catch(e) {
        console.log(`Failed to verify offering requirements: ${e.rfq}`)
    }
    // :snippet-end:

    // :snippet-start: pfiQuotesSendKt
    const quote = Quote.create(
        {
          metadata: {
            from: config.did.id,
            to: message.from,
            exchangeId: message.exchangeId
          },
          data: {
            expiresAt: new Date(2024, 4, 1).toISOString(),
            payin: {
              currencyCode: 'BTC',
              amountSubunits: '1000'
            },
            payout: {
              currencyCode: 'KES',
              amountSubunits: '123456789'
            }
          }
        }
    );
    // :snippet-end:

    // :snippet-start: pfiQuotesSignKt
    await quote.sign(config.did.privateKey, config.did.kid)
    this.write(quote)
    // :snippet-end:

}