---
sidebar_position: 3
title: Create a DID
hide_title: true
---

:::warning
This project is not actively being maintained. If you are interested in adopting it, please [open an issue](https://github.com/TBD54566975/ssi-service).
:::

# Create a Decentralized Identifier (DID)

In the world of SSI, [DIDs](/docs/web5/decentralized-identifiers/what-are-dids) are used to identify any subject (e.g., a person, organization, thing, data model, abstract entity, etc.). In this tutorial we'll show you how to create a DID using the [SSI Service](https://github.com/TBD54566975/ssi-service). 

:::info
## Prerequisites

Follow guide to [Clone & Run SSI Service](run-ssi-service).
:::

## Create DID

To create your DID, run the following request:

```bash
curl -X PUT localhost:8080/v1/dids/key -d '{"keyType":"Ed25519"}'
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
curl -X PUT localhost:8080/v1/dids/key -d '{"keyType":"Ed25519"}'
```

<details>
<summary>Other supported DID methods</summary>

SSI Service also supports `ion` and `web` DID methods.

** Create DID using `ion` DID method:**

```bash
curl -X PUT localhost:8080/v1/dids/ion -d '{"keyType":"Ed25519"}'
```

<details>
<summary>Example Response</summary>

```json
{
  "did": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      {
        "@base": "did:ion:EiC3OsN-t0aPBr1ofd8G5F3jJiqEbzn5WAJZGkplSZqecA"
      }
    ],
    "id": "did:ion:EiC3OsN-t0aPBr1ofd8G5F3jJiqEbzn5WAJZGkplSZqecA",
    "verificationMethod": [
      {
        "id": "#719a47d1-ae9b-4794-86df-a1cca70f5d51",
        "type": "Ed25519",
        "controller": "did:ion:EiC3OsN-t0aPBr1ofd8G5F3jJiqEbzn5WAJZGkplSZqecA",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "eJQx_gSzD6PYjMbXYS0c-iZgQXs_VR91K-6bbFSOudY",
          "alg": "EdDSA",
          "kid": "226a15b6-3893-4e8e-87b5-001fe5139999"
        }
      }
    ],
    "authentication": [
      "#719a47d1-ae9b-4794-86df-a1cca70f5d51"
    ],
    "assertionMethod": [
      "#719a47d1-ae9b-4794-86df-a1cca70f5d51"
    ]
  }
}
```

</details>

** Create DID using `web` DID method:**

The [`did:web` Method Specification](https://w3c-ccg.github.io/did-method-web/) describes a DID method that uses an existing web domain to host and establish trust for a DID Document.

It relies on the controller of an existing domain to host a custom file with the contents of the DID Document they want to expose. The SSI Service facilitates creation of a `did:web`, which you then must update on the domain you control.

:::info
**Prerequisites**
* You control an existing domain (e.g. like `https://www.example.com`).
* You are able to host files in a path within that origin (e.g. you can host the file returned by `https://www.example.com/.well-known/did.json`).
:::

```bash
curl -X PUT 'localhost:3000/v1/dids/web' -d '{
  "keyType": "Ed25519",
  "options": {
    "didWebId": "did:web:example.com"
  }
}'
```

<details>
<summary>Example Response</summary>

```json
{
  "did": {
    "@context": "https://www.w3.org/ns/did/v1",
    "id": "did:web:example.com",
    "verificationMethod": [
      {
        "id": "did:web:example.com",
        "type": "JsonWebKey2020",
        "controller": "did:web:example.com#owner",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "TuAM4Ro4q5_cFMarCHmOm-1c7NaxBxvoEe7-x7K7xhw",
          "alg": "EdDSA",
          "kid": "did:web:example.com#owner"
        }
      }
    ],
    "authentication": [
      [
        "did:web:example.com#owner"
      ]
    ],
    "assertionMethod": [
      [
        "did:web:example.com#owner"
      ]
    ]
  }
}
```

</details>

For a `did:web` DID, you then have to ensure that the URL `<domain_name>/.well-known/did.json` resolves to the content of the value of the DID property from the response. In our example, we would have to make sure that the URL https://example.com/.well-known/did.json returns the JSON object described in the Example Response above.

To ensure that the SSI Service considers the created did:web to be valid, let's make a `GET` request:

```bash
curl 'localhost:3000/v1/dids/resolver/did:web:example.com'
```

<details>
<summary>Example Response</summary>

```bash
{
  "didResolutionMetadata": {
    "ContentType": "application/json"
  },
  "didDocument": {
    "@context": "https://www.w3.org/ns/did/v1",
    "id": "did:web:example.com",
    "verificationMethod": [
      {
        "id": "did:web:example.com",
        "type": "JsonWebKey2020",
        "controller": "did:web:example.com#owner",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "TuAM4Ro4q5_cFMarCHmOm-1c7NaxBxvoEe7-x7K7xhw",
          "alg": "EdDSA",
          "kid": "did:web:example.com#owner"
        }
      }
    ],
    "authentication": [
      [
        "did:web:example.com#owner"
      ]
    ],
    "assertionMethod": [
      [
        "did:web:example.com#owner"
      ]
    ]
  },
  "didDocumentMetadata": {}
}
```

</details>


Learn more about [DID methods](https://www.w3.org/TR/did-spec-registries/#did-methods).

</details>

### DID Key Types
Each DID has one or more keys, and each key has a [type](https://w3c-ccg.github.io/did-method-key/#format). In our request, we specified [Ed25519](https://ed25519.cr.yp.to/) as it is sufficient for generating digital signatures and is known for its high level of security and efficiency:

```bash
curl -X PUT localhost:8080/v1/dids/key -d '{"keyType":"Ed25519"}'
```

Some key types give you different properties and can be used for different purposes. Some keys are better for signing, others for encryption. Some are even provided by the government. There are variations on how they're constructed to give different security properties.
