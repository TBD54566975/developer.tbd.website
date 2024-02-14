package website.tbd.developer.site.docs.tbdex.pfi

import website.tbd.developer.site.docs.utils.*
import tbdex.sdk.protocol.models.*

class OfferingsApiProvider: MockOfferingsApiProvider() {

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
}