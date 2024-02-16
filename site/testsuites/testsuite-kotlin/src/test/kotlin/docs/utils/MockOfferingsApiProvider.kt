package website.tbd.developer.site.docs.utils

import tbdex.sdk.httpserver.models.*
import tbdex.sdk.protocol.models.*
import website.tbd.developer.site.docs.utils.MockDataProvider
import website.tbd.developer.site.docs.utils.TestData

open class MockOfferingsApiProvider: OfferingsApi {

    val dataProvider = MockDataProvider()

    //---------------------------------------------------------------------------//
    // Implementation of interface
    //---------------------------------------------------------------------------//

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

    //---------------------------------------------------------------------------//
    // Setup Methods
    //---------------------------------------------------------------------------//

    fun setOffering(id: String, pfiDid: String) {
        dataProvider.setupGet("offering", id) {
            TestData.getOffering(pfiDid, TestData.getPresentationDefinition())
        }
    }

    fun setOfferings(offeringDids: List<String>) {
        dataProvider.setupGet("offering", "*") {
            offeringDids.map { did -> TestData.getOffering(did, TestData.getPresentationDefinition()) }
        }
    }
}
