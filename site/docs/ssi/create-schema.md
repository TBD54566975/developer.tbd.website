---
sidebar_position: 3
title: Create a Schema
---


A Credential Schema is a document that defines the structure of a Verifiable Credential (VC). It's based on [JSON Schema](https://json-schema.org/) and specifies which properties the issuer will use to create the VC. In this tutorial, you'll learn how to construct a schema and use the SSI Service to create it.

<details>
<summary>Background on Schemas</summary>
When creating Verifiable Credentials, it's useful to have a mechanism to define the shape the data in the credential takes, in a consistent manner.

The [VC Data Model](https://www.w3.org/TR/vc-data-model) uses an open world data model, and with it, provides a mechanism to *extend* the core terminology to add any term with a technology known as [JSON-LD](https://json-ld.org/). 

JSON-LD is responsible for the `@context` property visible in VCs, DIDs, and other documents in the SSI space. However, JSON-LD is focused on _semantics_, answering the question "do we have a shared understanding of what this thing is?". More specifically, for a name credential, does your concept of "name" match mine? 

Though the core data model is a JSON-LD data model, processing VCs as JSON-LD is not a requirement. The SSI Service chooses to take a simpler approach and [processes VCs as pure JSON](https://www.w3.org/TR/vc-data-model/#json).

When constructing and processing VCs as pure JSON, it's useful to have a mechanism to define the data and add some light validation onto the shape that data takes. 

[JSON Schema](https://json-schema.org/) is a widely used, and widely supported toolset that enables such functionalty: the ability to define a schema, which provides a set of properties (both required and optional), and some light validation on top of those properties. The VC Data Model has [a section on data schemas](https://www.w3.org/TR/vc-data-model/#data-schemas) that enables this functionality.
</details>

## 1. Construct the JSON Schema

Let's create a plain JSON Schema for an email address.

### Keywords
The [JSON Schema Core Vocabulary](https://json-schema.org/draft/2020-12/json-schema-core.html#name-the-json-schema-core-vocabu) is made up of keywords, which all begin with `$`, and are used to process schemas and guarantee interoperability.

The two keywords needed for our JSON schema are `$id` and `$schema`.

#### $id
The [$id keyword](https://json-schema.org/draft/2020-12/json-schema-core.html#name-the-id-keyword) identifies a schema resource with its canonical URI.  Note that this URI is an identifier and not necessarily a network locator. In the case of a network-addressable URL, a schema does not need to be downloadable from its canonical URI.

```json
{
  "$id": "https://example.com/schemas/email.json",
}
```

#### $schema
For the [$schema keyword](https://json-schema.org/draft/2020-12/json-schema-core.html#name-the-schema-keyword), we'll use the [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12/json-schema-core.html)

```json
{
  "$id": "https://example.com/schemas/email.json",
  //highlight-next-line
  "$schema": "https://json-schema.org/draft/2020-12/schema",
}
```

Next, we'll define the data needed for our schema: an email address. This includes the name, type, and properties of the data:

```json
{
  "$id": "https://example.com/schemas/email.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  //highlight-start
  "name": "Email Address",
  "type": "object",
  "properties": {
    "emailAddress": {
      "type": "string",
      "format": "email"
    }
  },
  //highlight-end
}
```

We see that the schema defines a property `emailAddress` of type `string` and format `email`.

The next part of the JSON specifies any required properties. We want an email address to be a required property of the schema so we indicate that as such:

```json
{
  "$id": "https://example.com/schemas/email.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "name": "Email Address",
  "type": "object",
  "properties": {
    "emailAddress": {
      "type": "string",
      "format": "email"
    }
  },
  //highlight-next-line
  "required": ["emailAddress"]
}
```

This means that any piece of JSON we apply this schema to will pass if a valid `emailAddress` property is present and will fail otherwise. 


## 2. Create Credential Schema

Now that we have a valid JSON Schema, we'll need to transform it so that it's not just any arbitrary JSON, but can be applied to a Verifiable Credential.

:::info
## Prerequisite
Follow guide to [Clone & Run SSI Service](run-ssi-service)
:::

### Signed vs. Unsigned Schemas

The SSI Service exposes a set of APIs for managing schemas. To create a schema you have two options: **signed** or **unsigned**. The signed version of a schema is packaged as a VC. In some cases, it's useful to package a JSON Schema as a VC to retain information about authorship (who created the schema), when it was created, and enable other features the VC Data Model offers, such as the ability to suspend the usage of a schema.

Let's look at the approach for creating both kinds of schemas.


### Create Unsigned Schema

To apply our JSON Schema to a Verifiable Credential, let's add `emailAddress` in the `credentialSubject` property then execute a `PUT` request to `/v1/schemas`:

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

Upon success, you'll see a response which includes the schema you passed in, a service-generated identifier for the schema, and a `JsonSchema2023` type:

```json
{
  // Schema identifier
  //highlight-next-line
  "id": "ebeebf7b-d452-4832-b8d3-0042ec80e108",

  // Schema type
  //highlight-next-line
  "type": "JsonSchema2023",

  // Schema that was passed into request
  //highlight-start
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
  //highlight-end
}
```


### Create Signed Schema

Signed schemas are packaged as VCs themselves, and therefore require a few additional properties. At minimum, we'd need: 
-  **issuer** - The DID of the VC issuer
- **verificationMethodId** - The ID of the verification method

```json
curl -X PUT localhost:8080/v1/schemas -d '{
  "name": "Email Credential",
  //highlight-next-line
  "issuer": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
  //highlight-next-line
  "verificationMethodId": "did:key:z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw#z6MkjePG6UBCLbrgUQgURoTSuXAbRpDbCdTLEPUXDqUC4EFw",
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

Signed VC schemas are created the same way unsigned ones are - by executing a `PUT` request to `v1/schemas`.
