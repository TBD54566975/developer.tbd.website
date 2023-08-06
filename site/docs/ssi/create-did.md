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

**To create your DID, run the following request**

```sh
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

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

### DID Methods
The returned DID is using `key` as its DID method because that's what we specified in our request. Other supported DID methods are `ion` and `web`. Learn more about [DID methods](https://www.w3.org/TR/did-spec-registries/#did-methods).

### DID Keytypes
Each DID has one or more keys, and each key has a type. In our request, we specified `Ed25519` as it's sufficient for most use cases:

`curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key`

Some [keytypes](https://w3c-ccg.github.io/did-method-key/#format) give you different properties and can be used for different purposes. Some keys are better for signing, others for encryption. Some are even provided by the government (NIST). There are variations on how they're constructed to give different security properties.