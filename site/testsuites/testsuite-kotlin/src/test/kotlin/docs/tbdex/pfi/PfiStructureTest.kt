package website.tbd.developer.site.docs.tbdex.pfi

import web5.sdk.crypto.InMemoryKeyManager
import web5.sdk.dids.methods.dht.DidDht

import tbdex.sdk.protocol.models.Rfq
import tbdex.sdk.protocol.models.Quote
import tbdex.sdk.protocol.models.Order
import tbdex.sdk.protocol.models.OrderStatus
import tbdex.sdk.protocol.models.Close
import tbdex.sdk.httpserver.models.SubmitKind

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue

class PfiStructureTest {

    val offeringString = """
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
                  "$schema": "http://json-schema.org/draft-07/schema",
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
                  "$schema": "http://json-schema.org/draft-07/schema",
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

    // Parse the JSON string into a dynamic object
    val objectMapper = jacksonObjectMapper()
    val jsonObject: Map<String, Any> = objectMapper.readValue(offeringString)

    fun insert(collectionName: String, data: Any) {
        
    }

    fun get(collectionName: String, id: String): Any? {
        return offeringString
    }

    fun query(collectionName: String, searchParam: String): List<Any> {
        return listOf(offeringString)
    }
}

class ExchangesApiProvider : ExchangesApi {
    override fun getExchange(id: String): List<Message> {
        return listOf(Message("Exchange with ID $id"))
    }

    override fun getExchanges(filter: GetExchangesFilter?): List<List<Message>> {
        // Mock implementation for getExchanges
        return listOf(
            listOf(Message("Exchange 1"), Message("Exchange 2")),
            listOf(Message("Exchange 3"))
        )
    }

    override fun getRfq(exchangeId: String): Rfq {
        return Rfq("RFQ for exchange $exchangeId")
    }

    override fun getQuote(exchangeId: String): Quote {
        return Quote("Quote for exchange $exchangeId")
    }

    override fun getOrder(exchangeId: String): Order {
        return Order("Order for exchange $exchangeId")
    }

    override fun getOrderStatuses(exchangeId: String): List<OrderStatus> {
        // Mock implementation for getOrderStatuses
        return listOf(OrderStatus("Status 1"), OrderStatus("Status 2"))
    }

    override fun getClose(exchangeId: String): Close {
        return Close("Close information for exchange $exchangeId")
    }

    // :snippet-start: pfiOverviewWriteKt
    suspend fun write(message: Message) {
        val data = mapOf(
            "exchangeid" to message.exchangeId,
            "messagekind" to message.kind,
            "messageid" to message.id,
            "subject" to message.subject,
            "message" to objectMapper.writeValueAsString(message)
        )
        dataProvider.insert("exchange", data)
    }
    // :snippet-end:
}

// :snippet-start: pfiOverviewReadOfferingsKt
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
    // :snippet-end:

    // :snippet-start: pfiOverviewWriteOfferingsKt
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
    // :snippet-end:

}

class PfiServer {
  val did = DidDht.create(InMemoryKeyManager())

  // :snippet-start: pfiOverviewConfigKt
  val serverConfig = TbdexHttpServerConfig(
      port = 8080,
      pfiDid = did.uri,
      offeringsApi = ExchangesApiProvider(),
      exchangesApi = OfferingsApiProvider()
    )

  val httpApi = TbdexHttpServer(serverConfig)
  // :snippet-end:

  // :snippet-start: pfiOverviewServerRoutesKt
  httpApi.submit(SubmitKind.rfq) { call, message, offering ->
      ExchangesApiProvider.write(message)
      call.respond(HttpStatusCode.Accepted)
  }

  httpApi.submit(SubmitKind.order) { call, message, offering ->
      ExchangesApiProvider.write(message)
      call.respond(HttpStatusCode.Accepted)
  }

  httpApi.submit(SubmitKind.close) { call, message, offering ->
      ExchangesApiProvider.write(message)
      call.respond(HttpStatusCode.Accepted)
  }
  // :snippet-end:

  // :snippet-start: pfiOverviewServerStartKt
  httpApi.start()
  // :snippet-end:
}
