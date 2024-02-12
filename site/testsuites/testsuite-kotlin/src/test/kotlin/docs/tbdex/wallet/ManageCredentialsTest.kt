package website.tbd.developer.site.docs.tbdex.wallet

import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import tbdex.sdk.httpclient.TbdexHttpClient
import tbdex.sdk.protocol.models.Offering
import tbdex.sdk.protocol.serialization.Json
import java.net.HttpURLConnection
import docs.tbdex.TestData
import web5.sdk.credentials.PresentationExchange
import web5.sdk.credentials.model.ConstraintsV2
import web5.sdk.credentials.model.FieldV2
import web5.sdk.credentials.model.InputDescriptorV2
import web5.sdk.credentials.model.PresentationDefinitionV2
import web5.sdk.credentials.model.*

import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

/**
 * Tests for Wallet: Manage Credentials guide
 */
class GetMatchedOfferingsTest {

    private lateinit var server: MockWebServer
    private val pfi = TestData.PFI_DID
    private val pfiDid = pfi.uri
    private val vcJwtResidence = "eyJraWQiOiJkaWQ6ZGh0OnA5cW5idDRrd3lrenF6Znp5eXN0ZDY5Zjhnb3N0YnAzbmY3dGRyczRyd3FqaW16MWsxY3kjMCIsInR5cCI6IkpXVCIsImFsZyI6IkVkRFNBIn0.eyJpc3MiOiJkaWQ6ZGh0OnA5cW5idDRrd3lrenF6Znp5eXN0ZDY5Zjhnb3N0YnAzbmY3dGRyczRyd3FqaW16MWsxY3kiLCJzdWIiOiJkaWQ6ZGh0OnV1b3J6ZHRqOXgzYTM1OTNtZjlleXNxaHM0NWRrZXpqdzZqYXBkdWRjMXpicjc4aXNnZXkiLCJpYXQiOjE3MDc3NjM4NDgsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJSZXNpZGVuY2VDcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6ODc5N2VkZDgtNzE2Mi00YTliLWEyMjgtNGRkZTA4NjFlNzZmIiwiaXNzdWVyIjoiZGlkOmRodDpwOXFuYnQ0a3d5a3pxemZ6eXlzdGQ2OWY4Z29zdGJwM25mN3RkcnM0cndxamltejFrMWN5IiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMi0xMlQxODo1MDo0OFoiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6dXVvcnpkdGo5eDNhMzU5M21mOWV5c3FoczQ1ZGtlemp3NmphcGR1ZGMxemJyNzhpc2dleSIsImFkZHJlc3MiOiIxMCBPcmNoYXJkIHN0In19fQ.Uvq5jHJbhe7mcPXAMNtfBoD7yez6GXP0GYNuyiZI0_pyfK_mKPjrbkJPXd3LbOtYvB06XxY6tGLMTo7tiMRFDQ"
    private val vcJwtSanctions = "eyJraWQiOiJkaWQ6ZGh0Onc4bThxNXFja21vZXRzaWlrajR3ZXFhYWRjeGtjNjFkNjh6cnk3aHBpZmdveXE4dG1zb28jMCIsInR5cCI6IkpXVCIsImFsZyI6IkVkRFNBIn0.eyJpc3MiOiJkaWQ6ZGh0Onc4bThxNXFja21vZXRzaWlrajR3ZXFhYWRjeGtjNjFkNjh6cnk3aHBpZmdveXE4dG1zb28iLCJzdWIiOiJkaWQ6ZGh0OmtkMzVlNmN4M3pueXp1ajR3ejF1ZmRjeGs4ODlzYXVrYXRhYWc3YmNrM2NwY2I3cGM4NW8iLCJpYXQiOjE3MDc0OTEzODcsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJTYW5jdGlvbnNDcmVkZW50aWFsIl0sImlkIjoidXJuOnV1aWQ6MGU4YWJhMWYtMmMwZS00MDhlLWIxOWMtZjY0NzZiYTU3NDVhIiwiaXNzdWVyIjoiZGlkOmRodDp3OG04cTVxY2ttb2V0c2lpa2o0d2VxYWFkY3hrYzYxZDY4enJ5N2hwaWZnb3lxOHRtc29vIiwiaXNzdWFuY2VEYXRlIjoiMjAyNC0wMi0wOVQxNTowOTo0N1oiLCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDpkaHQ6a2QzNWU2Y3gzem55enVqNHd6MXVmZGN4azg4OXNhdWthdGFhZzdiY2szY3BjYjdwYzg1byIsInN0YXR1cyI6ImFwcHJvdmVkIn19fQ.Wc-qV2L3Z5WJYvUYirznpDsyk1Ntcw0kt_bhuXZDqNVXAn-d9Wta67eta-yu7V1C1T74yv6pQaqjgf2rDLxCAg"

    @BeforeEach
    fun setup() {
        server = MockWebServer()
        server.start(9000) // pfiDid resolves to http://localhost:9000

        val offering = TestData.getOffering(pfiDid, TestData.getPresentationDefinition())
        offering.sign(pfi)
        val mockOfferings = listOf(offering)
        val mockResponseString = Json.jsonMapper.writeValueAsString(mapOf("data" to mockOfferings))
        server.enqueue(MockResponse().setBody(mockResponseString).setResponseCode(HttpURLConnection.HTTP_OK))
    }

    @AfterEach
    fun tearDown() {
        server.shutdown()
    }

    @Test
    fun `match offerings with specific criteria`() {
        // Setup Mock Server Responses for Offerings
        val customPresentationDefinition = PresentationDefinitionV2(
            id = "custom-pd-id",
            inputDescriptors = listOf(
                InputDescriptorV2(
                    id = "sanctionsVerification",
                    purpose = "Confirm the individual is not sanctioned",
                    constraints = ConstraintsV2(
                        fields = listOf(FieldV2(path = listOf("$.vc.credentialSubject.status")))
                    )
                ),
                InputDescriptorV2(
                    id = "residenceVerification",
                    purpose = "Confirm the individual's residence address",
                    constraints = ConstraintsV2(
                        fields = listOf(FieldV2(path = listOf("$.vc.credentialSubject.address")))
                    )
                )
            )
        )
        val mockOfferings = listOf(
        TestData.getOffering(pfiDid, customPresentationDefinition).apply { sign(pfi) }
        )
        val mockResponseString = Json.jsonMapper.writeValueAsString(mapOf("data" to mockOfferings))
        server.enqueue(MockResponse().setBody(mockResponseString).setResponseCode(HttpURLConnection.HTTP_OK))

        // :snippet-start: findMatchingOfferingsKt

        // Your network of PFIs
        val pfiDids = listOf(pfiDid)

        val payinCurrencyCode = "USD" // Desired payin currency code
        val payoutCurrencyCode = "KES" // Desired payout currency code

        // Customer's signed credentials in JWT format
        val credentials = listOf(vcJwtResidence, vcJwtSanctions) 

        // Array to store the matched offerings
        val matchedOfferings = ArrayList<Offering>()

        for (pfiDid in pfiDids) {
            val offerings = TbdexHttpClient.getOfferings(pfiDid)
            
            // Filter offerings based on the desired currency pair
            offerings.filter { offering ->
                offering.data.payinCurrency.currencyCode == payinCurrencyCode && offering.data.payoutCurrency.currencyCode == payoutCurrencyCode
            }.forEach { offering ->

                // Extract the presentation definition from the offering
                offering.data.requiredClaims?.let { presentationDefinition ->
                    try {
                        // Validate customer's VCs against the offering's presentation definition
                        PresentationExchange.satisfiesPresentationDefinition(credentials, presentationDefinition)

                        //  Add offerings that match the customer's needs and qualifications
                        matchedOfferings.add(offering)
                    } catch (e: Exception) {
                        // Offerings where the customer's VCs do not meet the requirements are skipped
                    }
                }
            }
        }
        // :snippet-end:
        assertNotEquals(0, matchedOfferings.size, "No matching offerings found")
    }

    @Test
    fun `selects credentials based on required claims from offering`() {
        val customPresentationDefinition = PresentationDefinitionV2(
            id = "custom-pd-id",
            inputDescriptors = listOf(
                InputDescriptorV2(
                    id = "sanctionsVerification",
                    purpose = "Confirm the individual is not sanctioned",
                    constraints = ConstraintsV2(
                        fields = listOf(FieldV2(path = listOf("$.vc.credentialSubject.status")))
                    )
                ),
                InputDescriptorV2(
                    id = "residenceVerification",
                    purpose = "Confirm the individual's residence address",
                    constraints = ConstraintsV2(
                        fields = listOf(FieldV2(path = listOf("$.vc.credentialSubject.address")))
                    )
                )
            )
        )

        val mockOffering = TestData.getOffering(pfiDid, customPresentationDefinition).apply { sign(pfi) }
        val mockResponseString = Json.jsonMapper.writeValueAsString(mapOf("data" to listOf(mockOffering)))
        server.enqueue(MockResponse().setBody(mockResponseString).setResponseCode(HttpURLConnection.HTTP_OK))

        val credentials = listOf(vcJwtResidence, vcJwtSanctions)
        val selectedOffering = mockOffering
        // :snippet-start: getSelectedCredentialsKt
        // Select the credentials to be used for the exchange
        val selectedCredentials = PresentationExchange.selectCredentials(credentials, selectedOffering.data.requiredClaims!!)
        // :snippet-end:

        assertEquals(2, selectedCredentials.size)
        assertTrue(selectedCredentials.containsAll(listOf(vcJwtResidence, vcJwtSanctions)))
    }

}
