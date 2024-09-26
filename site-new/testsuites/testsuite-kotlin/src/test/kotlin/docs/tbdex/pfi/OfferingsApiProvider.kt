package website.tbd.developer.site.docs.tbdex.pfi

import tbdex.sdk.protocol.models.*
import website.tbd.developer.site.docs.utils.*

class OfferingsApiProvider: MockOfferingsApiProvider() {

    // :snippet-start: pfiOverviewReadOfferingsKt
    override fun getOffering(id: String): Offering {
        val result = dataProvider.get("offering", id) as String
        return Offering.parse(result)
    }

    override fun getOfferings(): List<Offering> {
        val results = dataProvider.query("offering", "*")
        val offerings = mutableListOf<Offering>()

        for (result in results) {
            val offering = Offering.parse(result as String)
            offerings.add(offering)
        }

        return offerings
    }

    fun setOffering(offering: Offering) {
        val resource = mapOf(
            "offeringid" to offering.metadata.id,
            "payoutcurrency" to offering.data.payout.currencyCode,
            "payincurrency" to offering.data.payin.currencyCode,
            "offering" to offering.toString()
        )
        dataProvider.insert("offering", resource)
    }
  // :snippet-end:
}
