---
sidebar_position: 6
title: Credential Status
hide_title: true
---
# Credential Status

Though VCs are designed to give the holder a large degree of freedom in using their data, credential issuers are able to retain some control over the data they attest to after [issuance](credential-issuance-service). One of the mechanisms by which they retain this control is through the usage of credential status.

Credential status can be implemented through any valid JSON-LD type, to specify any status such as whether a credential is `suspended` or `revoked`. The most prominently used type is through the [Status List](https://w3c.github.io/vc-status-list-2021/) type, a work item in the [VC Working Group](https://www.w3.org/groups/wg/vc).

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

## Example Credential Status Credential:
In this example below we have a **status list credential** which is used for many credentials issued by the issuer identified by the DID `did:example:12345`:

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

## Example Credential with a Credential Status:

In this second example we can see a credential that `did:example:12345` issued to `did:example:6789`. The example also shows a reference to the **status list credential** in the given `credentialStatus` block.

We see that the credential has a `"statusListIndex": "94567"` which is needed by any verifier of the holder's credential to check its status.

The verification process would be as follows:
- Holder `did:example:6789` presents their credential to a verifier.
- Verifier makes a request to resolve the credential status credential identified by `https://example.com/credentials/status/3`.

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
Upon resolution of this credential the verifier checks the value of the bit string at index `94567`. If present, the credential has the associated status `revoked`, if absent, the credential does not have the associated status `not revoked`.

## Next Steps
Learn how to [revoke a credential](revoke-credentials)!