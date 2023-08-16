---
sidebar_position: 7
title: Revoke Credentials
hide_title: true
---

# Revoke a Credential

By now you should be familiar with creating a credential. Notably, that upon forming a request to [create a credential](/docs/apis/ssi-service#tag/Credentials/paths/~1v1~1credentials/put) there are a number of possible request values, two of which are `revocable` and `suspendable`.

These options are exposed to give issuers the ability to specify [status for credentials](credential-status) they create in the service. In this guide we'll go over how to revoke a credential!

## Create a Revocable Credential

:::info
### Prerequsites

- Follow guide to [Clone & Run SSI Service](run-ssi-service).
- [Create an issuer DID](create-did) and an unsigned [schema](/docs/ssi/create-schema#create-unsigned-schema). Save the DID `id` and the schema `id`.
- For testing purposes use the subject DID in our example below.
:::

### 1. Create the Credential:

Create a `PUT` request to `/v1/credentials` making sure the request body has the value `revocable` set to `true`:

```bash
curl -X PUT localhost:8080/v1/credentials -d '{
  "issuer": "did:key:z6Mkm1TmRWRPK6n21QncUZnk1tdYkje896mYCzhMfQ67assD",
  "verificationMethodId": "did:key:z6Mkm1TmRWRPK6n21QncUZnk1tdYkje896mYCzhMfQ67assD#z6Mkm1TmRWRPK6n21QncUZnk1tdYkje896mYCzhMfQ67assD",
  "subject": "did:key:z6MkmNnvnfzW3nLiePweN3niGLnvp2BjKx3NM186vJ2yRg2z",
  "schemaId": "aed6f4f0-5ed7-4d7a-a3df-56430e1b2a88",
  "data": {
    "firstName": "Satoshi",
    "lastName": "Nakamoto"
  },
  "revocable": true
}'
```

Upon success we should see a response such as:

```json
{
  "id": "8f9d58b2-c978-4317-96bd-35949ce76121",
  "fullyQualifiedVerificationMethodId": "did:key:z6Mkm1TmRWRPK6n21QncUZnk1tdYkje896mYCzhMfQ67assD#z6Mkm1TmRWRPK6n21QncUZnk1tdYkje896mYCzhMfQ67assD",
  "credential": {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "id": "http://localhost:8080/v1/credentials/8f9d58b2-c978-4317-96bd-35949ce76121",
    "type": ["VerifiableCredential"],
    "issuer": "did:key:z6Mkm1TmRWRPK6n21QncUZnk1tdYkje896mYCzhMfQ67assD",
    "issuanceDate": "2023-07-31T11:18:26-07:00",
    //highlight-start
    "credentialStatus": {
      "id": "http://localhost:8080/v1/credentials/8f9d58b2-c978-4317-96bd-35949ce76121/status",
      "statusListCredential": "http://localhost:8080/v1/credentials/status/b7a8bd19-f20d-4132-ac2e-137ff4d1511a",
      "statusListIndex": "106493",
      "statusPurpose": "revocation",
      "type": "StatusList2021Entry"
    },
    //highlight-end
    "credentialSubject": {
      "firstName": "Satoshi",
      "id": "did:key:z6MkmNnvnfzW3nLiePweN3niGLnvp2BjKx3NM186vJ2yRg2z",
      "lastName": "Nakamoto"
    },
    "credentialSchema": {
      "id": "aed6f4f0-5ed7-4d7a-a3df-56430e1b2a88",
      "type": "JsonSchema2023"
    }
  },
  "credentialJwt": "eyJhbGciOiJFZER..."
}
```

Notably we see the `credentialStatus` entry in the credential we've created, with id `http://localhost:8080/v1/credentials/8f9d58b2-c978-4317-96bd-35949ce76121/status` and the status list credential that has been created, with id `http://localhost:8080/v1/credentials/status/b7a8bd19-f20d-4132-ac2e-137ff4d1511a`.

### 2. Get a Status List Credential:

:::info
For more context on status list credential's make sure to read the [Credential Status](credential-status) guide.
:::

Next, let's get the credential's associated `statusListCredential` via a request to `/v1/credentials/status/{id}`:

```bash
curl http://localhost:8080/v1/credentials/status/b7a8bd19-f20d-4132-ac2e-137ff4d1511a
```

Upon success we should see a response such as:

```json
{
  "id": "b7a8bd19-f20d-4132-ac2e-137ff4d1511a",
  "credential": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      //highlight-next-line
      "https://w3id.org/vc/status-list/2021/v1"
    ],
    //highlight-next-line
    "id": "http://localhost:8080/v1/credentials/status/b7a8bd19-f20d-4132-ac2e-137ff4d1511a",
    "type": [
      "VerifiableCredential",
      //highlight-next-line
      "StatusList2021Credential"
    ],
    "issuer": "did:key:z6Mkm1TmRWRPK6n21QncUZnk1tdYkje896mYCzhMfQ67assD",
    "issuanceDate": "2023-07-31T18:18:26Z",
    "credentialSubject": {
      "encodedList": "H4sIAAAAAAAA/2IAAweGUTAKRsEoGAWjYBSMPAAIAAD//9BoYmEICAAA",
      "id": "http://localhost:8080/v1/credentials/status/b7a8bd19-f20d-4132-ac2e-137ff4d1511a",
      //highlight-start
      "statusPurpose": "revocation",
      "type": "StatusList2021"
      //highlight-end
    }
  },
  "credentialJwt": "eyJhbGciOiJFZERTQSIs..."
}
```

With this `statusListCredential` we're able to check the status for the credential we created, which is identified by its `"id": "b7a8bd19-f20d-4132-ac2e-137ff4d1511a"` and status list index `106493`.

#### To check the status you have a few options:

- Run the [verification algorithm](https://w3c.github.io/vc-status-list-2021/#validate-algorithm) yourself using the specification.
- Use the [utility in the SSI SDK](https://github.com/TBD54566975/ssi-sdk/blob/d5c302a1d9b9d04c1636a0c8dfda015f61bb0f6b/credential/status/statuslist2021.go#L254) to check the status.
- Use the SSI Service's endpoint for status validation.

### 3. Verify a Credential's Status with SSI Service

The SSI Service has an endpoint which you can make `GET` requests to at `/v1/credentials/{id}/status` to check the status for any credential. Using our credential's `"id": "b7a8bd19-f20d-4132-ac2e-137ff4d1511a"`, here's how we would make the request:

```bash
curl localhost:8080/v1/credentials/8f9d58b2-c978-4317-96bd-35949ce76121/status
```

Upon success we should see a response saying the credential is neither revoked or suspended:

```json
{
  //highlight-start
  "revoked": false,
  "suspended": false
  //highlight-end
}
```

### 4. Revoke the Credential

As the creator of the credential we're able to change the status of the credential we've created.

To do so, we would make request to the [update credential status endpoint](/docs/apis/ssi-service#tag/Credentials/paths/~1v1~1credentials~1%7Bid%7D~1status/put) which is a `PUT` request to `/v1/credentials/{id}/status`. At present, the endpoint accepts boolean values for the status(es) the credential supports.

Let's update the credential's status to revoked:

```bash
curl -X PUT localhost:8080/v1/credentials/8f9d58b2-c978-4317-96bd-35949ce76121/status -d '{ "revoked": true }'
```

Upon success we should see a response such as:

```json
{ 
  //highlight-next-line
  "revoked": true,
  "suspended": false
}
```

Making a request as we did in step 3 should now show the same response.

The credential is now **revoked!**

:::note
It is possible to reverse the status of a credential. To do so, make the same request mentioned above, but setting the value of revoked to `false`.
:::