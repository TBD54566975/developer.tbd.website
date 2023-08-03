---
sidebar_position: 2
title: Create Credentials
hide_title: true
---

# How to Create a Verifiable Credential (VC)

VCs are a core component of [SSI](/docs/glossary#self-sovereign-identity-ssi) systems and work hand-in-hand with [DIDs](/docs/web5/learn/decentralized-identifiers). In this tutorial we'll show you how DIDs are used to represent the issuer as well as the subject of the credential, and to define which content is in the credential we make use of JSON schemas.

## **Narrative**
Alice starts a new job at Acme and she'd like a VC proving her current employment status.

To request a VC, Alice logs into Acme's internal employee portal and clicks Employment Verification. Clicking the button will invoke the VC credential process via the [SSI Service](https://github.com/TBD54566975/ssi-service) Acme is hosting.

Once the process has completed, a new Employment Status VC can be sent to Alice's identity wallet.

## **Steps to Create a VC**

**[1. SSI Service Setup](#ssi-service-setup)**

  - Clone & Run SSI Service
  - Create Decentralized Identifier (DID) for Credential Issuer (Acme)
  - Create or obtain DID for Credential Subject (Alice)
  - Create Credential Schema

**[2. Create a Verifiable Credential](#create-verifiable-credential)**

<Divider type="slash" />

## **1. SSI Service Setup**

**a. Clone and Run SSI Service**

Locally clone the SSI Service repo:

```
git clone https://github.com/TBD54566975/ssi-service.git
```

The SSI Service is packaged as a Docker container and a Docker Compose file is
included to make it simple to run the service locally. First make sure you
have [Docker downloaded](https://www.docker.com/products/docker-desktop/) and running on your desktop:

Switch to the build folder:

```sh
cd ssi-service/build
```

Run the Docker Compose file:

```sh
docker-compose up --build
```

If you'd like to confirm the SSI service and sub-services are functioning, check the health and readiness endpoints:

```sh
curl localhost:8080/health
```

The following response should be returned:

```js
{ "status":"OK" }
```

**b. Create DID for Credential Issuer (Acme)**

In the world of SSI, DIDs are used to identify any subject (e.g., a person, organization, thing, data model, abstract entity, etc.). In this scenario, both Acme (issuer) and Alice (subject) are represented by their DIDs in the VC creation process.

We need two pieces of issuer information to create the credential: the issuers `DID` and a `verificationMethod`. To get both, let's create a did:key to act as the issuer, with the following PUT command to /v1/dids/key:

```sh
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

:::info
Each DID has one or more keys, and each key has a type. Some [keytypes](https://w3c-ccg.github.io/did-method-key/#format) give you different properties and can be used for different purposes. Some keys are better for signing, others for encryption. Some are even provided by the government (NIST). There are variations on how they're constructed to give different security properties. You can use any number of DID types but we recommend `Ed25519` as it's sufficient for most use cases.
:::

The following response should be returned:

```json
{
  "did": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/jws-2020/v1"
    ],
    "id": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
    "verificationMethod": [
      {
        "id": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
        "type": "JsonWebKey2020",
        "controller": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "TSP7cqEemLaZPUxbc0UzdjGVDUAfzVuOecBGuDgmqj4",
          "alg": "EdDSA",
          "kid": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw"
        }
      },
      {
        "id": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6LSrEnnMyZnZbaUw9WNvWogpwAdUgnfn4nXxjwaVqYVMDwp",
        "type": "JsonWebKey2020",
        "controller": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "X25519",
          "x": "2F555fIs2yg-MOAXyR6Cmnr-CVLf9IyDKeNu44ansFs",
          "alg": "X25519",
          "kid": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw"
        }
      }
    ],
    "authentication": [
      "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw"
    ],
    "assertionMethod": [
      "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw"
    ],
    "keyAgreement": [
      "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6LSrEnnMyZnZbaUw9WNvWogpwAdUgnfn4nXxjwaVqYVMDwp"
    ],
    "capabilityInvocation": [
      "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw"
    ],
    "capabilityDelegation": [
      "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw"
    ]
  }
}
```

As you can see the DID returned here is using `key` as its DID method. Learn more about other [DID methods](https://www.w3.org/TR/did-spec-registries/#did-methods).

:::note
  Important: Make sure to copy and set aside your response from above for the next step.
:::

**c. Create DID for Credential Subject (Alice)**

Here's a generic DID you can use for Alice for testing purposes:

```
did:key:z6MkqcFHFXqzsYyDYrEUA2pVCfQGJz2rYoCZy5WWszzSW3o6
```

However, if you'd prefer to create a new DID for Alice, run:

```
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

**d. Create a Credential Schema**

A [Credential Schema](https://www.w3.org/TR/vc-json-schema) is a document that defines the structure of a VC. It's based on the [json schema](https://json-schema.org) and shows which properties the issuer is going to use to create the VC.

Because we want to include information about the subject in the credential, let's first create a schema to define the shape of the credential's data with the following values:
- Set `issuer` to Acme's DID.
- Set `verificationMethodId` to the `id` property of the first object in the `verificationMethod` array.
- The `employedAt` property is a timestamp data type to define the date and time someone was employed at Acme.
- Our `schema` object conforms to the Draft 2020-12 schema version, so set its `$schema` property to [json-schema.org/draft/2020-12/schema](/files/schema.txt).

:::note
Although it is not required to add `issuer` and `verificationMethodId` when creating a credential schema, we're adding them in this example to show how you can prove who created the schema, an extra layer of security, and that it's not been tampered with.
:::

Once we have our schema, we'll submit it to the service with a PUT request to `v1/schemas`:

```bash
curl -X PUT localhost:8080/v1/schemas -d '{
  "name": "Employment Verification",
  "issuer": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "verificationMethodId": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "schema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "credentialSubject": {
        "type": "object",
        "properties": {
          "givenName": {
            "type": "string"
          },
          "employedAt": {
            "type": "string"
          }
        },
        "required": [
          "givenName",
          "employedAt"
        ]
      }
    }
  }
}'
```

The following response should be returned:

```json
{
  "id": "525358c8-1949-495e-becf-aa19d4da6a69",
  "type": "CredentialSchema2023",
  "credentialSchema": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa2plU..."
}
```

:::note
  Important: Make sure to copy your `Schema ID` for the next step.
:::

<Divider type="dotted" />

## **2. Create Verifiable Credential**

Now we have all three objects needed to create a VC:

- Acme's DID (issuer)
- Verification Method ID
- Alice's DID (subject)
- Schema ID

**To create the VC, run:**

```bash
curl -X PUT localhost:8080/v1/credentials -d '{
  "issuer": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "verificationMethodId": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "subject": "did:key:z6MkqcFHFXqzsYyDYrEUA2pVCfQGJz2rYoCZy5WWszzSW3o6",
  "schemaId": "525358c8-1949-495e-becf-aa19d4da6a69",
  "expiry": "2051-10-05T14:48:00.000Z",
  "data": {
    "givenName": "Alice",
    "employedAt": "2022-08-20T13:20:10.000+0000"
  }    
}'
```

The following response should be returned:

```json
{
  "id": "4f294b40-addc-4c39-840c-c17432680538",
  "fullyQualifiedVerificationMethodId": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "credential": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "http://localhost:8080/v1/credentials/4f294b40-addc-4c39-840c-c17432680538",
    "type": [
      "VerifiableCredential"
    ],
    "issuer": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
    "issuanceDate": "2023-08-02T20:42:19Z",
    "expirationDate": "2051-10-05T14:48:00.000Z",
    "credentialSubject": {
      "employedAt": "2022-08-20T13:20:10.000+0000",
      "givenName": "Alice",
      "id": "did:key:z6MkqcFHFXqzsYyDYrEUA2pVCfQGJz2rYoCZy5WWszzSW3o6"
    },
    "credentialSchema": {
      "id": "525358c8-1949-495e-becf-aa19d4da6a69",
      "type": "CredentialSchema2023"
    }
  },
  "credentialJwt": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6..."
}
```

The VC is signed and packaged as a JWT in the credentialJwt property. If you're interested, you can decode the JWT using a tool such as [jwt.io](https://jwt._io/). If you were to `issue` or transmit the credential to a holder you would just send this JWT value.

### Getting Credentials
Once you've created multiple credentials, you can view all credentials by making a GET request to `/v1/credentials`. This endpoint also supports three query parameters: `issuer`, `schema`, and `subject` which can be used mutually exclusively.

You can get a single credential by making a `GET` request to `/v1/credentials/{id}`.

<Divider type="slash" />

## Next Steps
- Learn more about [SSI Service](run-ssi-service) and how to run it.
- Check out the [SSI Console](ssi-console) which leverages the SSI Service to simplify credential issuance and verification via a web interface.
- Check out the [SSI SDK project](https://github.com/TBD54566975/ssi-sdk).