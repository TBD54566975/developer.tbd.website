---
sidebar_position: 10
title: Credential Manifests
---

# Credential Manifests

## What is a Credential Manifest?
By definition, [Credential Manifests](https://identity.foundation/credential-manifest/) are a resource format that defines preconditional requirements, *Issuer* style preferences, and other facets *User Agents* (e.g digital wallets) utilize to help articulate and select the inputs necessary for processing and issuing a credential.

:::note
Credential Manifest is a draft specification being developed within the [Decentralized Identity Foundation](https://identity.foundation/) (DIF). The design work on the data model is ongoing and participants are encouraged to open issues or otherwise contribute at the [DIF-hosted Github repo](https://github.com/decentralized-identity/credential-manifest), whether as input to stable versions or as recommendations for future versions.
:::

## Manifest API Requests

Credential Manifests are JSON objects and most fields map to the definitions within the [DIF Credential Manifest spec](https://identity.foundation/credential-manifest/#general-composition).

Within the SSI Service [Manifest API](/docs/apis/ssi-service#tag/Manifests) you can create, list, read, or delete Credential Manifests.

### Create a Credential Manifest

<details>
<summary>Field Definitions</summary>

#### Required

- `format` (object) - Formats that the Issuer can support when issuing the credential. At least one needs to be set. We currently only support `jwt_vc` for issuance. See [claim format registry](https://identity.foundation/claim-format-registry/#registry) for the definition.
- `issuerDid` (string) - DID that identifies who the Issuer of the credential(s) will be.
- `outputDescriptors` - Array of objects `manifest.OutputDescriptor` as defined in the Credential Manifest [Output Descripter](https://identity.foundation/credential-manifest/#output-descriptor) spec.
- `verificationMethodId` (string) - The `id` of the [verificationMethod](https://www.w3.org/TR/did-core/#verification-methods) who's `privateKey` is stored in ssi-service. The `verificationMethod` must be part of the DID document associated with Issuer. The private key associated with the `verificationMethod`'s `publicKey` will be used to sign the issued credentials.

#### Optional
- `description`	(string) - Explains what the Manifest in question is generally offering in exchange for meeting its requirements.
- `issuerName` (string) - Human-readable name the Issuer wishes to be recognized by.
- `name` (string) - Summarizing title for the Manifest in question.
- `presentationDefinition` (object)	- Value of the presentation definition to use. Must be empty if `id` is present.
- `presentationDefinitionId` (string) - The `id` of the presentation definition created with the `PresentationDefinitions` API. Must be empty if value is present.

</details>

Via a `PUT` request to `v1/manifests`, pass in the following required fields to create a Manifest.

```bash
curl -X PUT localhost:8080/v1/manifests -d '{
  "format": {
    "jwt_vc": {
      "alg": [
        "EdDSA"
      ]
    }
  },
  "issuerDid": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3",
  "outputDescriptors": [
    {
      "id": "driver_license_output",
      "schema": "https://schema.org/EducationalOccupationalCredential"
    }
  ],
  "verificationMethodId": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3#z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
}'
```

Upon success, you'll see the following response:

```json
{
  "credential_manifest": {
    "id": "8e612ac9-e450-45f8-ae57-f70c37d52441",
    "spec_version": "https://identity.foundation/credential-manifest/spec/v1.0.0/",
    "issuer": {
      "id": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
    },
    "output_descriptors": [
      {
        "id": "driver_license_output",
        "schema": "https://schema.org/EducationalOccupationalCredential"
      }
    ],
    "format": {
      "jwt_vc": {
        "alg": [
          "EdDSA"
        ]
      }
    }
  }
}
```

### List Credential Manifests

Via a `GET` request to `v1/manifests`, the API will return all Manifests.

Return all Manifests:

```bash
curl -X GET localhost:8080/v1/manifests
```

Return all Manifests associated with a specific Issuer `id`:

```bash
curl -X GET localhost:8080/v1/manifests -d '{
  "issuer": {
    "id": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
  }
}'
```

Upon success, you'll see the following response:

```json
{
  "manifests": [
    {
      "id": "8e612ac9-e450-45f8-ae57-f70c37d52441",
      "credential_manifest": {
        "id": "8e612ac9-e450-45f8-ae57-f70c37d52441",
        "spec_version": "https://identity.foundation/credential-manifest/spec/v1.0.0/",
        "issuer": {
          "id": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
        },
        "output_descriptors": [
          {
            "id": "driver_license_output",
            "schema": "https://schema.org/EducationalOccupationalCredential"
          }
        ],
        "format": {
          "jwt_vc": {
            "alg": [
              "EdDSA"
            ]
          }
        }
      }
    }
  ]
}
```

### Get a Credential Manifest

Via a `GET` request to `/v1/manifests/{id}`, pass in the `id` of the Manifest you wish to read.

```bash
curl -X GET localhost:8080/v1/manifests/8e612ac9-e450-45f8-ae57-f70c37d52441
```

If there is a matching Manifest `id`, you'll see the following response:

```json
{
  "id": "8e612ac9-e450-45f8-ae57-f70c37d52441",
  "credential_manifest": {
    "id": "8e612ac9-e450-45f8-ae57-f70c37d52441",
    "spec_version": "https://identity.foundation/credential-manifest/spec/v1.0.0/",
    "issuer": {
      "id": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
    },
    "output_descriptors": [
      {
        "id": "driver_license_output",
        "schema": "https://schema.org/EducationalOccupationalCredential"
      }
    ],
    "format": {
      "jwt_vc": {
        "alg": [
          "EdDSA"
        ]
      }
    }
  }
}
```

### Delete a Credential Manifest

Via a `DELETE` request to `v1/manifests/{id}`, pass in the `id` of the Manifest you wish to delete.

```bash
curl -X DELETE localhost:8080/v1/manifests/8e612ac9-e450-45f8-ae57-f70c37d52441
```