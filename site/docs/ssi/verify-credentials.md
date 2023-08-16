---
sidebar_position: 4
title: Verify Credentials
hide_title: true
---

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


## Verifiable Presentations
A VC holder may provide a [Verifiable Presentation](https://www.w3.org/TR/vc-data-model/#presentations-0) for verification, which is an object that serves as an authenticated wrapper around a set of credentials they wish to have verified.

You can use the SSI Service to verify a VC Presentation by making a `PUT` request to `/v1/presentations/verification`. A sample request is as follows:

```bash
curl -X PUT localhost:3000/v1/presentations/verification -d '{
    "presentationJwt": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrI3o2TWttTjEyOTZ1YXBIbU02QTI4bkdaR2RBRW5pRDFhYTVSZEZDbjhKRXVucVY5ayIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTExNzU2MjQsImlzcyI6ImRpZDprZXk6ejZNa21OMTI5NnVhcEhtTTZBMjhuR1pHZEFFbmlEMWFhNVJkRkNuOEpFdW5xVjlrIiwianRpIjoiYjQ0OTI0ZWEtMDIwMi00ZTllLWJiMmEtOTg5YmQwNWQ1N2FlIiwibmJmIjoxNjkxMTc1NjI0LCJub25jZSI6IjVjNmFhZDc2LWUyZWYtNGNiNy1iMWE4LTI3MjZiMjRhM2Y0ZSIsInZwIjp7IkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sInR5cGUiOlsiVmVyaWZpYWJsZVByZXNlbnRhdGlvbiJdLCJ2ZXJpZmlhYmxlQ3JlZGVudGlhbCI6WyJleUpoYkdjaU9pSkZaRVJUUVNJc0ltdHBaQ0k2SW1ScFpEcHJaWGs2ZWpaTmEyMU9NVEk1Tm5WaGNFaHRUVFpCTWpodVIxcEhaRUZGYm1sRU1XRmhOVkprUmtOdU9FcEZkVzV4VmpsckkzbzJUV3R0VGpFeU9UWjFZWEJJYlUwMlFUSTRia2RhUjJSQlJXNXBSREZoWVRWU1pFWkRiamhLUlhWdWNWWTVheUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWVhRaU9qRTJPVEV4TnpVMk1qUXNJbWx6Y3lJNkltUnBaRHByWlhrNmVqWk5hMjFPTVRJNU5uVmhjRWh0VFRaQk1qaHVSMXBIWkVGRmJtbEVNV0ZoTlZKa1JrTnVPRXBGZFc1eFZqbHJJaXdpYW5ScElqb2lPRFUyTnpRellURXRZamxsWWkwME56Z3lMV0kzTkRjdE5UbGtOekkzWVRGaVlXWTFJaXdpYm1KbUlqb3hOamt4TVRjMU5qSTBMQ0p1YjI1alpTSTZJamsyTkRkalltTmtMV0k0WkRndE5HVXhNeTFpTURKa0xURXpZelUxTm1RNVlqRTFPQ0lzSW5OMVlpSTZJbVJwWkRwclpYazZlalpOYTIxT01USTVOblZoY0VodFRUWkJNamh1UjFwSFpFRkZibWxFTVdGaE5WSmtSa051T0VwRmRXNXhWamxySWl3aWRtTWlPbnNpUUdOdmJuUmxlSFFpT2xzaWFIUjBjSE02THk5M2QzY3Vkek11YjNKbkx6SXdNVGd2WTNKbFpHVnVkR2xoYkhNdmRqRWlYU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNKZExDSmpjbVZrWlc1MGFXRnNVM1ZpYW1WamRDSTZleUpsYlhCc2IzbGxjaUk2SWxSQ1JDSXNJbXB2WWxScGRHeGxJam9pVkhWMGIzSnBZV3dnUVhWMGFHOXlJbjE5ZlEuWEJPbjBTd2RZZUMwN2dHM1VkT1ZLeHV2YXpfWVRpRkNmZ2tpZXJhZUZnVkEtT2tkWDM1SWl6T0NhdUtqdWlsQXJzZklvMkNYN1pYaDl3djRhUXZFRGciXX19.pJXQXSJcu4U752IE0IH21Yw26OsGMLrHE_-LpGLDHkfetQoJk56j9Fflg-P68xVgfNwZ4EBgGEJ88bXLRv1aDQ"
}'
```

Upon success the following response should be returned:

```json
{ 
  "verified": true
}
```