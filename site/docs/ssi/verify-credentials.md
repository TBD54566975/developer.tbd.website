---
sidebar_position: 8
title: Verify Credentials
hide_title: true
---

:::warning
This project is not actively being maintained. If you are interested in adopting it, please [open an issue](https://github.com/TBD54566975/ssi-service).
:::

# Verify a Credential

There are numerous factors to determine a credential's validity. Verifiers will ultimately define their own unique criteria for determining validity from a range of possibilities:

- **Signature Verification** - Has it been signed by the issuer? If so, has the signature been tampered with?
- **Credential Status** - Is it still active, and not revoked or suspended?
- **Credential Validity** - Has it expired?
- **Credential Issuer** - Is the issuer trusted for the claims they're attesting to?
- **Credential Evidence** - Is there evidence supporting the claims being made?
- **Credential Schema** - Does it conform to a schema defined in the `credentialSchema` property?
- And more...

:::note
Determining the validity of a VC can be a complex topic. The data model itself [has guidance on validity checks](https://www.w3.org/TR/vc-data-model/#validity-checks), and a [separate section on validation](https://www.w3.org/TR/vc-data-model/#validation), which provide even more information for implementers to consider.
:::

<Divider type="slash" />

## Stateless Verification

:::info
## Prerequisite
Follow guide to [Run SSI Service](run-ssi-service)
:::

As a part of SSI Service, `/v1/credentials/verification` is used as a stateless utility to verify any credential.

To verify a VC, run the follow command after replacing the credentialJWT value with the one from the credential you're validating:

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

✅ Make sure the credential is complaint with the VC Data Model

✅ Make sure the credential is not expired

✅ Make sure the signature of the credential is valid (currently supports both JWT and some Linked Data credentials)

✅ Make sure its data complies with the credential schema if one exists (note: the schema must be hosted within the service)
