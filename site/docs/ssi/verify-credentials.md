---
sidebar_position: 4
title: Verify Credentials
hide_title: true
---

# Verify a Credential

There are numerous factors to determine a credential's validity. Verifiers will ultimately define their own unique criteria for determining validity from a range of possibilities:

- **Signature Verification** - Has it been signed by the issuer? If so, has the signature been tampered with?
- **Credential Status** - Has it been revoked or suspended?
- **Credential Validity** - Has it expired?
- **Credential Issuer** - Is the issuer trusted for the claims they're attesting to?
- **Credential Evidence** - Is there evidence supporting the claims being made?
- **Credential Schema** - Does it conform to a schema defined in the `credentialSchema` property?
- And more...

:::note
Determining the validity of a VC can be a complex topic. The data model itself [has guidance on validity checks](https://www.w3.org/TR/vc-data-model/#validity-checks), and a [separate section on validation](https://www.w3.org/TR/vc-data-model/#validation), which provide even more information for implementers to consider.
:::

<Divider type="slash" />

## Verify the VC

:::info
## Prerequisites

Building upon the credential created in the [How To: Create a Credential](create-credentials) guide, take the credential you created, which is a JWT, and verify it.
:::

As a part of the service's credential API `/v1/credentials/verification` is used as a stateless utility to verify any credential.

To verify the VC, run:

```bash
curl -X PUT localhost:8080/v1/credentials/verification -d '{
    "credentialJwt": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6..."
}'
```

Upon success the following response should be returned:

```json
{ 
  "verified": true
}
```

The request above performs the following verification process:

- Make sure the credential is complaint with the VC Data Model
- Make sure the credential is not expired
- Make sure the signature of the credential is valid (currently supports both JWT and some Linked Data credentials)
- If the credential has a schema, makes sure its data complies with the schema (note: the schema must be hosted within the service)

:::info
In the future this endpoint can (and should!) be expanded to support status checks and external schema resolution, among other optional checks.
:::

## Other Types of Verification

### Verifiable Presentations
The example we've gone through above verifies a credential from an issuer. But what about verifying the presentation of a credential, or set of credentials, from a holder to a verifier? To do this, a holder must construct what's called a [Verifiable Presentation](https://www.w3.org/TR/vc-data-model/#presentations-0), an object which is also defined by the VC Data Model, which allows a holder of a verifiable credential to create an authenticated wrapper around a set of credentials it wishes to present to a verifier. Learn more in the guide on [Verifying a Presentation](https://github.com/TBD54566975/ssi-service/blob/main/doc/howto/presentation.md).

### Presentation Exchange
What about applying more complex logic to the verification process? Like checking if a credential was issued from a known set of issuers? Or requesting two of one type of credential and three of another? Or checking that certain credential fields are present and have expected values? With [Presentation Exchange](https://identity.foundation/presentation-exchange/), a specification created in the Decentralized Identity Foundation, this arbitarily-complex style of verification is made possible.


