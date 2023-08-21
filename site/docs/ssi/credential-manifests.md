---
sidebar_position: 10
title: Credential Manifests
---

# Credential Manifests

## What is a Credential Manifest?
A [Credential Manifest](https://identity.foundation/credential-manifest/) is like a checklist of requirements needed to acquire a credential from an Issuer. Imagine you want to apply for a digital driver's license. To obtain this license, you need to know which pieces of information the license issuer (e.g., vehicle and driver's licensing agency or, in the U.S., the DMV) requires from you. The Credential Manifest is a JSON object that informs a User Agent (e.g., digital wallet) about the specific details it must submit to the Issuer on your behalf.

For instance, if you're applying for a digital driver's license, the Credential Manifest might instruct your wallet: "The user should provide their name, photo, and driving test results."

However, the Credential Manifest does not specify how the final digital driver's license will appear, the method the DMV uses to verify your information, or the communication process between your wallet and the DMV. Its primary role is to guide your wallet on the necessary data that it needs to submit on your behalf.

By the way, the "checklist" item mentioned in our example is called an Output Descriptor. This descriptor outlines the credentials that an Issuer, like the DMV, offers.

:::note
Credential Manifest is a draft specification being developed within the Decentralized Identity Foundation (DIF). The design work on the data model is ongoing and participants are encouraged to open issues or otherwise contribute to the [DIF-hosted GitHub repo](https://github.com/decentralized-identity/credential-manifest), whether as input to stable versions or as recommendations for future versions.
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
- `outputDescriptors` - Array of objects used to describe the Claims an Issuer is offering to a Holder.
- `verificationMethodId` (string) - The `id` of the [verificationMethod](https://www.w3.org/TR/did-core/#verification-methods) who's `privateKey` is stored in ssi-service. The `verificationMethod` must be part of the DID document associated with Issuer. The private key associated with the `verificationMethod`'s `publicKey` will be used to sign the issued credentials.

#### Optional
- `description`	(string) - Explains what the Manifest in question is generally offering in exchange for meeting its requirements.
- `issuerName` (string) - Human-readable name the Issuer wishes to be recognized by.
- `name` (string) - Summarizing title for the Manifest in question.
- `presentationDefinition` (object)	- Value of the presentation definition to use. Must be empty if `id` is present.
- `presentationDefinitionId` (string) - The `id` of the presentation definition created with the `PresentationDefinitions` API. Must be empty if value is present.

</details>

Issuers create and host Credential Manifests for the credentials they offer. Assuming the DMV wants to create a Credential Manifest for their digital driver's license credential, they can use the SSI Service to do so.

Here is the payload to submit to the `v1/manifests` endpoint. Notice the `outputDescriptors` section outlines the checklist of required information that the wallet must provide on behalf of the user who is requesting this credential.

```json
{
  "format": {
    "jwt_vc": {
      "alg": ["EdDSA"]
    }
  },
  "issuerDid": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3",
  "outputDescriptors": [
	{
      "id": "driver_license_output",
      "schema": "https://schema.org/EducationalOccupationalCredential",
      "display": {
        "title": {
          "path": ["$.name", "$.vc.name"],
          "schema": {"type": "string"},
          "fallback": "Digital Driver's License"
        },
        "subtitle": {
          "path": ["$.class", "$.vc.class"],
          "schema": {"type": "string"},
          "fallback": "Standard Automobile License"
        },
        "description": {
          "text": "License that certifies the holder has passed relevant tests and is authorized to drive an automobile."
        },
        "properties": [
          {
            "path": ["$.fullName", "$.vc.fullName"],
            "schema": {"type": "string"},
            "fallback": "No name provided.",
            "label": "Applicant's Full Name"
          },
          {
            "path": ["$.photo", "$.vc.photo"],
            "schema": {
              "type": "string",
              "format": "uri"
            },
            "fallback": "No photo provided.",
            "label": "Applicant's Photo"
          },
          {
            "path": ["$.drivingTestResults", "$.vc.drivingTestResults"],
            "schema": {
              "type": "string",
              "format": "uri"
            },
            "fallback": "Results not provided.",
            "label": "Driving Test Results"
          }
        ]
      }
    }
  ],
  "verificationMethodId": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3#z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
}
```

Save the JSON to a file (e.g., cm_dl.json) and make a `PUT` request to create the Credental Manifest:

```bash
curl -X PUT localhost:8080/v1/manifests -d @cm_dl.json
```

:::note
We saved the payload as a file because its special characters can be mistaken as variable indicators by the shell interpreter
:::

Upon success, the Credential Manifest will be returned in the form of a JSON object:

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
        "schema": "https://schema.org/EducationalOccupationalCredential",
        "display": {
          "title": {
            "path": [
              "$.name",
              "$.vc.name"
            ],
            "schema": {
              "type": "string"
            },
            "fallback": "Digital Driver's License"
          },
          "subtitle": {
            "path": [
              "$.class",
              "$.vc.class"
            ],
            "schema": {
              "type": "string"
            },
            "fallback": "Standard Automobile License"
          },
          "description": {
            "text": "License that certifies the holder has passed relevant tests and is authorized to drive an automobile."
          },
          "properties": [
            {
              "label": "Applicant's Full Name",
              "path": [
                "$.fullName",
                "$.vc.fullName"
              ],
              "schema": {
                "type": "string"
              },
              "fallback": "No name provided."
            },
            {
              "label": "Applicant's Photo",
              "path": [
                "$.photo",
                "$.vc.photo"
              ],
              "schema": {
                "type": "string",
                "format": "uri"
              },
              "fallback": "No photo provided."
            },
            {
              "label": "Driving Test Results",
              "path": [
                "$.drivingTestResults",
                "$.vc.drivingTestResults"
              ],
              "schema": {
                "type": "string",
                "format": "uri"
              },
              "fallback": "Results not provided."
            }
          ]
        }
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

Via a `GET` request to `v1/manifests`, the API will return all Manifests:

```bash
curl -X GET localhost:8080/v1/manifests
```

To return all Manifests associated with a specific Issuer, pass in Issuer's DID as the `id`:

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

To get a specific Manifest, submit a `GET` request to `/v1/manifests/{id}` and pass in the `id` of the Manifest:

```bash
curl -X GET localhost:8080/v1/manifests/8e612ac9-e450-45f8-ae57-f70c37d52441
```

If there is a matching Manifest, it will be returned as a JSON object:

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