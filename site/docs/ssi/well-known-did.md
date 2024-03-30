---
sidebar_position: 12
title: Link a DID to a Domain
---

:::warning
This project is not actively being maintained. If you are interested in adopting it, please [open an issue](https://github.com/TBD54566975/ssi-service).
:::

# Link a DID to a Domain

Connecting DIDs to existing systems is essential to amplify their adoption and practicality. One way to do this is by proving that the entity that controls a DID is also in control of a specific web origin (a website's location). A method to achieve this connection involves utilizing a resource known as a [Well Known DID Configuration](https://identity.foundation/.well-known/resources/did-configuration/).

Imagine Alice controls a reputable website, `https://example.com`. She can use DID Configuration to prove that she is the same entity controlling her DID and her website. This proof involves cryptographic signatures that show Alice is connected to both, allowing others to verify that Alice's DID and her website are indeed managed by the same entity.

This configuration can be created via the SSI Service.

## Create a DID Configuration

:::info
## Prerequisites

- [Create a DID](create-did) (or use an existing one): Save the DID `id` and `verificationMethodId`
- An origin you control (e.g., `https://example.com`)
- The ability to host files in a path within that origin. (i.e., you are able to host the file returned via `https://example.com/.well-known/did-configuration.json`)
:::

To make the claim that her DID is associated with her `origin`, Alice uses the SSI Service to issue herself a **Domain Linkage Credential**. In this request, she'll also need to include the `verificationMethodId` so that its private key can be used to sign the credential. This can done via a `PUT` request to `/v1/did-configurations`:

```bash
curl -X PUT 'localhost:8080/v1/did-configurations' -d '{
  "expirationDate": "2051-10-05T14:48:00.000Z",
  "issuanceDate": "2023-10-22T14:48:00.000Z",
  "issuerDid": "did:key:z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ",
  "origin": "https://example.com",
  "verificationMethodId": "did:key:z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ#z6MkmM43K3x5xAgzkLRW9r6HCv5c4QKfD2wjfi6tiW3CuzjZ"
}'
```

Upon success, the response will include two key properties:

- `wellKnownLocation` - the location on the web where the DID Configuration can be found
- `didConfiguration` - the actual configuration details including an array of **linked_dids**, which consists of Domain Linkage Credential entries in JWT Proof format

```json
{
  "wellKnownLocation": "https://example.com/.well-known/did-configuration.json",
  "didConfiguration": {
    "@context": "https://identity.foundation/.well-known/did-configuration/v1",
    "linked_dids": ["eyJhbGciOiJFZERTQSIs..."]
  }
}
```

## Host the DID Configuration Resource

Now that Alice has her DID Configuration Resource, she must place it at her origin. To do so, she completes the following steps:

1. Create a directory at the root of your server called `.well-known`.

2. Create a new file in the `.well-known` directory called `did-configuration.json`.

3. Copy the json and paste it into the `did-configuration.json` file and save it:

```json
{
  "@context": "https://identity.foundation/.well-known/did-configuration/v1",
  "linked_dids": ["eyJhbGciOiJFZERTQSIs..."]
}
```

After completing this, by opening the URL of the `wellKnownLocation` in a browser, the contents of the DID Configuration Resource are visible.

## Verify a DID Configuration Resource

If a verifier wants to make sure that Alice's DID Configuration Resource is valid, they can make a `PUT` request to `/v1/did-configurations/verification` passing in Alice's `origin`:

```bash
curl -X PUT 'localhost:8080/v1/did-configurations/verification' -d '{
  "origin": "https://example.com"
}'
```

To establish the validity, the SSI Service will verify the:

✅ Subject and Issuer DIDs are the same

✅ Domain Linkage Credential is in either a Linked Data Proof Format or JSON Web Token Proof Format

✅ Origin matches the resource it was requested from

✅ Credential's signature against key material in the resolved DID Document's `assertionMethod` section

Upon a successful verification, the entity can trust that Alice controls both the DID as well as the origin, `https://example.com`.

```json
{
  "verified": true,
  "didConfiguration": {
    "@context": "https://identity.foundation/.well-known/contexts/did-configuration-v0.0.jsonld",
    "linked_dids": ["eyJhbGciOiJFZERTQSIs..."]
  }
}
```
