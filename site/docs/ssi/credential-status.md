---
sidebar_position: 6
title: Credential Status
hide_title: true
---
# Credential Status

Though VCs are designed to give the holder a large degree of freedom in using their data, credential issuers are able to retain some control over the data they attest to after [issuance](credential-issuance-service). One of the mechanisms by which they retain this control is through the usage of credential status.

Credential status can be implemented through any valid JSON-LD type, to specify any status such as whether a credential is `suspended` or `revoked`. The most prominently used type is the [Status List](https://w3c.github.io/vc-status-list-2021/) type, a work item in the [VC Working Group](https://www.w3.org/groups/wg/vc).

To make use of credential status, issuers must follow the rules outlined in the [Status List specification](https://w3c.github.io/vc-status-list-2021/#statuslist2021credential) to build a status list credential, and then include the requisite values in the `credentialStatus` property of any VC they issue according to the [Status List Entry](https://w3c.github.io/vc-status-list-2021/#statuslist2021entry) portion of the specification.

<details>
<summary>How does Status List work?</summary>

#### Status List provides:

- **Issuers** a mechanism to express the status of a given credential.
- **Verifiers** a mechanism to check the status of a given credential.
- **Holders** a set of privacy guarantees about status checks for credentials they hold.

#### The way this works with SSI Service:

Issuers create a new credential using [bitstring](https://w3c.github.io/vc-status-list-2021/#security-considerations) that represents credential statuses that are unique for each `<issuer, credential schema>` pair.

Then, for each new credential an issuer creates for a given schema:
- A new credential status credential is created or an existing credential status credential is used.
- The credentials contain a reference to the status list credential contained in the credential's `credentialStatus` property, which can be used by verifiers to check the status of the credential.

#### Bitstring and Herd Privacy:
Status credentials use a bitstring which can provide herd privacy for credential holders — in simpler terms this means that many credentials can be represented in a single bitstring, so it is not clear which credential/holder a verifier is requesting information about — this is great for holder privacy!
</details>

## Status List Credential:
Here is an example of a **status list credential**. Note that in addition to being of type `VerifiableCredential`, it also is of type `StatusList2021Credential`. Also note the `credentialSubject.type` property is set to `Status2021`:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/vc/status-list/2021/v1"
  ],
  "id": "https://example.com/credentials/status/3",
  //highlight-next-line
  "type": ["VerifiableCredential", "StatusList2021Credential"],
  "issuer": "did:example:12345",
  "issued": "2021-04-05T14:27:40Z",
  "credentialSubject": {
    "id": "https://example.com/status/3#list",
    //highlight-next-line
    "type": "StatusList2021",
    "statusPurpose": "revocation",
    "encodedList": "H4sIAAAAAAAAA-3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAIC3AYbSVKsAQAAA"
  },
  "proof": { ... }
}
```

## Credential with a Credential Status:

In this example, the credential references a **status list credential** in the given `credentialStatus` section. Also, notice that the credential also has a `statusListIndex` of `94567`, which is an arbitrary integer that identifies the position of the status of the verifiable credential:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/vc/status-list/2021/v1"
  ],
  "id": "https://example.com/credentials/23894672394",
  //highlight-next-line
  "type": ["VerifiableCredential"],
  "issuer": "did:example:12345",
  "issued": "2021-04-05T14:27:42Z",
  //highlight-start
  "credentialStatus": {
    "id": "https://example.com/credentials/status/3#94567",
    "type": "StatusList2021Entry",
    "statusPurpose": "revocation",
    "statusListIndex": "94567",
    "statusListCredential": "https://example.com/credentials/status/3"
  },
  //highlight-end
  "credentialSubject": {
    "id": "did:example:6789",
    "type": "Person"
  },
  "proof": { ... }
}
```

#### The verification process would be as follows:

- Holder `did:example:6789` presents their credential to a verifier.
- Verifier makes a request to resolve the credential status credential identified by `https://example.com/credentials/status/3`.
- Upon resolution of this credential the verifier checks the value of the bit string at index `94567`.
- If present, the credential has a `revoked` status. If absent, the credential does not have a `revoked` status.

## Create a Credential with Status

:::info
### Prerequsites

- Follow guide to [Clone & Run SSI Service](run-ssi-service).
- [Create an issuer DID](create-did) and an unsigned [schema](/docs/ssi/create-schema#create-unsigned-schema). Save the DID `id` and the schema `id`.
- For testing purposes use the subject DID in our example below.
:::

### 1. Create Credential:

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

### 3. Verify a Credential's Status

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

## Next Steps
Learn how to [revoke this credential](revoke-credentials)