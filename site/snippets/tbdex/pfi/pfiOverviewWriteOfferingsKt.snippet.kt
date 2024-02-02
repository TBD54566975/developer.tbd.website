suspend fun create(offering: Offering) {
    dataProvider.insert(
        "offering",
        mapOf(
            "offeringid" to offering.id,
            "payoutcurrency" to offering.payoutCurrency.currencyCode,
            "payincurrency" to offering.payinCurrency.currencyCode,
            "offering" to objectMapper.writeValueAsString(offering)
        )
    )
}