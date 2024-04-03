package website.tbd.developer.site.docs.tbdex.pfi

import tbdex.sdk.protocol.models.*
import website.tbd.developer.site.docs.utils.*

class OfferingsApiProvider: MockOfferingsApiProvider() {

    // :snippet-start: pfiOverviewReadOfferingsKt
    override fun getOffering(id: String): Offering {
        val result = dataProvider.get("offering", id.toString() ?: "")
        return result as Offering
    }

    override fun getOfferings(): List<Offering> {
        val results = dataProvider.query("offering", "*")
        val offerings = mutableListOf<Offering>()

        if (results == null) { return emptyList() }

        for (result in results) {
            val offering = Offering.parse(result as String)
            offerings.add(offering)
        }

        return offerings
    }
    // :snippet-end:
}
