---
sidebar_position: 9
title: Verifiable Presentations
---

:::warning
This project is not actively being maintained. If you are interested in adopting it, please [open an issue](https://github.com/TBD54566975/ssi-service).
:::

# Verifiable Presentations

In order to use Verifiable Credentials (VC), the holder must **_present_** them, which means to share them with another party. Sharing consists of creating a package of credential(s) and transmitting the package to another party.

## What is a Verifiable Presentation?
Packaging a credential or set of credentials into a presentation is called **Verifiable Presentations**.

Verifiable Presentations are a standard data container that serve as an authenticated wrapper around a set of credentials to be verified. Verifiable Presentations provide a number of benefits such as:

 - a common data format designed to work with Verifiable Credentials and is reusable in any number of use cases

 - guidance on constructing presentations that ensures integrity protection and guards against replay attacks

Presentations impose no constraints on who can construct them or what may be presented. This means if you have multiple credentials issued to different DIDs, you can still construct a Verifiable Presentation to present those credentials at the same time. To make this possible, the `proof` property of a VC can be an array of proofs. 

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5",
  "type": ["VerifiablePresentation", "CredentialManagerPresentation"],
  "verifiableCredential": [{  }],
  //highlight-next-line
  "proof": [{  }]
}
```

Verifiers must ensure that the credentials in a given presentation can be presented by the presenter, and that the credentials themselves are valid.

<Divider type="slash" />

## SSI Service Support for Verifiable Presentations
Verifiable Presentations are currently accepted in two main SSI Service flows: 

 * verifying Presentation Submissions while using Presentation Exchange
 * verifying Credential Applications while using Credential Manifest
 
As a utility, we've also exposed an endpoint to statelessly verify a presentation by making a `PUT` request to `/v1/presentations/verification`. 

:::info
## Prerequisite
Follow guide to [Run SSI Service](run-ssi-service)
:::

A sample request is as follows:

```bash
curl -X PUT localhost:8080/v1/presentations/verification -d '{
    "presentationJwt": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrI3o2TWttTjEyOTZ1YXBIbU02QTI4bkdaR2RBRW5pRDFhYTVSZEZDbjhKRXVucVY5ayIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTExNzU2MjQsImlzcyI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrIiwianRpIjoiYjQ0OTI0ZWEtMDIwMi00ZTllLWJiMmEtOTg5YmQwNWQ1N2FlIiwibmJmIjoxNjkxMTc1NjI0LCJub25jZSI6IjVjNmFhZDc2LWUyZWYtNGNiNy1iMWE4LTI3MjZiMjRhM2Y0ZSIsInZwIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZVByZXNlbnRhdGlvbiJdLCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6WyJleUpoYkdjaU9pSkZaRVJUUVNJc0ltdHBaQ0k2SW1ScFpEcHJaWGs2ZWpaTmEyMU9NVEk1Tm5WaGNFaHRUVFpCTWpodVIxcEhaRUZGYm1sRU1XRmhOVkprUmtOdU9FcEZkVzV4VmpsckkzbzJUV3R0VGpFeU9UWjFZWEJJYlUwMlFUSTRia2RhUjJSQlJXNXBSREZoWVRWU1pFWkRiamhLUlhWdWNWWTVheUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWVhRaU9qRTJPVEV4TnpVMk1qUXNJbWx6Y3lJNkltUnBaRHByWlhrNmVqWk5hMjFPTVRJNU5uVmhjRWh0VFRaQk1qaHVSMXBIWkVGRmJtbEVNV0ZoTlZKa1JrTnVPRXBGZFc1eFZqbHJJaXdpYW5ScElqb2lPRFUyTnpRellURXRZamxsWWkwME56Z3lMV0kzTkRjdE5UbGtOekkzWVRGaVlXWTFJaXdpYm1KbUlqb3hOamt4TVRjMU5qSTBMQ0p1YjI1alpTSTZJamsyTkRkalltTmtMV0k0WkRndE5HVXhNeTFpTURKa0xURXpZelUxTm1RNVlqRTFPQ0lzSW5OMVlpSTZJbVJwWkRwclpYazZlalpOYTIxT01USTVOblZoY0VodFRUWkJNamh1UjFwSFpFRkZibWxFTVdGaE5WSmtSa051T0VwRmRXNXhWamxySWl3aWRtTWlPbnNpUUdOdmJuUmxlSFFpT2xzaWFIUjBjSE02THk5M2QzY3Vkek11YjNKbkx6SXdNVGd2WTNKbFpHVnVkR2xoYkhNdmRqRWlYU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNKZExDSmpjbVZrWlc1MGFXRnNVM1ZpYW1WamRDSTZleUpsYlhCc2IzbGxjaUk2SWxSQ1JDSXNJbXB2WWxScGRHeGxJam9pVkhWMGIzSnBZV3dnUVhWMGFHOXlJbjE5ZlEuWEJPbjBTd2RZZUMwN2dHM1VkT1ZLeHV2YXpfWVRpRkNmZ2tpZXJhZUZnVkEtT2tkWDM1SWl6T0NhdUtqdWlsQXJzZklvMkNYN1pYaDl3djRhUXZFRGciXX19.pJXQXSJcu4U752IE0IH21Yw26OsGMLrHE_-LpGLDHkfetQoJk56j9Fflg-P68xVgfNwZ4EBgGEJ88bXLRv1aDQ"
}'
```

Upon success, the following response should be returned:

```json
{ 
  "verified": true
}
```
<Divider type="slash" />

## Other Projects for Verifiable Presentations
There's more that you can do with Verifiable Presentations outside of the SSI Service.

### Constructing a Verifiable Presentation
Constructing a Verifiable Presentation is out of scope for the SSI Service since the service acts as a utility for organizations managing their own credentials. However, the [SSI SDK](https://github.com/TBD54566975/ssi-sdk) provides a standards-based implementation of Verifiable Presentations using the [JWT representation](https://www.w3.org/TR/vc-data-model/#jwt-and-jws-considerations).

[Library code for Verifiable Presentations](https://github.com/TBD54566975/ssi-sdk/blob/d5c302a1d9b9d04c1636a0c8dfda015f61bb0f6b/credential/model.go#L110) is available as well as associated [signing and verification logic](https://github.com/TBD54566975/ssi-sdk/blob/d5c302a1d9b9d04c1636a0c8dfda015f61bb0f6b/credential/integrity/jwt.go#L208). 

There is also a runnable unit test that provides an [example of constructing a Verifiable Presentation using the SSI SDK](https://github.com/TBD54566975/ssi-service/blob/main/doc/howto/presentation_test.go).

Upon running, the test will create a credential and a presentation for that credential as a JWT:

```plaintext
eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrI3o2TWttTjEyOTZ1YXBIbU02QTI4bkdaR2RBRW5pRDFhYTVSZEZDbjhKRXVucVY5ayIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTExNzU2MjQsImlzcyI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrIiwianRpIjoiYjQ0OTI0ZWEtMDIwMi00ZTllLWJiMmEtOTg5YmQwNWQ1N2FlIiwibmJmIjoxNjkxMTc1NjI0LCJub25jZSI6IjVjNmFhZDc2LWUyZWYtNGNiNy1iMWE4LTI3MjZiMjRhM2Y0ZSIsInZwIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZVByZXNlbnRhdGlvbiJdLCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6WyJleUpoYkdjaU9pSkZaRVJUUVNJc0ltdHBaQ0k2SW1ScFpEcHJaWGs2ZWpaTmEyMU9NVEk1Tm5WaGNFaHRUVFpCTWpodVIxcEhaRUZGYm1sRU1XRmhOVkprUmtOdU9FcEZkVzV4VmpsckkzbzJUV3R0VGpFeU9UWjFZWEJJYlUwMlFUSTRia2RhUjJSQlJXNXBSREZoWVRWU1pFWkRiamhLUlhWdWNWWTVheUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWVhRaU9qRTJPVEV4TnpVMk1qUXNJbWx6Y3lJNkltUnBaRHByWlhrNmVqWk5hMjFPTVRJNU5uVmhjRWh0VFRaQk1qaHVSMXBIWkVGRmJtbEVNV0ZoTlZKa1JrTnVPRXBGZFc1eFZqbHJJaXdpYW5ScElqb2lPRFUyTnpRellURXRZamxsWWkwME56Z3lMV0kzTkRjdE5UbGtOekkzWVRGaVlXWTFJaXdpYm1KbUlqb3hOamt4TVRjMU5qSTBMQ0p1YjI1alpTSTZJamsyTkRkalltTmtMV0k0WkRndE5HVXhNeTFpTURKa0xURXpZelUxTm1RNVlqRTFPQ0lzSW5OMVlpSTZJbVJwWkRwclpYazZlalpOYTIxT01USTVOblZoY0VodFRUWkJNamh1UjFwSFpFRkZibWxFTVdGaE5WSmtSa051T0VwRmRXNXhWamxySWl3aWRtTWlPbnNpUUdOdmJuUmxlSFFpT2xzaWFIUjBjSE02THk5M2QzY3Vkek11YjNKbkx6SXdNVGd2WTNKbFpHVnVkR2xoYkhNdmRqRWlYU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNKZExDSmpjbVZrWlc1MGFXRnNVM1ZpYW1WamRDSTZleUpsYlhCc2IzbGxjaUk2SWxSQ1JDSXNJbXB2WWxScGRHeGxJam9pVkhWMGIzSnBZV3dnUVhWMGFHOXlJbjE5ZlEuWEJPbjBTd2RZZUMwN2dHM1VkT1ZLeHV2YXpfWVRpRkNmZ2tpZXJhZUZnVkEtT2tkWDM1SWl6T0NhdUtqdWlsQXJzZklvMkNYN1pYaDl3djRhUXZFRGciXX19.pJXQXSJcu4U752IE0IH21Yw26OsGMLrHE_-LpGLDHkfetQoJk56j9Fflg-P68xVgfNwZ4EBgGEJ88bXLRv1aDQ
```

Upon decoding, you can view the JWT as:

```json
{
  "alg": "EdDSA",
  "kid": "did:key:z6MkmN1296uapHmM6A28nGZGdAEniD1aa5RdFCn8JEunqV9k#z6MkmN1296uapHmM6A28nGZGdAEniD1aa5RdFCn8JEunqV9k",
  "typ": "JWT"
}
```

```json
{
  "iat": 1691175624,
  "iss": "did:key:z6MkmN1296uapHmM6A28nGZGdAEniD1aa5RdFCn8JEunqV9k",
  "jti": "b44924ea-0202-4e9e-bb2a-989bd05d57ae",
  "nbf": 1691175624,
  "nonce": "5c6aad76-e2ef-4cb7-b1a8-2726b24a3f4e",
  "vp": {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiablePresentation"],
    "verifiableCredential": [
      "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrI3o2TWttTjEyOTZ1YXBIbU02QTI4bkdaR2RBRW5pRDFhYTVSZEZDbjhKRXVucVY5ayIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTExNzU2MjQsImlzcyI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrIiwianRpIjoiODU2NzQzYTEtYjllYi00NzgyLWI3NDctNTlkNzI3YTFiYWY1IiwibmJmIjoxNjkxMTc1NjI0LCJub25jZSI6Ijk2NDdjYmNkLWI4ZDgtNGUxMy1iMDJkLTEzYzU1NmQ5YjE1OCIsInN1YiI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrIiwidmMiOnsiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXSwidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJlbXBsb3llciI6IlRCRCIsImpvYlRpdGxlIjoiVHV0b3JpYWwgQXV0aG9yIn19fQ.XBOn0SwdYeC07gG3UdOVKxuvaz_YTiFCfgkieraeFgVA-OkdX35IizOCauKjuilArsfIo2CX7ZXh9wv4aQvEDg"
    ]
  }
}
```

You can also decode the JWT VC value within the `verifiableCredential` property as:

```json
{
  "alg": "EdDSA",
  "kid": "did:key:z6MkmN1296uapHmM6A28nGZGdAEniD1aa5RdFCn8JEunqV9k#z6MkmN1296uapHmM6A28nGZGdAEniD1aa5RdFCn8JEunqV9k",
  "typ": "JWT"
}
```

```json
{
  "iat": 1691175624,
  "iss": "did:key:z6MkmN1296uapHmM6A28nGZGdAEniD1aa5RdFCn8JEunqV9k",
  "jti": "856743a1-b9eb-4782-b747-59d727a1baf5",
  "nbf": 1691175624,
  "nonce": "9647cbcd-b8d8-4e13-b02d-13c556d9b158",
  "sub": "did:key:z6MkmN1296uapHmM6A28nGZGdAEniD1aa5RdFCn8JEunqV9k",
  "vc": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "type": [
      "VerifiableCredential"
    ],
    "credentialSubject": {
      "employer": "TBD",
      "jobTitle": "Tutorial Author"
    }
  }
}
```

### Transmission of Verifiable Presentations
Similar to [credential issuance](/docs/ssi/credential-issuance-service), transmission of Verifiable Presentations can be accomplished with a number of different mechanisms including [Web5](/docs/web5/decentralized-web-nodes/what-are-dwns) and [OpenID Connect](https://openid.net/sg/openid4vc/). 
