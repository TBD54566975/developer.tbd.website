import tbdex.sdk.protocol.models.Offering

class OfferingsApiProvider : OfferingsApi {
    override fun getOffering(id: String): Offering {
        val result = dataProvider.get("offering", opts.id).firstOrNull()
        return if (result != null) Offering.factory(result["offering"] as JsonObject) else null
    }

    override fun getOfferings(filter: GetOfferingsFilter?): List<Offering> {
        val results = dataProvider.query("offering", "*")
        val offerings = mutableListOf<Offering>()

        for (result in results) {
            val offering = Offering.factory(result["offering"] as JsonObject)
            offerings.add(offering)
        }

        return offerings
    }