import tbdex.sdk.protocol.models.Rfq
import tbdex.sdk.protocol.models.Quote

suspend fun createQuoteFromRfq(message: Message) {
    // :snippet-start: pfiQuotesWriteKt
    val data = mapOf(
        "exchangeid" to message.exchangeId,
        "messagekind" to message.kind,
        "messageid" to message.id,
        "subject" to message.subject,
        "message" to objectMapper.writeValueAsString(message)
    )
    dataProvider.insert("exchange", data)

    //highlight-start
    if (message.kind == 'rfq') {
        val offering = await OfferingsApiProvider.getOffering(message.offeringId)
    }
    //highlight-end
    // :snippet-end:

    // :snippet-start: pfiQuotesProcessKt
    try {
        rfq.verifyOfferingRequirements(offering)
    } catch (e: Exception) {
        println("Failed to verify offering requirements: ${e.message}")
    }
    // :snippet-end:

    // :snippet-start: pfiQuotesSendKt
    val metadata = MessageMetadata(
        kind = MessageKind.quote,
        to = message.to,
        from = message.from,
        exchangeId = message.exchangeId
    )

    val quoteData = QuoteData(
        expiresAt = OffsetDateTime.now().plusDays(10), // Example expiration time
        payin = QuoteDetails("BTC", "1000"),
        payout = QuoteDetails("KES", "123456789")
    )

    val quote = Quote.create(
        metadata = metadata,
        quoteData = quoteData
    )
    // :snippet-end:

    // :snippet-start: pfiQuotesSignKt
    quote.sign(config.did.privateKey, config.did.kid)
    this.write(quote)
    // :snippet-end:
}