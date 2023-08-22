---
sidebar_position: 13
---

# Well Known DID Configuration

Enabling the bridge between current systems and DIDs is essential to amplify their adoption and practicality. A method to achieve this connection involves utilizing a resource known as a [Well Known DID Configuration](https://identity.foundation/.well-known/resources/did-configuration/).

This type of resource serves as proof of a bi-directional link between a website manager and their DID. This verification is established through a cryptographically secure digital signature associated with essential DID information.

The SSI Service does all the heavy lifting to set this up for you, linking DIDs that were created within the service to a website you control.

<Divider type="slash" />

## Create DID Configuration
:::info
## Prerequisites

- [Create an Issuer DID](create-did): Save the DID `id` and `verificationMethodId`
- An origin you control (e.g., https://www.tbd.website)
- The ability to host files in a path within that origin. (e.g., you could host the file returned via https://www.tbd.website/.well-known/did-configuration.json)
:::

With an `issuerDid`, `verificationMethodId`, and `origin` / website you control, make a `PUT` request to `/v1/did-configurations` to create a DID configuration like so:

```bash
curl -X PUT 'localhost:8080/v1/did-configurations' -d '{
  "expirationDate": "2051-10-05T14:48:00.000Z",
  "issuanceDate": "2023-10-08T14:48:00.000Z",
  "issuerDid": "did:key:z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ",
  "origin": "https://www.tbd.website",
  "verificationMethodId": "did:key:z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ#z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ"
}'
```

Upon success the following response should be returned:

```json
{
  "wellKnownLocation": "https://www.tbd.website/.well-known/did-configuration.json",
  "didConfiguration": {
    "@context": "https://identity.foundation/.well-known/did-configuration/v1",
    "linked_dids": [
      "eyJhbGciOiJFZERTQSIs..."
    ]
  }
}
```

#### Key Properties for Describing DID Configuration:
- `wellKnownLocation` -  Indicating the hosting location for the content.
- `didConfiguration` - The hosted content related to the configuration.

## Host the Created DID Configuration
Now that we have `wellKnownLocation`, let's ensure it resolves to a JSON file, and the contents of that file are the value of `didConfiguration`.

With that in mind, in our example the URL `https://www.tbd.website/.well-known/did-configuration.json` should return the JSON object described below:

```json
{
  "@context": "https://identity.foundation/.well-known/did-configuration/v1",
  "linked_dids": [
    "eyJhbGciOiJFZERTQSIs..."
  ]
}
```