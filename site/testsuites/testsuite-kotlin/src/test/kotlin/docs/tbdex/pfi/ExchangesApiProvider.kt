package website.tbd.developer.site.docs.tbdex.pfi

import website.tbd.developer.site.docs.utils.*
import tbdex.sdk.protocol.models.*

class ExchangesApiProvider: MockExchangesApiProvider() {
    // :snippet-start: pfiOverviewWriteKt
    fun write(message: Message) {
        val data = mapOf(
            "exchangeid" to message.metadata.exchangeId,
            "messagekind" to message.metadata.kind,
            "messageid" to message.metadata.id,
            "subject" to message.metadata.from,
            "message" to message.data
        )
        dataProvider.insert("exchange", data)
    }
    // :snippet-end:
}