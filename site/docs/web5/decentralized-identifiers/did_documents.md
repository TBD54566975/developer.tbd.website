---
sidebar_position: 3
title: DID Documents
---

In this guide, you'll learn about DID Documents and how they're used in connection to a DID subject.

:::info
## TL;DR:
* DID (Decentralized Identifier): a unique, decentralized user ID.
* DID Document: a user's extended profile, connected to their DID.
:::

## What is a DID Document
A [DID](/docs/web5/decentralized-identifiers/what-are-dids) essentially acts as a URI that associates the subject of the DID (the person, company, or object being identified) with a DID document that lives off-chain in a decentralized storage system such as IPFS.

A DID Document is a mini-profile for its DID subject. They are JSON files that serve as a self-contained representation of the DID and provides metadata and cryptographic material associated with the DID. 

DID Documents describe how to interact with the DID subject and contains information that allows others to verify the authenticity and integrity of the DID's information. The document includes things like the DID subject's public keys, authentication and verification methods, as well as service endpoints, such as [DWNs](/docs/web5/decentralized-web-nodes/what-are-dwns), that reference the locations of the subject’s data.

## How to Retrieve a DID Document
Given a person attempts to use their DID within an app to identify themselves, the app would [resolve their DID](/docs/web5/decentralized-identifiers/how-to-resolve-a-did) to find their mini-profile (the DID document).


```json
{
  "id": "did:ion:EiBMIz-Hhom0_8EUaWLuscD08Riy0Fo5vp8mCXxszy5Gfg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ3endxSEY3cEtzS3dkR3NBNkhpS0dyUGRaQ0FoYW9oeGxJS1JraDhGWjZNIiwieSI6ImVsY0tHbnpMTjNsVnpYWHV6YUk3WWFrWVI3MXBxNnBMbzNUNFRVaERJYXMifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJuOVRDSEtNZS04Z1J6cl9YMC1XZVF1VzlyM1VGNlhZd1pscEtZTnVVdzhBIiwieSI6Im5UTEgxUS1OR05OMy0ySkxyWW9PMnNDSEdUcndpMXVqR0dNSEdKV3ZSNVkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24xIiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRDJYTV9mRzQ2eFI4NDJVTjRzMTFOTU80LTEzbkwxdXdUVko1cGVVWFFicmcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUJWLVQyU1dwWGI2bldwVlpyQXUwYTF3Q2hQdS1tRXJMaWtORWpSZ3VQa2hBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlBcGRSR1U4X2JkQ3oyZFpfR1R3QnZGOWw1ZXNRUWFqbXRjN3REdzcxTUUyQSJ9fQ",
  "@context": [
    "https://www.w3.org/ns/did/v1",
    {
      "@base": "did:ion:EiBMIz-Hhom0_8EUaWLuscD08Riy0Fo5vp8mCXxszy5Gfg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ3endxSEY3cEtzS3dkR3NBNkhpS0dyUGRaQ0FoYW9oeGxJS1JraDhGWjZNIiwieSI6ImVsY0tHbnpMTjNsVnpYWHV6YUk3WWFrWVI3MXBxNnBMbzNUNFRVaERJYXMifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJuOVRDSEtNZS04Z1J6cl9YMC1XZVF1VzlyM1VGNlhZd1pscEtZTnVVdzhBIiwieSI6Im5UTEgxUS1OR05OMy0ySkxyWW9PMnNDSEdUcndpMXVqR0dNSEdKV3ZSNVkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24xIiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRDJYTV9mRzQ2eFI4NDJVTjRzMTFOTU80LTEzbkwxdXdUVko1cGVVWFFicmcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUJWLVQyU1dwWGI2bldwVlpyQXUwYTF3Q2hQdS1tRXJMaWtORWpSZ3VQa2hBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlBcGRSR1U4X2JkQ3oyZFpfR1R3QnZGOWw1ZXNRUWFqbXRjN3REdzcxTUUyQSJ9fQ"
    }
  ],
  "service": [
    {
      "id": "#dwn",
      "type": "DecentralizedWebNode",
      "serviceEndpoint": {
        "messageAuthorizationKeys": ["#authz"],
        "nodes": ["https://dwn.tbddev.org/dwn1", "https://dwn.tbddev.org/dwn2"],
        "recordEncryptionKeys": ["#enc"]
      }
    }
  ],
  "verificationMethod": [
    {
      "id": "#authz",
      "controller": "did:ion:EiBMIz-Hhom0_8EUaWLuscD08Riy0Fo5vp8mCXxszy5Gfg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ3endxSEY3cEtzS3dkR3NBNkhpS0dyUGRaQ0FoYW9oeGxJS1JraDhGWjZNIiwieSI6ImVsY0tHbnpMTjNsVnpYWHV6YUk3WWFrWVI3MXBxNnBMbzNUNFRVaERJYXMifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJuOVRDSEtNZS04Z1J6cl9YMC1XZVF1VzlyM1VGNlhZd1pscEtZTnVVdzhBIiwieSI6Im5UTEgxUS1OR05OMy0ySkxyWW9PMnNDSEdUcndpMXVqR0dNSEdKV3ZSNVkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24xIiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRDJYTV9mRzQ2eFI4NDJVTjRzMTFOTU80LTEzbkwxdXdUVko1cGVVWFFicmcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUJWLVQyU1dwWGI2bldwVlpyQXUwYTF3Q2hQdS1tRXJMaWtORWpSZ3VQa2hBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlBcGRSR1U4X2JkQ3oyZFpfR1R3QnZGOWw1ZXNRUWFqbXRjN3REdzcxTUUyQSJ9fQ",
      "type": "JsonWebKey2020",
      "publicKeyJwk": {
            "crv": "secp256k1",
            "kty": "EC",
            "x": "wzwqHF7pKsKwdGsA6HiKGrPdZCAhaohxlIKRkh8FZ6M",
            "y": "elcKGnzLN3lVzXXuzaI7YakYR71pq6pLo3T4TUhDIas"
        }
    },
    {
      "id": "#enc",
      "controller": "did:ion:EiBMIz-Hhom0_8EUaWLuscD08Riy0Fo5vp8mCXxszy5Gfg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ3endxSEY3cEtzS3dkR3NBNkhpS0dyUGRaQ0FoYW9oeGxJS1JraDhGWjZNIiwieSI6ImVsY0tHbnpMTjNsVnpYWHV6YUk3WWFrWVI3MXBxNnBMbzNUNFRVaERJYXMifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJuOVRDSEtNZS04Z1J6cl9YMC1XZVF1VzlyM1VGNlhZd1pscEtZTnVVdzhBIiwieSI6Im5UTEgxUS1OR05OMy0ySkxyWW9PMnNDSEdUcndpMXVqR0dNSEdKV3ZSNVkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24xIiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRDJYTV9mRzQ2eFI4NDJVTjRzMTFOTU80LTEzbkwxdXdUVko1cGVVWFFicmcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUJWLVQyU1dwWGI2bldwVlpyQXUwYTF3Q2hQdS1tRXJMaWtORWpSZ3VQa2hBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlBcGRSR1U4X2JkQ3oyZFpfR1R3QnZGOWw1ZXNRUWFqbXRjN3REdzcxTUUyQSJ9fQ",
      "type": "JsonWebKey2020",
      "publicKeyJwk": {
            "crv": "secp256k1",
            "kty": "EC",
            "x": "n9TCHKMe-8gRzr_X0-WeQuW9r3UF6XYwZlpKYNuUw8A",
            "y": "nTLH1Q-NGNN3-2JLrYoO2sCHGTrwi1ujGGMHGJWvR5Y"
        }
    }
  ]
}
```

:::note
Outside of Web5, you can use [DIF's Universal Resolver](https://dev.uniresolver.io/) to resolve DIDs.
:::

## Properties of a DID Document
The key components of a DID Document are:

**id**: A unique identifier of the DID Document, which is the same as the DID it represents.

```json
"id": "did:ion:EiBMIz-Hhom0_8EUaWLuscD08Riy0Fo5vp8mCXxszy5Gfg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ3endxSEY3cEtzS3dkR3NBNkhpS0dyUGRaQ0FoYW9oeGxJS1JraDhGWjZNIiwieSI6ImVsY0tHbnpMTjNsVnpYWHV6YUk3WWFrWVI3MXBxNnBMbzNUNFRVaERJYXMifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJuOVRDSEtNZS04Z1J6cl9YMC1XZVF1VzlyM1VGNlhZd1pscEtZTnVVdzhBIiwieSI6Im5UTEgxUS1OR05OMy0ySkxyWW9PMnNDSEdUcndpMXVqR0dNSEdKV3ZSNVkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24xIiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRDJYTV9mRzQ2eFI4NDJVTjRzMTFOTU80LTEzbkwxdXdUVko1cGVVWFFicmcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUJWLVQyU1dwWGI2bldwVlpyQXUwYTF3Q2hQdS1tRXJMaWtORWpSZ3VQa2hBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlBcGRSR1U4X2JkQ3oyZFpfR1R3QnZGOWw1ZXNRUWFqbXRjN3REdzcxTUUyQSJ9fQ"
```

**@context**: A context definition for the DID document. It has two elements: the standard DID context definition, and an object that provides a base identifier. 

```json
  "@context": [
    "https://www.w3.org/ns/did/v1",
    {
      "@base": "did:ion:EiBMIz-Hhom0_8EUaWLuscD08Riy0Fo5vp8mCXxszy5Gfg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ3endxSEY3cEtzS3dkR3NBNkhpS0dyUGRaQ0FoYW9oeGxJS1JraDhGWjZNIiwieSI6ImVsY0tHbnpMTjNsVnpYWHV6YUk3WWFrWVI3MXBxNnBMbzNUNFRVaERJYXMifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJuOVRDSEtNZS04Z1J6cl9YMC1XZVF1VzlyM1VGNlhZd1pscEtZTnVVdzhBIiwieSI6Im5UTEgxUS1OR05OMy0ySkxyWW9PMnNDSEdUcndpMXVqR0dNSEdKV3ZSNVkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24xIiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRDJYTV9mRzQ2eFI4NDJVTjRzMTFOTU80LTEzbkwxdXdUVko1cGVVWFFicmcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUJWLVQyU1dwWGI2bldwVlpyQXUwYTF3Q2hQdS1tRXJMaWtORWpSZ3VQa2hBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlBcGRSR1U4X2JkQ3oyZFpfR1R3QnZGOWw1ZXNRUWFqbXRjN3REdzcxTUUyQSJ9fQ"
    }
  ]
```

**service**: Means of communicating or interacting with the DID subject. Each service entry contains an ID, type, and service endpoint URI. In this case, there is one service which is DWN. The `serviceEndpoint` specifies URIs to the DID subject's web nodes - which is how the app knows where the user's data stores reside.

```js
  "service": [
    {
      "id": "#dwn",
      "type": "DecentralizedWebNode",
      "serviceEndpoint": {
        "messageAuthorizationKeys": ["#authz"],
        "nodes": ["https://dwn.tbddev.org/dwn1", "https://dwn.tbddev.org/dwn2"],
        "recordEncryptionKeys": ["#enc"]
      }
    }
  ]
```

**verificationMethod**: An array of methods for verifying the DID subject is who they say they are. In this example, there are two methods: `authz` and `enc`. Both methods contain:

* **id**: Identifier of the verification method within this DID document
* **controller**: A reference to the DID that controls this verification method
* **type**: The type of key (in this case, JsonWebKey2020)
* **publicKeyJwk**: A JSON Web Key (JWK) representation of the cryptographic public key in a format suitable for use in web-based protocols and applications

```json
  "verificationMethod": [
    {
      "id": "#authz",
      "controller": "did:ion:EiBMIz-Hhom0_8EUaWLuscD08Riy0Fo5vp8mCXxszy5Gfg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ3endxSEY3cEtzS3dkR3NBNkhpS0dyUGRaQ0FoYW9oeGxJS1JraDhGWjZNIiwieSI6ImVsY0tHbnpMTjNsVnpYWHV6YUk3WWFrWVI3MXBxNnBMbzNUNFRVaERJYXMifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJuOVRDSEtNZS04Z1J6cl9YMC1XZVF1VzlyM1VGNlhZd1pscEtZTnVVdzhBIiwieSI6Im5UTEgxUS1OR05OMy0ySkxyWW9PMnNDSEdUcndpMXVqR0dNSEdKV3ZSNVkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24xIiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRDJYTV9mRzQ2eFI4NDJVTjRzMTFOTU80LTEzbkwxdXdUVko1cGVVWFFicmcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUJWLVQyU1dwWGI2bldwVlpyQXUwYTF3Q2hQdS1tRXJMaWtORWpSZ3VQa2hBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlBcGRSR1U4X2JkQ3oyZFpfR1R3QnZGOWw1ZXNRUWFqbXRjN3REdzcxTUUyQSJ9fQ",
      "type": "JsonWebKey2020",
      "publicKeyJwk": {
            "crv": "secp256k1",
            "kty": "EC",
            "x": "wzwqHF7pKsKwdGsA6HiKGrPdZCAhaohxlIKRkh8FZ6M",
            "y": "elcKGnzLN3lVzXXuzaI7YakYR71pq6pLo3T4TUhDIas"
        }
    },
    {
      "id": "#enc",
      "controller": "did:ion:EiBMIz-Hhom0_8EUaWLuscD08Riy0Fo5vp8mCXxszy5Gfg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJhdXRoeiIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ3endxSEY3cEtzS3dkR3NBNkhpS0dyUGRaQ0FoYW9oeGxJS1JraDhGWjZNIiwieSI6ImVsY0tHbnpMTjNsVnpYWHV6YUk3WWFrWVI3MXBxNnBMbzNUNFRVaERJYXMifSwicHVycG9zZXMiOlsiYXV0aGVudGljYXRpb24iXSwidHlwZSI6Ikpzb25XZWJLZXkyMDIwIn0seyJpZCI6ImVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJuOVRDSEtNZS04Z1J6cl9YMC1XZVF1VzlyM1VGNlhZd1pscEtZTnVVdzhBIiwieSI6Im5UTEgxUS1OR05OMy0ySkxyWW9PMnNDSEdUcndpMXVqR0dNSEdKV3ZSNVkifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7Im1lc3NhZ2VBdXRob3JpemF0aW9uS2V5cyI6WyIjYXV0aHoiXSwibm9kZXMiOlsiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24xIiwiaHR0cHM6Ly9kd24udGJkZGV2Lm9yZy9kd24yIl0sInJlY29yZEVuY3J5cHRpb25LZXlzIjpbIiNlbmMiXX0sInR5cGUiOiJEZWNlbnRyYWxpemVkV2ViTm9kZSJ9XX19XSwidXBkYXRlQ29tbWl0bWVudCI6IkVpRDJYTV9mRzQ2eFI4NDJVTjRzMTFOTU80LTEzbkwxdXdUVko1cGVVWFFicmcifSwic3VmZml4RGF0YSI6eyJkZWx0YUhhc2giOiJFaUJWLVQyU1dwWGI2bldwVlpyQXUwYTF3Q2hQdS1tRXJMaWtORWpSZ3VQa2hBIiwicmVjb3ZlcnlDb21taXRtZW50IjoiRWlBcGRSR1U4X2JkQ3oyZFpfR1R3QnZGOWw1ZXNRUWFqbXRjN3REdzcxTUUyQSJ9fQ",
      "type": "JsonWebKey2020",
      "publicKeyJwk": {
            "crv": "secp256k1",
            "kty": "EC",
            "x": "n9TCHKMe-8gRzr_X0-WeQuW9r3UF6XYwZlpKYNuUw8A",
            "y": "nTLH1Q-NGNN3-2JLrYoO2sCHGTrwi1ujGGMHGJWvR5Y"
        }
    }
  ]
```

These are just some of the common fields you might encounter in a DID Document. The structure and contents of a DID Document can vary depending on the specific [DID method](/docs/glossary#did-method) being used and the requirements of the application or use case.

## DID Document Management
Managing a DID Document is essential to maintain its integrity, relevance, and security. A DID subject can indicate to their authorized [user agent](/docs/web5/decentralized-web-nodes/agents) (e.g., wallet) a change they'd like to make, and that agent will determine if the DID Document needs to be modified, and if so, will do so on the subject's behalf. Here are a few possible actions:

**Update**

As the circumstances of the DID subject change, it's necessary to update the DID Document. For instance, let's say a DID subject has a new DWN and wants to add it to their DID Document as a service endpoint, or perhaps has changed hosting for one of their DWN nodes. This change needs to be reflected in the DID Document.

**Revoke**

At times, it might be essential to revoke certain keys or service endpoints, making them inactive.

**Delete**

Although not always advisable due to the immutable nature of some ledgers, a DID Document might sometimes need to be deleted or deactivated.
