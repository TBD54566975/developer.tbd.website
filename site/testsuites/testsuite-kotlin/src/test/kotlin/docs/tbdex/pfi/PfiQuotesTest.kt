import tbdex.sdk.protocol.models.Rfq
import tbdex.sdk.protocol.models.Quote
import de.fxlae.typeid.TypeId
import tbdex.sdk.httpserver.models.*
import java.util.NoSuchElementException
import tbdex.sdk.protocol.models.*
import tbdex.sdk.httpserver.TbdexHttpServer
import tbdex.sdk.httpserver.TbdexHttpServerConfig
import web5.sdk.crypto.AwsKeyManager
import web5.sdk.dids.methods.dht.DidDht
import tbdex.sdk.httpserver.models.SubmitKind
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.Did
import web5.sdk.dids.methods.jwk.DidJwk
import java.time.OffsetDateTime


//---------------------------------------------------------------------------//
// TODO: Refactor this into a common file similar to setup-web5.js. This is  //
// being used in the pfi structure page as well, but with KT tests blocking  //
// I will create a separate PR for doing this setup.                         //
//---------------------------------------------------------------------------//

class MockDataProvider {
    private val offeringString = """
        {
          "metadata": {
            "from": "did:ex:pfi",
            "kind": "offering",
            "id": "offering_01ha82y8d0fhstg95hhfjwmgxf",
            "createdAt": "2023-09-13T20:15:22.528Z"
          },
          "data": {
            "description": "Selling BTC for USD",
            "payinCurrency": {
              "currencyCode": "USD"
            },
            "payoutCurrency": {
              "currencyCode": "BTC",
              "maxSubunits": "99952611"
            },
            "payoutUnitsPerPayinUnit": "0.00003826",
            "payinMethods": [
              {
                "kind": "DEBIT_CARD",
                "requiredPaymentDetails": {
                  "schema": "http://json-schema.org/draft-07/schema",
                  "type": "object",
                  "properties": {
                    "cardNumber": {
                      "type": "string",
                      "description": "The 16-digit debit card number",
                      "minLength": 16,
                      "maxLength": 16
                    },
                    "expiryDate": {
                      "type": "string",
                      "description": "The expiry date of the card in MM/YY format",
                      "pattern": "^(0[1-9]|1[0-2])\\/([0-9]{2})$"
                    },
                    "cardHolderName": {
                      "type": "string",
                      "description": "Name of the cardholder as it appears on the card"
                    },
                    "cvv": {
                      "type": "string",
                      "description": "The 3-digit CVV code",
                      "minLength": 3,
                      "maxLength": 3
                    }
                  }
                }
              }
            ],
            "payoutMethods": [
              {
                "kind": "BTC_ADDRESS",
                "requiredPaymentDetails": {
                  "schema": "http://json-schema.org/draft-07/schema",
                  "type": "object",
                  "properties": {
                    "btcAddress": {
                      "type": "string",
                      "description": "your Bitcoin wallet address"
                    }
                  },
                  "additionalProperties": false
                }
              }
            ],
            "requiredClaims": {
              "id": "7ce4004c-3c38-4853-968b-e411bafcd945",
              "input_descriptors": [
                {
                  "id": "bbdb9b7c-5754-4f46-b63b-590bada959e0",
                  "constraints": {
                    "fields": [
                      {
                        "path": [
                          "$.type"
                        ],
                        "filter": {
                          "type": "string",
                          "const": "YoloCredential"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          "signature": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa2syc1QyZUtvQWdUUTdzWjY3YTdmRDMzR21jYzZ1UXdaYmlxeWF5Rk1hYkhHI3o2TWtrMnNUMmVLb0FnVFE3c1o2N2E3ZkQzM0dtY2M2dVF3WmJpcXlheUZNYWJIRyJ9..9EBTL3VcajsQzSNOm8GElhcwvYcFGaRp24FTwmC845RCF84Md-ZB-CxdCo7kEjzsAY8OaB55XFSH_8K9vedhAw"
        }
    """.trimIndent()

    fun insert(collectionName: String, data: Any) {

    }

    fun get(collectionName: String, id: String): Any? {
        return offeringString;
    }

    fun query(collectionName: String, searchParam: String): List<Any> {
        return listOf(offeringString);
    }
}

private val dataProvider = MockDataProvider()

class ExchangesApiProvider : ExchangesApi {

    private val fakeExchangesApi = FakeExchangesApi()

    override fun getClose(exchangeId: String): Close {
      return fakeExchangesApi.getClose(exchangeId)
  }

  override fun getExchange(id: String): List<Message> {
      return fakeExchangesApi.getExchange(id)
  }

  override fun getExchanges(filter: GetExchangesFilter?): List<List<Message>> {
      return fakeExchangesApi.getExchanges(filter) ?: emptyList()
  }

  override fun getOrder(exchangeId: String): Order {
      return fakeExchangesApi.getOrder(exchangeId)
  }

  override fun getOrderStatuses(exchangeId: String): List<OrderStatus> {
      return fakeExchangesApi.getOrderStatuses(exchangeId)
  }

  override fun getQuote(exchangeId: String): Quote {
      return fakeExchangesApi.getQuote(exchangeId)
  }

  override fun getRfq(exchangeId: String): Rfq {
      return fakeExchangesApi.getRfq(exchangeId)
  }

    fun write(message: Message) {
        val data = mapOf(
            "exchangeid" to message.metadata.exchangeId,
            "messagekind" to message.metadata.kind,
            "messageid" to message.metadata.id,
            "subject" to message.metadata.from,
            "message" to message.data
        )
        dataProvider.insert("exchange", data)
    }
}

class OfferingsApiProvider : OfferingsApi {
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
}
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//

data class Config(
    val did: Did
)

suspend fun createQuoteFromRfq(message: Message) {
    val offeringsApiProvider = OfferingsApiProvider()
    val exchangesApiProvider = ExchangesApiProvider()
    val sampleDid = DidJwk.create(InMemoryKeyManager())
    val config = Config(sampleDid)

    // :snippet-start: pfiQuotesWriteKt
    val data = mapOf(
        "exchangeid" to message.metadata.exchangeId,
        "messagekind" to message.metadata.kind,
        "messageid" to message.metadata.id,
        "subject" to message.metadata.from,
        "message" to message.data
    )
    dataProvider.insert("exchange", data)
    val offering = offeringsApiProvider.getOffering(message.metadata.id.toString())
    // :snippet-end:

    // :snippet-start: pfiQuotesProcessKt
    if (offering is Offering && message is Rfq) {
        try {
            val rfq = message as Rfq
            rfq.verifyOfferingRequirements(offering)
        } catch (e: Exception) {
            println("Failed to verify offering requirements: ${e.message}")
        }
    }
    // :snippet-end:

    // :snippet-start: pfiQuotesSendKt
    val quoteData = QuoteData(
        expiresAt = OffsetDateTime.now().plusDays(10),
        payin = QuoteDetails("BTC", "1000"),
        payout = QuoteDetails("KES", "123456789")
    )

    val quote = Quote.create(
        to = message.metadata.to,
        from = message.metadata.from,
        exchangeId = message.metadata.exchangeId,
        quoteData = quoteData
    )
    // :snippet-end:

    // :snippet-start: pfiQuotesSignKt
    quote.sign(config.did)
    exchangesApiProvider.write(quote)
    // :snippet-end:
}