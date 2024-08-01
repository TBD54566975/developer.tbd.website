---
sidebar_position: 10
title: Credential Manifests
---

:::warning
This project is not actively being maintained. If you are interested in adopting it, please [open an issue](https://github.com/TBD54566975/ssi-service).
:::

# Credential Manifests

## What is a Credential Manifest?
A [Credential Manifest](https://identity.foundation/credential-manifest/) is like a checklist of requirements needed to acquire a credential from an Issuer. Take, for instance, the process of acquiring a digital driver's license. To obtain this license, you'd need to know which pieces of information the license issuer (e.g., vehicle and driver's licensing agency or, in the U.S., the DMV) requires from you. The Credential Manifest, encapsulated as a JSON object, informs a [User Agent](/docs/web5/decentralized-web-nodes/agents) (e.g., digital wallet) of the specific data it must submit to the Issuer on your behalf.

In our digital driver's license example, the Credential Manifest might instruct your wallet: "The user must provide their name, photo, and driving test results."

However, the Credential Manifest does not specify the content of the eventual digital driver's license, the method the DMV uses to verify your information, or the communication process between your wallet and the DMV. Its primary role is to guide your wallet on the necessary data that it needs to submit on your behalf.

By the way, the items of the checklist in our example are called **Input Descriptors**. They describe the information that is required.

:::note
Credential Manifest is a [draft specification](https://identity.foundation/credential-manifest/) being developed within the Decentralized Identity Foundation (DIF). The design work on the data model is ongoing and participants are encouraged to open issues or otherwise contribute to the [project](https://github.com/decentralized-identity/credential-manifest), whether as input to stable versions or as recommendations for future versions.
:::

## Manifest API Requests

Credential Manifests are JSON objects and most fields map to the definitions within the [DIF Credential Manifest spec](https://identity.foundation/credential-manifest/#general-composition).

Within the SSI Service [Manifest API](/docs/apis/ssi-service#tag/Manifests) you can create, list, read, or delete Credential Manifests.

### Create a Credential Manifest

Issuers create and host Credential Manifests for the credentials they offer. Assuming the DMV wants to create a Credential Manifest for their digital driver's license credential, they can use the SSI Service to do so.


<details>
<summary>Field Definitions</summary>

#### Required

- `format` (object) - Formats that the Issuer can support when issuing the credential. At least one needs to be set. We currently only support `jwt_vc` for issuance. 
- `issuerDid` (string) - DID that identifies who the Issuer of the credential(s) will be.
- `outputDescriptors` - Array of objects used to describe the Claims an Issuer is offering to a Holder.
- `verificationMethodId` (string) - The `id` of the [verificationMethod](https://www.w3.org/TR/did-core/#verification-methods) whose `privateKey` is stored in SSI Service. The `verificationMethod` must be part of the DID document associated with Issuer. The private key associated with the `verificationMethod`'s `publicKey` will be used to sign the issued credentials.

#### Optional
- `description`	(string) - Explains what the Manifest is generally offering in exchange for meeting its requirements.
- `issuerName` (string) - Human-readable name the Issuer wishes to be recognized by.
- `name` (string) - Human-readable name for the Manifest.
- `presentationDefinition` (object)	- Outlines the required data needed from the Subject.


</details>

Here is the payload to submit to the `v1/manifests` endpoint. Notice the `input_descriptors` section outlines the checklist of required information that the wallet must provide on behalf of the user who is requesting this credential.

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
      "id": "ca_driver_license_output",
      "schema": "https://schema.org/EducationalOccupationalCredential"
    }
  ],
  "presentationDefinition": {
    "id": "ca_driver_license_input",
    //highlight-start
    "input_descriptors": [
      {
        "id": "required_data",
        "constraints": {
          "fields": [
            {
              "path": [
                "$.credentialSubject.fullName",
                "$.credentialSubject.photo",
                "$.credentialSubject.drivingTestResults"
              ]
            }
          ]
        }
      }
    ]
    //highlight-end
  },
  "verificationMethodId": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3#z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
}
```

Save the JSON above to a file (e.g., cm_dl.json) and make a `PUT` request to create the Credential Manifest:

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
    "id": "31dbc01e-f2f9-476d-8b8c-20168f053c1d",
    "spec_version": "https://identity.foundation/credential-manifest/spec/v1.0.0/",
    "issuer": {
      "id": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
    },
    "output_descriptors": [
      {
        "id": "ca_driver_license_output",
        "schema": "https://schema.org/EducationalOccupationalCredential"
      }
    ],
    "format": {
      "jwt_vc": {
        "alg": [
          "EdDSA"
        ]
      }
    },
    "presentation_definition": {
      "id": "ca_driver_license_input",
      "input_descriptors": [
        {
          "id": "required_data",
          "constraints": {
            "fields": [
              {
                "path": [
                  "$.credentialSubject.fullName",
                  "$.credentialSubject.photo",
                  "$.credentialSubject.drivingTestResults"
                ]
              }
            ]
          }
        }
      ]
    }
  }
}
```

### List Credential Manifests

To obtain a list of all Credential Manifests, make a `GET` request to `v1/manifests`:

```bash
curl -X GET localhost:8080/v1/manifests
```

To obtain a list all Manifests associated with a specific Issuer, pass in the Issuer's DID as the `id`:

```bash
curl -X GET localhost:8080/v1/manifests -d '{
  "issuer": {
    "id": "did:key:z6MkkZDjunoN4gyPMx5TSy7Mfzw22D2RZQZUcx46bii53Ex3"
  }
}'
```


### Get a Credential Manifest

To get a specific Manifest, submit a `GET` request to `/v1/manifests/{id}` and pass in the `id` of the Manifest:

```bash
curl -X GET localhost:8080/v1/manifests/31dbc01e-f2f9-476d-8b8c-20168f053c1d
```


### Delete a Credential Manifest

To delete an existing manifest, make a `DELETE` request to `v1/manifests/{id}` passing in the `id` of the Manifest you wish to delete:

```bash
curl -X DELETE localhost:8080/v1/manifests/31dbc01e-f2f9-476d-8b8c-20168f053c1d
```
