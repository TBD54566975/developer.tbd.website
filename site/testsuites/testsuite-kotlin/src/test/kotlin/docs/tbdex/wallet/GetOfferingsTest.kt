
package website.tbd.developer.site.docs.tbdex.wallet

import foundation.identity.did.Service
import tbdex.sdk.httpclient.TbdexHttpClient
import tbdex.sdk.protocol.models.Offering
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.CreateDidDhtOptions
import web5.sdk.dids.methods.dht.DidDht
import java.net.URI

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions.*

/**
 * Tests for Wallet: Get Offerings guide
 */
class GetOfferingsTest {

    /*
    TODO: set PFI DID to one that has offerings.
    waiting on the Mock PFI to be updated to include offerings.
    */
    val serviceToAdd = Service.builder()
    .id(URI("pfi"))
    .type("PFI")
    .serviceEndpoint("http://localhost:9000")
    .build()

    val options = CreateDidDhtOptions(
        publish = true,
        services = listOf(serviceToAdd),
    )

    val pfi = DidDht.create(InMemoryKeyManager(), options)
    val pfiDid = pfi.uri

    @Test
    fun `get all offerings`() {
        // :snippet-start: walletGetOfferingsKt
        val offerings =  TbdexHttpClient.getOfferings(pfiDid)
        // :snippet-end:

        //TODO: add tests once the mock PFI is updated to include offerings.
    }

    @Test
    fun `find matching offerings`() {

    val pfiDids = arrayOf(pfiDid)
    
    // :snippet-start: walletFindMatchingOfferingsKt
    val payinCurrencyCode = "USD"; // Desired payin currency code
    val payoutCurrencyCode = "KES"; // Desired payout currency code

    val matchedOfferings = ArrayList<Offering>() // Array to store the matched offerings

    // Loop through the all PFIs in your network
    for (pfiDid in pfiDids) {

        // Makes a request to the PFI to get their offerings
        val offerings = TbdexHttpClient.getOfferings(pfiDid)

        // Filter offerings based on the currency pair
        val filteredOfferings = offerings.filter { offering ->
            offering.data.payinCurrency.currencyCode == payinCurrencyCode &&
                    offering.data.payoutCurrency.currencyCode == payoutCurrencyCode
        }

        matchedOfferings.addAll(filteredOfferings)
    }
    // :snippet-end:

        //TODO: add tests once the mock PFI is updated to include offerings.
    }
}
