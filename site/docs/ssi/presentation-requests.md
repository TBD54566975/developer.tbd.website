---
sidebar_position: 11
title: Presentation Requests
---

A [Presentation Request](https://identity.foundation/presentation-exchange/spec/v2.0.0/#presentation-request) is essentially a message that a Verifier sends to a Holder, asking for certain credentials or information. Think of it like a checklist, formally known as a [Presentation Definition](https://identity.foundation/presentation-exchange/spec/v2.0.0/#presentation-definition), which outlines what the Verifier needs to know. It specifies the "claims" or credentials that the Holder needs to provide, offering them various options to meet these criteria. In some scenarios, this request may also be digitally signed for added security and might include special features to prevent replay attacks.

To illustrate, imagine Alice wants to rent a car from Acme Car Rentals. Alice, acting as the Holder, has a driver's license in a digital wallet. Acme, being the Verifier, sends a Presentation Request to Alice's wallet to check if she has a valid driver's license. This is essentially Acme's way of asking Alice's wallet to show her driver's license VC for verification.

## Presentation API Requests

Alice walks into Acme Car Rentals, ready to rent a car for the weekend. 
Acme needs to verify that Alice has a valid driver's license before renting her a car.

Let's explore how the [Presentation Requests resource](/docs/apis/ssi-service#tag/PresentationRequests) can be used in this scenario.


:::info
## Prerequisites
- Follow guide to [Run SSI Service](run-ssi-service)
- Create a [Presentation Definition](/docs/apis/ssi-service#tag/Presentations/paths/~1v1~1presentations~1definitions/put)
- Create a [DID](create-did) (or use an existing one). Save the `id` (DID) and `verificationMethodId`
:::

### Create a Presentation Request

<details>
<summary>Field Definitions</summary>

#### Required

- `issuerId` (string) - DID of the issuer of the Presentation Definition. The DID must have been previously created with the DID API.

- `verificationMethodId` (string) - ID of the `verificationMethod` whose private key is stored in the SSI Service. This is defined within the DID Document.

- `presentationDefinitionId` (string) - ID of the presentation definition to use for this request.


#### Optional

- `audience`	(array of strings) - The [audience claim](https://www.rfc-editor.org/rfc/rfc7519.html#section-4.1.3) specifies who the Presentation Request is intended for. If used, each recipient processing the Presentation Request (like Acme in our example) should find their DIDs listed in this field, or else reject the request. This helps ensure that the Presentation Request is being used by the right parties.

- `callbackUrl`	(string) - The URL where the presentation submission should be sent. If provided, this is the endpoint to which the presenter (like Alice's wallet in our example) will send the necessary credentials for verification. 

- `expiration`	(string) - The deadline for using this Presentation Request. After this time, the request becomes invalid and can't be processed.

</details>


Alice uses her digital wallet app to scan the QR code displayed at the Acme counter. The QR code contains initial data that lets Alice's wallet know that a Presentation Request will be coming from Acme.

At this point, Acme's system receives a notification indicating that Alice's wallet has scanned the QR code and is awaiting a Presentation Request.

Acme initiates a `PUT` request to `v1/presentations/requests` to ask for Alice's credentials:

```bash
curl -X PUT localhost:8080/v1/presentations/requests -d '{
 "issuerId": "did:key:z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM",
 "presentationDefinitionId": "24ae411e-e3ca-4217-b055-5fb306b2bb5c",
 "verificationMethodId": "did:key:z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM#z6MkirxnoyzmKW36bGwZCZoHSofBZTfSStpUdrQdesfnithM"
}'
```

The Presentation Request is generated and sent back to Alice's wallet:

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

Alice's wallet processes the request and prompts Alice to approve or deny the request for information. After Alice approves the request, the wallet generates a [Presentation](/docs/ssi/verifiable-presentations) containing the requested credentials and sends it back to Acme for verification.

Acme verifies Alice's credentials and proceeds with renting Alice a car.

### List Presentation Requests

The manager of Acme Car Rentals occasionally performs audits of their rental processes to measure several aspects such as transaction time, credential acceptance rates, etc. 

The manager initiates a `GET` request to `v1/presentations/requests` in order to obtain a list of all the Presentation Requests that they processed:

```bash
curl -X GET localhost:8080/v1/presentations/requests
```


### Get a Presentation Request

During the audit, the Acme manager notices an irregularity and needs more details on the Presentation Request that was made to Alice earlier in the day. To dive deeper into the specifics of that particular request, the manager initiates a `GET` request to `v1/presentations/requests/{id}`, specifying the ID of the Presentation Request:

```bash
curl -X GET localhost:8080/v1/presentations/requests/24ae411e-e3ca-4217-b055-5fb306b2bb5c
```

This retrieves detailed information on the Presentation Request identified by that ID, allowing the manager to carefully review and ascertain whether all protocols were adequately followed.

### Delete a Presentation Request

Within Acme, another customer scans the QR code and generates a Presentation Request, however he decides he'd rather not rent a car today and tells Acme to cancel the request. Acme issues a `DELETE` request to `v1/presentations/requests/{id}` to remove the Presentation Request:

```bash
curl -X DELETE localhost:8080/v1/presentations/requests/16bf410e-e5ba-4318-b144-5fb306b2aa6a
```
