---
slug: issue-verifiable-credential-manually
title: Manually Issue a Verifiable Credential
description: Learn how to issue a verifiable credential
authors:
  name: Bobbilee Hartman
tags: [verifiable credentials]
---

<head>
  <title>Manually Issue a Verifiable Credential</title>
  <meta property="og:description" content="Learn how to issue a verifiable credential" />
  <meta property="og:title" content="Manually Issue a Verifiable Credential" />
  <meta property="og:url" content='https://developer.tbd.website/blog/issue-verifiable-credential-manually' />
  <meta property="og:image" content="https://developer.tbd.website/img/tutorial_issue_vc.png" />
  
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:image" content="https://developer.tbd.website/img/tutorial_issue_vc.png" />
  <meta name="twitter:site" content="@tbddev" />
  <meta name="twitter:title" content="Manually Issue a Verifiable Credential" />
  <meta name="twitter:description" content="Learn how to issue a verifiable credential" />
  <link rel="apple-touch-icon" href="https://developer.tbd.website/img/tbd-fav-icon-main.png" />
</head>

## 

![Manually Issue a Verifiable Credential](/img/tutorial_issue_vc.png)

<blockquote>
  This is a walk through of the VC issuance process from the
  perspective of the issuer. It is using a manual approach to issue verifiable
  credentials and is <b>not intended to be used in production applications</b>.
  We are providing this for educational purposes only.
</blockquote>

## **Narrative**

Alice starts a new job at Acme and she'd like a Verifiable Credential (VC) proving her current employment status.

<!--truncate-->

To request a VC, Alice logs into Acme's internal employee portal and clicks Employment Verification. Clicking the button will invoke the VC issuance process via the [SSI Service](https://github.com/TBD54566975/ssi-service) Acme is hosting.

Once the process has completed, a new Employment Status VC will be sent to Alice's identity wallet.

<Divider type="dotted" />

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

```sh
git clone https://github.com/TBD54566975/ssi-service.git
```

<blockquote>
  The SSI Service is packaged as a Docker container and a Docker Compose file is
  included to make it simple to run the service locally. First make sure you
  have{' '}
  <a href="https://www.docker.com/products/docker-desktop/">
    Docker downloaded
  </a>{' '}
  and running on your desktop:
</blockquote>

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
{"status":"OK"}
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

<br />
<br />

**b. Create Decentralized Identifier for Credential Issuer (Acme)**

In the world of [Self-Sovereign Identity](https://developer.tbd.website/docs/glossary#self-sovereign-identity-ssi) (SSI), Decentralized Identifiers[https://developer.tbd.website/docs/glossary#decentralized-identifier-did] (DIDs) are used to identify any subject (e.g., a person, organization, thing, data model, abstract entity, etc.). In this scenario, both Acme and Alice are represented by their DIDs in the Verifiable Credential we create in step two.

<blockquote>
  A <b>DID</b> is a W3C standard for a globally unique identifier that does not
  require a centralized registration authority. In contrast to typical,
  federated identifiers, DIDs have been designed so that they may be decoupled
  from centralized registries, identity providers, and certificate authorities.
</blockquote>

Standard format of a DID:

![format of a Decentralized Identifier](/img/did_format.png 'format of a Decentralized Identifier')

To start the employment verification credential issuance flow we need to create a DID for Acme. We'll do so via the following command:

```sh
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

<blockquote>
  Each DID has one or more keys, and each key has a type. Some{' '}
  <a href="https://w3c-ccg.github.io/did-method-key/#format">
    <b>keytypes</b>
  </a>{' '}
  give you different properties and can be used for different purposes. Some
  keys are better for signing, others for encryption. Some are even provided by
  the government (NIST). There are variations on how they're constructed to give
  different security properties. You can use any number of DID types but we
  recommend Ed25519 as it's sufficient for most use cases.
</blockquote>

The following response should be returned:

```json
{
  "did": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/jws-2020/v1"
    ],
    //highlight-start
    "id": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
    //highlight-end
    "verificationMethod": [
      {
        "id": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
        "type": "JsonWebKey2020",
        "controller": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "rL0_XOkmyecUDV-F55vAnheBsRARvNs6D9GBgeFTErM",
          "alg": "EdDSA",
          "kid": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC"
        }
      },
      {
        "id": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6LSrwmvtfkZrTzNUUqUYqnE9qedLR7tk56wmXV8aJJEnyLF",
        "type": "JsonWebKey2020",
        "controller": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "X25519",
          "x": "4t5TLTw1UY5QDMFT-sprx3Pkdl-FFNvZaxtu74MjknQ",
          "alg": "X25519",
          "kid": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC"
        }
      }
    ],
    "authentication": [
      "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC"
    ],
    "assertionMethod": [
      "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC"
    ],
    "keyAgreement": [
      "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6LSrwmvtfkZrTzNUUqUYqnE9qedLR7tk56wmXV8aJJEnyLF"
    ],
    "capabilityInvocation": [
      "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC"
    ],
    "capabilityDelegation": [
      "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC"
    ]
  }
}
```

As you can see the DID returned here is using _key_ as its DID method. Learn more about other [DID methods](https://www.w3.org/TR/did-spec-registries/#did-methods) here.

<blockquote>
  Important: Make sure to copy Acme's DID for the next step.
</blockquote>

<br />

**c. Create DID for Credential Subject (Alice)**

Here's a generic DID you can use for Alice for testing purposes:

```sh
did:key:z6MkqcFHFXqzsYyDYrEUA2pVCfQGJz2rYoCZy5WWszzSW3o6
```

However, if you'd prefer to create a new DID for Alice, run:

```sh
curl -X PUT -d '{"keyType":"Ed25519"}' localhost:8080/v1/dids/key
```

<br />
<br />

**d. Create Credential Schema**

<blockquote>
  A{' '}
  <a href="https://w3c-ccg.github.io/vc-json-schemas/v1/index.html#credential-schema">
    <b>Credential Schema</b>
  </a>{' '}
  is a document that defines the structure of a VC. It's based on the{' '}
  <a href="https://json-schema.org">json schema</a> and shows which properties
  the issuer is going to use to create the VC.
</blockquote>

The `employedAt` property is a timestamp data type to define the date and time someone was employed at Acme.

Let's create a Credential Schema for Alice's Employment Status VC:
- Set `issuer` to Acme's DID.
- Set `issuerKid` set to the KID of the issuer's private key to sign the schema.
- Our `schema` object conforms to the Draft 2020-12 schema version, so set its `$schema` property to "https://json-schema.org/draft/2020-12/schema".

```bash
curl -X PUT -d '{
  "issuer": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
  "issuerKid": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
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
  "id": "6557d0a5-5e2e-427c-80fa-3c220c57648a",
  "type": "CredentialSchema2023",
  "credentialSchema": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3I1WllMMjRabTlDWWZwTFZvYTd5ZHNFUU5hb2htc1hDaWtZeEppaTd0ZHFDI3o2TWtyNVpZTDI0Wm05Q1lmcExWb2E3eWRzRVFOYW9obXNYQ2lrWXhKaWk3dGRxQyIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODYxNzM1MTIsImlzcyI6ImRpZDprZXk6ejZNa3I1WllMMjRabTlDWWZwTFZvYTd5ZHNFUU5hb2htc1hDaWtZeEppaTd0ZHFDIiwianRpIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3YxL3NjaGVtYXMvYzU0YzdjMjMtYTU0YS00NGRlLTg1Y2EtNWY2ODA5YjE1ZjJhIiwibmJmIjoxNjg2MTczNTEyLCJub25jZSI6IjUzMzRlMGYzLWMxOWEtNGQxZC1iYjc5LTIwY2E2NzZhYmExYSIsInN1YiI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC92MS9zY2hlbWFzL2M1NGM3YzIzLWE1NGEtNDRkZS04NWNhLTVmNjgwOWIxNWYyYSIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiaXNzdWVyIjoiIiwiaXNzdWFuY2VEYXRlIjoiIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiJGlkIjoiYzU0YzdjMjMtYTU0YS00NGRlLTg1Y2EtNWY2ODA5YjE1ZjJhIiwiJHNjaGVtYSI6Imh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMjAtMTIvc2NoZW1hIiwiYXBwTmFtZSI6InN0cmluZyIsIm5hbWUiOiJBY21lIiwidmFsaWRVbnRpbCI6InN0cmluZyJ9fX0.Gtk2uhnYr-pSmjvaVNTXIktODtY31iEOP1VcaC6PwQUsJRuvsqryXb9Qz5F-RXgAZ7e2MrkxYE7h6f6oBzf4Bw"
}
```

<br />

<blockquote>
  Important: Make sure to copy your <b>Schema ID</b> for the next step.
</blockquote>

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
    "issuer": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
    "issuerKid": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
    "subject": "did:key:z6MkqcFHFXqzsYyDYrEUA2pVCfQGJz2rYoCZy5WWszzSW3o6",
    "@context": "https://www.w3.org/2018/credentials/v1",
    "expiry": "2051-10-05T14:48:00.000Z",
    "schemaId": "6557d0a5-5e2e-427c-80fa-3c220c57648a"
}' http://localhost:8080/v1/credentials
```

The following response should be returned:

```json
{
  "id": "aba6dc95-d9ac-43e2-ad6d-4e5120c15a2d",
  "issuerKid": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC#z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
  "credential": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "aba6dc95-d9ac-43e2-ad6d-4e5120c15a2d",
    "type": [
      "VerifiableCredential"
    ],
    "issuer": "did:key:z6Mkr5ZYL24Zm9CYfpLVoa7ydsEQNaohmsXCikYxJii7tdqC",
    "issuanceDate": "2023-05-29T19:30:34Z",
    "expirationDate": "2051-10-05T14:48:00.000Z",
    "credentialSubject": {
      "employedAt": "2022-08-20T13:20:10.000+0000",
      "givenName": "Alice",
      "id": "did:key:z6MkqcFHFXqzsYyDYrEUA2pVCfQGJz2rYoCZy5WWszzSW3o6"
    },
    "credentialSchema": {
      "id": "6557d0a5-5e2e-427c-80fa-3c220c57648a",
      "type": "CredentialSchema2023"
    }
  },
  "credentialJwt": "eyJhbGciOiJFZERTQSIsImtpZCI...."
}
```

<blockquote>
  Note: the value for <b>credentialJwt</b> can be decoded using a tool like{' '}
  <a href="https://jwt.io/">
    <b>jwt.io</b>
  </a>
  .
</blockquote>

If Alice has an identity wallet she will be able to store the credential and use it however she wishes.