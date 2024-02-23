package website.tbd.developer.site.docs.tbdex.pfi

import website.tbd.developer.site.docs.utils.MockExchangesApiProvider
import tbdex.sdk.protocol.models.*
import website.tbd.developer.site.docs.utils.*
import tbdex.sdk.httpserver.models.*

class OfferingsApiProvider: MockOfferingsApiProvider() {

    // :snippet-start: pfiOverviewReadOfferingsKt
    override fun getOffering(id: TypeId): Offering {
        val result = dataProvider.get("offering", id.toString() ?: "")
        return result as Offering
    }

    override fun getOfferings(filter: GetOfferingsFilter?): List<Offering> {
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
