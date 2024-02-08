package website.tbd.developer.site.docs.tbdex

class MockDataProviderTest {

    // TODO: Move out of string literal, add more types
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

    // NOTE: Currently Only returns offering as required for the tests. Will
    // update the implementations with future tests
    fun get(collectionName: String, id: String): Any? {
        return offeringString;
    }

    // NOTE: Currently Only returns offering as required for the tests. Will
    // update the implementations with future tests
    fun query(collectionName: String, searchParam: String): List<Any> {
        return listOf(offeringString);
    }
}