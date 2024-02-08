package website.tbd.developer.site.docs.tbdex

import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*
import website.tbd.developer.site.docs.tbdex.MockDataProviderTest

class OfferingsApiProviderTest : OfferingsApi {

    private val dataProvider = MockDataProviderTest()

    // :snippet-start: pfiOverviewReadOfferingsKt
    override fun getOffering(id: String): Offering {
        val result = dataProvider.get("offering", id ?: "")
        return Offering.parse(result as String)
    }

    override fun getOfferings(filter: GetOfferingsFilter?): List<Offering> {
        val results = dataProvider.query("offering", "*")
        val offerings = mutableListOf<Offering>()

        for (result in results) {
            val offering = Offering.parse(result as String)
            offerings.add(offering)
        }

        return offerings
    }
    // :snippet-end:

    // :snippet-start: pfiOverviewWriteOfferingsKt
    suspend fun create(offering: Offering) {
        dataProvider.insert(
            "offering",
            mapOf(
                "offeringid" to offering.metadata.id,
                "payoutcurrency" to offering.data.payoutCurrency.currencyCode,
                "payincurrency" to offering.data.payinCurrency.currencyCode
            )
        )
    }
    // :snippet-end:

}