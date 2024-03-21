---
sidebar_position: 5
title: Credential Issuance Service
---

:::warning
This project is not actively being maintained. If you are interested in adopting it, please [open an issue](https://github.com/TBD54566975/ssi-service).
:::

# Credential Issuance Service

This tutorial walks you through the lifecycle of a verifiable credential (VC) from designing a schema, issuing a credential, presenting the credential, and verifying it. 

:::info
## Prerequisites

1. Follow guide to [Clone & Run SSI Service](run-ssi-service)
:::

##  Create DID for Issuance Service

Let's create a DID for our issuance service. This will be who the end users end up trusting.

```bash
curl -X PUT localhost:8080/v1/dids/key -d '{"keyType": "Ed25519"}'
```

This gives the issuance service a DID to shout to the world, tell all your friends about it. The service keeps the private key that controls the DID in its own secure storage, so you never directly access it.

The response is a DID document for the issuer. From the response, take note of the `id` (this is the issuer's DID) and the `verificationMethod[0].id` as you will need these later. 

<details>
<summary>Sample Response</summary>

```json
{
  "did": {
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/suites/jws-2020/v1"
    ],
    //highlight-next-line
    "id": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
    "verificationMethod": [
      {
        //highlight-next-line
        "id": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
        "type": "JsonWebKey2020",
        "controller": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "Ed25519",
          "x": "oJ38fEhBcUyk0fQb5g6EM0UThBeJbNMCGib941Io02w",
          "alg": "EdDSA",
          "kid": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o"
        }
      },
      {
        "id": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6LSkNRyF7E2yHmi7dDzcAWZnuhLEtJdWLFhLqGTpzQrnLjL",
        "type": "JsonWebKey2020",
        "controller": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
        "publicKeyJwk": {
          "kty": "OKP",
          "crv": "X25519",
          "x": "gS1365-U7cF-FehCYFOF769RoY4XLd0S1NhZDEYgd3s",
          "alg": "X25519",
          "kid": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o"
        }
      }
    ],
    "authentication": [
      "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o"
    ],
    "assertionMethod": [
      "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o"
    ],
    "keyAgreement": [
      "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6LSkNRyF7E2yHmi7dDzcAWZnuhLEtJdWLFhLqGTpzQrnLjL"
    ],
    "capabilityInvocation": [
      "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o"
    ],
    "capabilityDelegation": [
      "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o"
    ]
  }
}
```

</details>

<br/>

:::info
You can return the list of DIDs at any time via the `http://localhost:8080/v1/dids/key` endpoint should you need them.
:::

## Design Credential Schema

Next, we'll create a schema for the credential we want to issue from our service:

```bash
curl -X PUT localhost:8080/v1/schemas -d '{
  "name": "Person Credential",
  "schema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "credentialSubject": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string"
         },
          "lastName": {
            "type": "string"
         }
        },
        "required": ["firstName", "lastName"]
      }
    }
  }
}'
```

From the response, take note of the credential id for the next step.

<details>
<summary>Sample Response</summary>

```json
{
  //highlight-next-line
  "id": "0bee9256-dab1-40c6-b6c7-6a6e0164c0c5",
  "type": "JsonSchema2023",
  "schema": {
    "$id": "http://localhost:8080/v1/schemas/0bee9256-dab1-40c6-b6c7-6a6e0164c0c5",
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "name": "Person Credential",
    "properties": {
      "credentialSubject": {
        "properties": {
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          }
        },
        "required": [
          "firstName",
          "lastName"
        ],
        "type": "object"
      }
    },
    "type": "object"
  }
}
```

</details>

## Issue a Credential

To issue a credential, enter the **issuer's DID**, **verification method ID**, and **schema ID** obtained from the previous responses into the request below. Also for the **subject**, enter the DID of who you'd like to issue the credential to:

```json
curl -X PUT localhost:8080/v1/credentials -d '{
  //Issuer's DID
  //highlight-next-line
  "issuer": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o", 
  
  //Verification method ID from issuer's DID document
  //highlight-next-line
  "verificationMethodId": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
 
  //DID to issue credential to:
  //highlight-next-line
  "subject": "did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w",
  
  //Credential Schema ID
  //highlight-next-line
  "schemaId": "0bee9256-dab1-40c6-b6c7-6a6e0164c0c5",
  
  "data": {
    "firstName": "Satoshi",
    "lastName": "Nakamoto"
  }
}'
```

After filling in all info, run your snippet, which should resemble this:

```bash
curl -X PUT localhost:8080/v1/credentials -d '{
  "issuer": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o", 
  "verificationMethodId": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
  "subject": "did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w",
  "schemaId": "0bee9256-dab1-40c6-b6c7-6a6e0164c0c5",
  "data": {
    "firstName": "Satoshi",
    "lastName": "Nakamoto"
  }
}'
```

You then get a response with a bunch of data, but  `credentialJwt` is the actual credential, so take note of that blob of text.


<details>
<summary>Sample Response</summary>

```json
{
  "id": "a1e58b40-f60b-4d3a-8556-ce2956c3278f",
  "fullyQualifiedVerificationMethodId": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
  "credential": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "id": "http://localhost:8080/v1/credentials/a1e58b40-f60b-4d3a-8556-ce2956c3278f",
    "type": [
      "VerifiableCredential"
    ],
    "issuer": "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
    "issuanceDate": "2023-08-09T05:07:22Z",
    "credentialSubject": {
      "firstName": "Satoshi",
      "id": "did:ion:EiClkZMDxPKqC9c-umQfTkR8vvZ9JPhl_xLDI9Nfk38w5w",
      "lastName": "Nakamoto"
    },
    "credentialSchema": {
      "id": "0bee9256-dab1-40c6-b6c7-6a6e0164c0c5",
      "type": "JsonSchema2023"
    }
  },
  //highlight-start
  "credentialJwt": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3FHRjExWXl6Q2dWcjZHM2RWSlVMamJCb2tTWE40SjNjalNCNU1RZFh0bzRvI3o2TWtxR0YxMVl5ekNnVnI2RzNkVkpVTGpiQm9rU1hONEozY2pTQjVNUWRYdG80byIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTE1NTc2NDIsImlzcyI6ImRpZDprZXk6ejZNa3FHRjExWXl6Q2dWcjZHM2RWSlVMamJCb2tTWE40SjNjalNCNU1RZFh0bzRvIiwianRpIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3YxL2NyZWRlbnRpYWxzL2ExZTU4YjQwLWY2MGItNGQzYS04NTU2LWNlMjk1NmMzMjc4ZiIsIm5iZiI6MTY5MTU1NzY0Miwibm9uY2UiOiJhNTYyNThkYy00YzM4LTQ5NmItODA1OS02ZjY0MmZjZTJlYWUiLCJzdWIiOiJkaWQ6aW9uOkVpQ2xrWk1EeFBLcUM5Yy11bVFmVGtSOHZ2WjlKUGhsX3hMREk5TmZrMzh3NXciLCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImZpcnN0TmFtZSI6IlNhdG9zaGkiLCJsYXN0TmFtZSI6Ik5ha2Ftb3RvIn0sImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiIwYmVlOTI1Ni1kYWIxLTQwYzYtYjZjNy02YTZlMDE2NGMwYzUiLCJ0eXBlIjoiSnNvblNjaGVtYTIwMjMifX19.dt9fwcEpQ2rZYkdxDce0SGXOH9hOLeomm6RudmNAmcz_fb1faw696Nw8x3D8elQMtzzrFcSXHXn_v54VcjQLDA"
  //highlight-end
}
```

</details>


## Use the Credential

Now you have a credential issued to a person (a holder), how does that person use that credential?

They present the `credentialsJwt` to any service or app that accepts it to prove they have the qualification. If that service trusts the issuer, then they can trust the claim, and it is easy and instant to check. 

This is sometimes called the [triangle of trust](https://en.wikipedia.org/wiki/Verifiable_credentials#/media/File:VC_triangle_of_Trust.svg"). 

## Verify the Credential

Checking a credential can be done using DIF's JavaScript libraries. To get these libraries, run the following command within an npm project:

```bash
npm install did-jwt-vc did-resolver key-did-resolver
```

Then an app can verify the `credentialsJwt` anywhere with the following:

```js title="VerifyCredentials.js"
import { verifyCredential } from 'did-jwt-vc'
import { Resolver } from 'did-resolver'
import { getResolver } from 'key-did-resolver'


const vcJwt = // use credentialJwt from above
const vc = await verifyCredential(vcJwt, new Resolver(getResolver()))

console.log("Credentials are:", vc.verifiableCredential.credentialSubject)
console.log("Issued by: ", vc.issuer)
```

You will then see output like: 

``` 
Credentials are: {
  firstName: 'Satoshi',
  lastName: 'Nakamoto',
  id: 'did:web:skounis.github.io'
}
Issued by:  did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o
```

Note that this shows that the credential is in tact and valid. However, it is up to the verifier to determine if they trust the issuer DID. That is the link between the verifier and issuer in the triangle of trust. You can establish this trust ahead of time - to know in the future you can trust any credentials they issue.

There is a lot more in that `vc` object, such as URLs to check for revocation and more, but this is the heart of it. Below, we'll demonstrate the VC lifecycle with an example.

## <Divider type="slash" />

## Example: A Credit Score Service

We have a fictitious credit scoring bureau called MoeX. MoeX will issue a credential that contains a user's credit score and they can share this VC freely with anyone. 

This will be a web app which takes a user's DID and name, and then returns a VC which contains their credit score. 

### Design a Schema

MoeX has 2 items in its credit credential: Credit Score (required) and Number of Defaults (optional). So, let's create a schema for this:

```bash
curl -X PUT localhost:8080/v1/schemas -d '{
  "name": "Credit Score Credential",
  "schema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "credentialSubject": {
        "type": "object",
        "properties": {
          "creditScore": {
            "type": "integer"
         },
          "numOfDefaults": {
            "type": "integer"
         }
        },
        "required": ["creditScore"]
      }
    }
  }
}'
```

:::tip
You can probably make a better schema that doesn't disclose the customer's exact credit score but just a band if you like.
:::


### Implement Issuance Service

We will implement this as a simple web app that sits in front of our [ssi-service](/docs/ssi/run-ssi-service) that we set up above. The ssi-service is a utility you can use to manage your DIDs and VCs that you are issuing, but you don't have to expose it to the internet. 

To implement an issuance service create a new Node.js project and install the dependencies:  

```bash
npm install express axios 
```

Then add the following to a `index.mjs` file: 

```js title="index.mjs"
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.json());

// Function to check DID
const checkDid = (did) => {
  // implement logic to ensure we trust the person asking for the VC
  return true;
}

// Function to get credit score
const getCreditScore = () => {
  // This generates a random integer score. But replace this with real logic, of course
  return Math.floor(Math.random() * 101);
}

app.get('/issue', async (req, res) => {
  try {
    const { userDid, name } = req.query;
    const isDidValid = checkDid(userDid);
    const score = getCreditScore();

    if (isDidValid) {
      const response = await axios.put('http://localhost:8080/v1/credentials', {
        issuer: "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
        verificationMethodId: "did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o#z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o",
        subject: userDid,
        schemaId: "da43f310-dd2f-4e26-b571-840a93ec4071",
        expiry: "2023-09-09T14:48:00.000Z",
        data: {
          creditScore: score
        }
      },
      );

      res.json(response.data);
    } else {
      res.status(400).send('Invalid DID');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('There was an error processing your request');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

:::info
Within the curl request, change the **issuer** value to the DID of the issuance server, and the **verificationMethodId** to the value from the issuer's DID document. If you don't have it handy, you can use the `/v1/credentials` endpoint to fetch it.

Also, update the **schemaId** to the id returned in the response of the new schema we created in the previous step.
:::

Now run this:

```bash
node index.mjs
```

Open a browser to `localhost:3000`.

### Get Credential from Issuance Service

Accessing the url `localhost:3000/issue?name=mic&did=did:web:mic.com` will return a credential. Take note of the `credentialJwt` field for testing.

That's it! Mic has his credential ready to use. 

### Present the Credential

Now Mic has his credit score in his hot little hand (wallet) and wants to use it. 

The easiest way is for him to present that as proof of his credit worthiness to a financial institution as the `credentialJwt` string along with any other data needed.

:::info
A wallet holding the VC would make the presentation of it more user-friendly so that Mic isn't managing this large string.
:::

### Verify the Credential

The financial institution could then verify Mic's credit.  

In an NPM project, install these JavaScript libraries (there are libraries in all languages to do this):

```bash
npm install did-jwt-vc did-resolver key-did-resolver
```

Create a program to check the credential:

```js title="check_cred.mjs"
import { verifyCredential } from 'did-jwt-vc'
import { Resolver } from 'did-resolver'
import { getResolver } from 'key-did-resolver'

// Mic's credit score credential
const vcJwt = "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa3VaYTFHVG14aVBTWnJ2ZEtaWjJjUHg4ZDFFWnJ2MlZiNVdwZ3RXUmRhdzRDI3o2TWt1WmExR1RteGlQU1pydmRLWloyY1B4OGQxRVpydjJWYjVXcGd0V1JkYXc0QyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTM2MzU2MjYsImlhdCI6MTY5MTA0MzYyNiwiaXNzIjoiZGlkOmtleTp6Nk1rdVphMUdUbXhpUFNacnZkS1paMmNQeDhkMUVacnYyVmI1V3BndFdSZGF3NEMiLCJqdGkiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvdjEvY3JlZGVudGlhbHMvMDQzYjZkYzMtNjYzZC00NmRiLWFmOWQtMTgzYmUwMjVhY2NjIiwibmJmIjoxNjkxMDQzNjI2LCJub25jZSI6IjM3MzUyMmE0LTM1NTYtNDIwOS04NzdlLTM1OTdjYTFjZjk2MyIsInN1YiI6ImRpZDp3ZWI6bWljLmNvbSIsInZjIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiY3JlZGl0U2NvcmUiOjJ9LCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiZGE0M2YzMTAtZGQyZi00ZTI2LWI1NzEtODQwYTkzZWM0MDcxIiwidHlwZSI6Ikpzb25TY2hlbWEyMDIzIn19fQ.t41Vlrw0e0tMZ8U7DtNO7_Jf95eg8bcI_sst8pkJHejUB4CceijCV03ZNGFSGDRXb_VqtLXVchAMiykEax2qCw"

// Verify the credential
const vc = await verifyCredential(vcJwt, new Resolver(getResolver()))

if (!vc.verified) {
  console.log("VC is not verified")  
}

console.log("Financial institution to check it trusts this issuer: " + vc.issuer)

if (vc.verifiableCredential.credentialSubject.creditScore < 50) {
    console.log("Credit denied: Too sketchy");
} else {
    console.log("Credit Approved")
}

console.log("Credentials are:", vc.verifiableCredential.credentialSubject)
```

To check the results, run:

```bash
node check_cred.mjs
```

The result should resemble:

```
Financial institution to check it trusts this issuer: did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o
Credit Approved
Credentials are: { creditScore: 76, id: 'did:web:mic.com' }
Issued by:  did:key:z6MkqGF11YyzCgVr6G3dVJULjbBokSXN4J3cjSB5MQdXto4o
```

This shows that the credential is in tact and issued by an issuer that the financial institution trusts. It also will expire automatically on the expiration date that was provided when creating the credential. 

This shows a small glimpse of what VC issuance can be, as well as presenting credentials, the ssi-service utilities, and more.
