---
sidebar_position: 11
title: Presentation Requests
---

A [Presentation Request](https://identity.foundation/presentation-exchange/spec/v2.0.0/#presentation-request) is essentially a message from a Verifier asking a Holder for specific information. Imagine it as a checklist the Verifier sends to a Holder outlining what they need to know. This checklist is formally known as a [Presentation Definition](https://identity.foundation/presentation-exchange/spec/v2.0.0/#presentation-definition), and it details the credentials or "claims" the Holder needs to show. The goal is to provide the Holder with options on how to meet these criteria.

To illustrate, consider the situation where Alice, as the Holder, possesses a driver's license VC in her wallet, and she intends to secure a car rental from Acme Car Rentals, acting as the verifying entity. The Presentation Request would be the message format being sent from Acme to Alice's wallet, checking to see if her VC is present. In other words, it’s the message Acme constructs for Alice's wallet to be able to submit credentials for verification.

## Presentation API Requests
Within the SSI Service, first you'll wan [PresentationRequests API](/docs/apis/ssi-service#tag/PresentationRequests) you can create, list, read, or delete Presentation Requests.

:::info
## Prerequisites
- Follow guide to [Run SSI Service](run-ssi-service)
- Create a [Presentation Definition](/docs/apis/ssi-service#tag/Presentations/paths/~1v1~1presentations~1definitions/put)
- Create a [DID](create-did) (or use an existing one): Save the DID `id` and `verificationMethodId`
:::

### Create a Presentation Request

<details>
<summary>Field Definitions</summary>

#### Required

- `issuerId` (string) - DID `id` of the issuer of the Presentation Definition.

- `presentationDefinitionId` (string) - Presentation Definition `id`.

- `verificationMethodId` (string) - The `id` of the [verificationMethod](https://www.w3.org/TR/did-core/#verification-methods) who's `privateKey` is stored in the SSI Service. This will be defined within your DID creation response.

#### Optional

- `audience`	(array of strings) - The [audience claim](https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.3) identifies the recipients that the JWT is intended for.

- `callbackUrl`	(string) - The URL that the presenter should be submitting the Presentation Submission to. 

- `expiration`	(string) - The expiration claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing. Processing the claim requires that the current date/time MUST be before the expiration date/time.

</details>

Alice walks into Acme Car Rentals, ready to rent a car for the weekend. They ask for Alice's driver's license to verify she's able to rent a car.

Acme initiates a `PUT` request to `v1/presentations/requests`, to ask for Alice's credentials:

```bash
curl -X PUT localhost:8080/v1/presentations/requests -d '{
 "issuerId": "did:key:z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM",
 "presentationDefinitionId": "24ae411e-e3ca-4217-b055-5fb306b2bb5c",
 "verificationMethodId": "did:key:z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM#z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM"
}'
```

The presentation request will be returned::
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

To confirm Alice's wallet received the Presentation Request, her wallet sends a `GET` request to `v1/presentations/requests` to obtain all Presentation Requests created:

```bash
curl -X GET localhost:8080/v1/presentations/requests
```

### Get a Presentation Request

Alice would like to review the details before sharing her credentials. Her wallet sends a `GET` request to `v1/presentations/requests/{id}`, using the `id` received, to retrieve the specific Presentation Request.

```bash
curl -X GET localhost:8080/v1/presentations/requests/24ae411e-e3ca-4217-b055-5fb306b2bb5c
```

### Delete a Presentation Request

Alice decides she'd rather not rent a car today and tells Acme to cancel the request. Acme issues a `DELETE` request to `v1/presentations/requests/{id}` to remove Alice's Presentation Request.

```bash
curl -X DELETE localhost:8080/v1/presentations/requests/24ae411e-e3ca-4217-b055-5fb306b2bb5c
```