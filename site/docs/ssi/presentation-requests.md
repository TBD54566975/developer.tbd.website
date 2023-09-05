---
sidebar_position: 11
title: Presentation Requests
---

[Presentation Requests](https://identity.foundation/presentation-exchange/spec/v2.0.0/#presentation-request) are transport mechanisms used to send a [Presentation Definition](https://identity.foundation/presentation-exchange/spec/v2.0.0/#presentation-definition) from a Verifier to a Holder. Presentations (aka Presentation Definition) are objects that articulate what proofs a Verifier requires. These help the Verifier to decide how or whether to interact with a Holder. They consist of input descriptions and optional selection rules to offer Holders flexibility in meeting input requirements.

To illustrate, consider the situation where Alice, as the holder, possesses a driver's license VC in her wallet, and she intends to secure a car rental from Acme Car Rentals, acting as the verifying entity. The Presentation Request would be the message format being sent from Acme to Alice's wallet checking to see if her VC is present. In other words, it’s the message Acme constructs for Alice's wallet to be able to submit credentials for verfication.

:::note
Presentation Exchange is a [ratified specification](https://identity.foundation/presentation-exchange/spec/v2.0.0/) developed within the Decentralized Identity Foundation (DIF). It incorporates requirements and learnings from related work of many active industry players into a shared specification that meets the collective needs of the community.
:::

## Presentation API Requests
Within the SSI Service [PresentationRequests API](/docs/apis/ssi-service#tag/PresentationRequests) you can create, list, read, or delete Presentation Requests.

:::info
## Prerequisites
- Follow guide to [Run SSI Service](run-ssi-service)
- Create a [Presentation Definition](/docs/apis/ssi-service#tag/Presentations/paths/~1v1~1presentations~1definitions/put)
- Create a [DID](create-did)
:::

### Create a Presentation Request

<details>
<summary>Field Definitions</summary>

#### Required

- `issuerId` (string) - DID `id` of the issuer of the Presentation Definition.

- `presentationDefinitionId` (string) - Presentation Definition `id`.

- `verificationMethodId` (string) - The `id` of the [verificationMethod](https://www.w3.org/TR/did-core/#verification-methods) who's `privateKey` is stored in the SSI Service. This will be defined within your DID creation response.

#### Optional

- `audience`	(array of strings) - The audience claim identifies the recipients that the JWT is
   intended for. [Audience Claim](https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.3).  

- `callbackUrl`	(string) - The URL that the presenter should be submitting the Presentation Submission to. 

- `expiration`	(string) - The expiration claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing. Processing the claim requires that the current date/time MUST be before the expiration date/time.

</details>

Create a `PUT` request to `v1/presentations/requests` including the DID `id` and the Presentention Definition `id`:

```bash
curl -X PUT localhost:8080/v1/presentations/requests -d '{
 "issuerId": "did:key:z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM",
 "presentationDefinitionId": "24ae411e-e3ca-4217-b055-5fb306b2bb5c",
 "verificationMethodId": "did:key:z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM#z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM"
}'
```

The following response should be returned:
```json
{
  "presentationRequest": {
    "id": "5411efba-20d9-446a-8882-b024ba75c5df",
    "issuerId": "did:key:z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM",
    "verificationMethodId": "did:key:z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM#z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM",
    "presentationDefinitionId": "24ae411e-e3ca-4217-b055-5fb306b2bb5c",
    "presentationRequestJwt": "eyJhbGciOiJFZERTQSIsImt..."
  }
}
```

### List Presentation Requests

To obtain a list of all Presentation Requests, make a `GET` request to `v1/presentations/requests`:

```bash
curl -X GET localhost:8080/v1/presentations/requests
```

### Get a Presentation Request

To get a specific Presentation Request, submit a `GET` request to `v1/presentations/requests/{id}` and pass in the `id` of the Presentation Request:

```bash
curl -X GET localhost:8080/v1/presentations/requests/24ae411e-e3ca-4217-b055-5fb306b2bb5c
```

### Delete a Presentation Request

To delete an existing Presentation Request, make a `DELETE` request to `v1/presentations/requests/{id}` passing in the `id` of the Presentation Request you wish to delete:

```bash
curl -X DELETE localhost:8080/v1/presentations/requests/24ae411e-e3ca-4217-b055-5fb306b2bb5c
```