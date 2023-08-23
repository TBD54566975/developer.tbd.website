---
sidebar_position: 13
---

# Link a DID to a Domain

Connecting DIDs to existing systems is essential to amplify their adoption and practicality. One way to do this is by proving that the entity that controls a DID is also in control of a specific web origin (a website's location). A method to achieve this connection involves utilizing a resource known as a [Well Known DID Configuration](https://identity.foundation/.well-known/resources/did-configuration/).

Imagine Alice controls a reputable website, `example.com`. She can use DID Configuration to prove that she is the same entity controlling her DID and her website. This proof involves cryptographic signatures that show Alice is connected to both, allowing others to verify that Alice's DID and her website are indeed managed by the same entity.

This configuration can be created via the SSI Service.

<Divider type="slash" />

## Create DID Configuration
:::info
## Prerequisites

- [Create a DID](create-did) (or use an existing one): Save the DID `id` and `verificationMethodId`
- An origin you control (e.g., https://example.com)
- The ability to host files in a path within that origin. (e.g., you could host the file returned via https://example.com/.well-known/did-configuration.json)
:::

To make the claim that her DID is associated with her `origin`, Alice uses the SSI Service to issue herself a Domain Linkage Credential. In this request, she'll also need to include the `verificationMethodId` so that its private key can be used to sign the credential. This can done via a `PUT` request to `/v1/did-configurations`:

```bash
curl -X PUT 'localhost:8080/v1/did-configurations' -d '{
  "expirationDate": "2051-10-05T14:48:00.000Z",
  "issuanceDate": "2023-10-08T14:48:00.000Z",
  "issuerDid": "did:key:z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ",
  "origin": "https://example.com",
  "verificationMethodId": "did:key:z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ#z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ"
}'
```

Upon success the following response should be returned:

```json
{
  "wellKnownLocation": "https://example.com/.well-known/did-configuration.json",
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
- `linked_dids` - Array of JWT formatted Domain Linkage Credential entries.

## Host the Created DID Configuration

Now that we have `wellKnownLocation`, let's ensure it resolves to a JSON file.

- Create a directory at the root of your server called `.well-known`.
- Create a new file in the `.well-known` directory called `did-configuration.json`.
- Copy the json and paste it into the `did-configuration.json` file and save it.

```json
{
  "@context": "https://identity.foundation/.well-known/did-configuration/v1",
  "linked_dids": [
    "eyJhbGciOiJFZERTQSIs..."
  ]
}
```

After completing this, by opening your URL `https://{YOUR_DOMAIN}/.well-known/did-configuration.json` in a browser, you should see the JSON object.

## Verify DID Configuration

After fetching and validating the resource via the DID Configuration Resource process above, the service can check if any of Alice's Domain Linkage Credentials are valid or not.

To establish the validity it MUST carry out the following steps:

- Ensure `credentialSubject.id` matches both Subject and Issuer, and is a DID.
- Use Linked Data Proof Format or JSON Web Token Proof Format for the Credential.
- Check `credentialSubject.origin` against requested resource's `origin`.
- Resolve DID in Issuer's Domain Linkage Credential to get DID document.
- Validate credential's signature using DID document's `assertionMethod` key material.
- Successful verification implies `origin` and DID Controller equivalence.
- Failed validation of one entry doesn’t affect others; continuation is up to the processing entity's choice.

To verify Alice's configuration, a request can be done via `PUT` to `/v1/did-configurations/verification` passing in Alice's `origin`:

```bash
curl -X PUT 'localhost:8080/v1/did-configurations/verification' -d '{
  "origin": "https://example.com"
}
```

Upon success, the following will be returned:

```json
{
  "verified": true,
  "didConfiguration": "{\"@context\":\"https://identity.foundation/.well-known/contexts/did-configuration-v0.0.jsonld\",\"linked_dids\":[\"...\",\"...\"]}"
}
```