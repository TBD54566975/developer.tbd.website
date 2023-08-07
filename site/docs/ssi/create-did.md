---
sidebar_position: 2
title: Create a DID
hide_title: true
---

# Create a Decentralized Identifier (DID)

In the world of SSI, [DIDs](/docs/web5/learn/decentralized-identifiers) are used to identify any subject (e.g., a person, organization, thing, data model, abstract entity, etc.). In this tutorial we'll show you how to create a DID using the [SSI Service](https://github.com/TBD54566975/ssi-service). 

:::info
## Prerequisites

Follow guide to [Clone & Run SSI Service](run-ssi-service).
:::

## Create DID

To create your DID, run the following request:

```bash
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

A [DID document](/docs/glossary#did-document) will be returned, which includes the actual DID string in the `did.id` field:

```json
{
  "did": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/jws-2020/v1"
    ],
    //highlight-next-line
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

### DID Methods
The returned DID `did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw` is using `key` as its DID method because that's what we specified in our request:

```bash
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

Other supported DID methods are `ion` and `web`. Learn more about [DID methods](https://www.w3.org/TR/did-spec-registries/#did-methods).

### DID Key Types
Each DID has one or more keys, and each key has a [type](https://w3c-ccg.github.io/did-method-key/#format). In our request, we specified [Ed25519](https://ed25519.cr.yp.to/) as it is sufficient for generating digital signatures and is known for its high level of security and efficiency:

```bash
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

Some key types give you different properties and can be used for different purposes. Some keys are better for signing, others for encryption. Some are even provided by the government. There are variations on how they're constructed to give different security properties.