package website.tbd.developer.site.docs.tbdex.pfi

import website.tbd.developer.site.docs.utils.MockExchangesApiProvider
import tbdex.sdk.protocol.models.Message

class ExchangesApiProvider: MockExchangesApiProvider() {
    // :snippet-start: pfiOverviewWriteKt
    fun write(message: Message, replyTo: String = "") {
        val data = mapOf(
            "exchangeid" to message.metadata.exchangeId,
            "messagekind" to message.metadata.kind,
            "messageid" to message.metadata.id,
            "subject" to message.metadata.from,
            "message" to message.data
        )
        dataProvider.insert("exchange", data)

        if (replyTo.isNotEmpty()) {
            val callbackData = mapOf(
                "exchangeId" to message.metadata.exchangeId,
                "uri" to replyTo
            )
            dataProvider.insert("callbacks", replyTo)
        }
    }
    // :snippet-end:
}
