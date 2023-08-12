---
sidebar_position: 3
title: Create Schema
hide_title: true
---

# Create a VC Schema

## Background on Schemas

### JSON Schema
When constructing and processing Verifiable Credentials (VCs) as pure JSON it is useful to have a mechanism to define the data and add some light validation onto the shape that data takes. [JSON Schema](https://json-schema.org/) is a widely used, and widely supported toolset that enables such functionalty: the ability to define a schema, which provides a set of properties (both required and optional), and some light validation on top of those properties. The VC Data Model has [a section on data schemas](https://www.w3.org/TR/vc-data-model/#data-schemas) that enables this functionality.

For more background checkout out our SSI Service Guide on [Schemas](https://github.com/TBD54566975/ssi-service/blob/main/doc/howto/schema.md).

### JSON Schema with VCs
Utilizing the `credentialSchema` property, as outlined in the [VC Data Model](https://www.w3.org/TR/vc-data-model/#data-schemas) TBD, along with W3C collaborators, is actively developing a [new specification](https://w3c.github.io/vc-json-schema/). This specification enables a standards-compliant path to using JSON Schema with VCs.

<Divider type="slash" />

## Creating Credential Schemas

:::info
## Prerequisite

### [Clone & Run SSI Service](run-ssi-service)
:::

The service exposes a set of APIs for managing schemas. To create a schema you have two options: signed or unsigned.

Initially, we will guide you through the process of crafting an **Email Credential** schema—one that has not been packaged as a VC (unsigned).

<Divider type="dotted" />

### Create a Schema (unsigned)

In this schema we're going to set a required property `emailAddress` of JSON type `string`. This means that any piece of JSON we apply this schema to will pass if a valid `emailAddress` property is present and fail otherwise.

Also to make the JSON useful in being applied to a VC, not just any arbitrary JSON, `emailAddress` has been applied within the `credentialSubject` property.

After forming a valid JSON Schema, generate a `PUT` request to `/v1/schemas`:

```bash
curl -X PUT localhost:8080/v1/schemas -d '{
  "name": "Email Credential",
  "schema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "credentialSubject": {
        "type": "object",
        "properties": {
          "emailAddress": {
            "type": "string",
            "format": "email"
          }
        },
        "required": ["emailAddress"]
      }
    }
  }
}'
```

Upon success you'll see a response which includes the schema you passed in, with a service-generated identifier for the schema. You'll also notice a type `JsonSchema2023`, which is defined by the [VC JSON Schema specification](https://w3c.github.io/vc-json-schema/#jsonschema2023):

```json
{
  "id": "ebeebf7b-d452-4832-b8d3-0042ec80e108",
  "type": "JsonSchema2023",
  "schema": {
    "$id": "http://localhost:3000/v1/schemas/ebeebf7b-d452-4832-b8d3-0042ec80e108",
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "name": "Email Credential",
    "properties": {
      "credentialSubject": {
        "properties": {
          "emailAddress": {
            "format": "email",
            "type": "string"
          }
        },
        "required": [
          "emailAddress"
        ],
        "type": "object"
      }
    },
    "type": "object"
  }
}
```

<Divider type="dotted" />

### Create a Schema (signed)
:::info
## Prerequisite

Follow the [Create a DID](create-did) guide and save: 
- `issuer` DID (ie: `did:key:z6MkjePG6UBCL...`)
- `verificationMethodId`: The ID of the verification method used to sign the schema (aka the `id` property of the first object in the `verificationMethod` array)
:::

As mentioned earlier, the signed version of a schema is packaged as a VC. In some cases it is useful to package a JSON Schema as a VC to retain information about authorship (who created the schema), when it was created, and enable other features the VC Data Model offers, such as the ability to suspend the usage of a schema with [a status](https://www.w3.org/TR/vc-data-model/#status).

To show this use case let's create an **Employment Verification** schema.

In this case you will need to pass in a few additional properties: 
-  `issuer` DID 
- `verificationMethodId`
- Set new schema `"name": "Employment Verification"`
- Remove the `emailAddress` property and add `givenName` and `employedAt` (timestamp data type to define the date and time someone was employed)

After forming our new schema, let's generate another `PUT` request to `v1/schemas`:

```bash
curl -X PUT localhost:8080/v1/schemas -d '{
  "name": "Employment Verification",
  "issuer": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "verificationMethodId": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  "schema": {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
      "credentialSubject": {
        "type": "object",
        "properties": {
          "givenName": {
            "type": "string"
          },
          "employedAt": {
            "type": "string"
          }
        },
        "required": [
          "givenName",
          "employedAt"
        ]
      }
    }
  }
}'
```

The following response should be returned:

```json
{
  "id": "525358c8-1949-495e-becf-aa19d4da6a69",
  "type": "CredentialSchema2023",
  "credentialSchema": "eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa2plU..."
}
```

<Divider type="dotted" />

## Now what?

If you're on a roll and want to learn more, save your Schema ID from your Employment Verfication schema response and create your first [Verifiable Credential](create-credentials)!

## Getting Schemas

Once you've created multiple schemas, you can view them all by make a `GET` request to the `v1/schemas` endpoint. Future enhancements may enable filtering based on name, author, or other properties.

You can get a specific schema by make a `GET` request to the `v1/schemas/{schemaId}` endpoint.
