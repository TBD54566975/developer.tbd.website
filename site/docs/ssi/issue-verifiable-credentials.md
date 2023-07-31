---
title: Issue Verifiable Credentials
---

# Issue Verfiable Credentials (VC)

This is a walk through of the VC issuance process from the
perspective of the issuer. It is using a manual approach to issue verifiable
credentials and is **not intended to be used in production applications**.
We are providing this for educational purposes only.

## **Narrative**

Alice starts a new job at Acme and she'd like a Verifiable Credential (VC) proving her current employment status.

To request a VC, Alice logs into Acme's internal employee portal and clicks Employment Verification. Clicking the button will invoke the VC issuance process via the [SSI Service](https://github.com/TBD54566975/ssi-service) Acme is hosting.

Once the process has completed, a new Employment Status VC will be sent to Alice's identity wallet.

<Divider type="slash" />

## **Steps to Issue a Verifiable Credential**

1. **[SSI Service Setup](#ssi-service-setup)**

  - Clone & Run SSI Service
  - Create Decentralized Identifier (DID) for Credential Issuer (Acme)
  - Create or obtain DID for Credential Subject (Alice)
  - Create Credential Schema

2. **[Create Verifiable Credential](#create-verifiable-credential)**

<Divider type="dotted" />

## **SSI Service Setup**

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
  curl localhost:8080/readiness
{ 
  "status": { 
    "status": "ready",
    "message": "all service ready"
  },
  "serviceStatuses": {
    "credential": { 
      "status": "ready" 
    },
    "did": { 
      "status": "ready"
    }, "schema": {
      "status": "ready"
    } ...
  }
}
```

**b. Create Decentralized Identifier for Credential Issuer (Acme)**

In the world of [Self-Sovereign Identity](/docs/glossary#self-sovereign-identity-ssi) (SSI), [Decentralized Identifiers](/docs/glossary#decentralized-identifier-did) (DIDs) are used to identify any subject (e.g., a person, organization, thing, data model, abstract entity, etc.). In this scenario, both Acme and Alice are represented by their DIDs in the Verifiable Credential we create in step two.

:::info
  A **DID** is a W3C standard for a globally unique identifier that does not
  require a centralized registration authority. In contrast to typical,
  federated identifiers, DIDs have been designed so that they may be decoupled
  from centralized registries, identity providers, and certificate authorities.
:::info

Standard format of a DID:

![format of a Decentralized Identifier](/img/did_format.png 'format of a Decentralized Identifier')

To start the employment verification credential issuance flow we need to create a DID for Acme. We'll do so via the following command:

```sh
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

:::info
Each DID has one or more keys, and each key has a type. Some [keytypes]("https://w3c-ccg.github.io/did-method-key/#format") give you different properties and can be used for different purposes. Some keys are better for signing, others for encryption. Some are even provided by the government (NIST). There are variations on how they're constructed to give different security properties. You can use any number of DID types but we recommend Ed25519 as it's sufficient for most use cases.
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
  Important: Make sure to copy Acme's DID for the next step.
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

**d. Create Credential Schema**

:::info
  A [Credential Schema](https://www.w3.org/TR/vc-json-schema) is a document that defines the structure of a VC. It's based on the [json schema](https://json-schema.org) and shows which properties the issuer is going to use to create the VC.
:::

The `employedAt` property is a timestamp data type to define the date and time someone was employed at Acme.

Let's create a Credential Schema for Alice's Employment Status VC:
- Set `issuer` to Acme's DID.
- Set `verificationMethodId` set to the KID of the issuer's private key to sign the schema.
- Our `schema` object conforms to the Draft 2020-12 schema version, so set its `$schema` property to https://json-schema.org/draft/2020-12/schema.

```bash
curl -X PUT -d '{
  "issuer": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "verificationMethodId": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "name": "Acme",
  "schema": {
    "id": "string",
    "givenName": "string",
    "employedAt": "string",
    "$schema": "https://json-schema.org/draft/2020-12/schema"
  }
}' localhost:8080/v1/schemas
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
  Important: Make sure to copy your <b>Schema ID</b> for the next step.
:::

<Divider type="dotted" />

## **Create Verifiable Credential**

Now we have all three objects needed to create a VC:

- Acme's DID (issuer)
- Alice's DID (subject)
- Schema ID

**To create the VC, run:**

```bash
curl -X PUT -d '{
    "data": {
      "givenName": "Alice",
      "employedAt": "2022-08-20T13:20:10.000+0000"
    },
    "issuer": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
    "verificationMethodId": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
    "subject": "did:key:z6MkqcFHFXqzsYyDYrEUA2pVCfQGJz2rYoCZy5WWszzSW3o6",
    "@context": "https://www.w3.org/2018/credentials/v1",
    "expiry": "2051-10-05T14:48:00.000Z",
    "schemaId": "525358c8-1949-495e-becf-aa19d4da6a69"
}' http://localhost:8080/v1/credentials
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
    "id": "4f294b40-addc-4c39-840c-c17432680538",
    "type": [
      "VerifiableCredential"
    ],
    "issuer": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
    "issuanceDate": "2023-07-31T15:38:58Z",
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
  "credentialJwt": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa2plUEc2VUJ..."
}
```

:::note
  The value for <b>credentialJwt</b> can be decoded using a tool like [jwt.io](https://jwt._io/).
:::

If Alice has an identity wallet she will be able to store the credential and use it however she wishes.

<Divider type="slash" />

## Next Steps

- Learn more about [SSI Service](run-ssi-service) and how to run it.
- Check out the [SSI Console](ssi-console) which leverages the SSI Service to simplify credential issuance and verification via a web interface.
- Check out the [SSI SDK project](https://github.com/TBD54566975/ssi-sdk).