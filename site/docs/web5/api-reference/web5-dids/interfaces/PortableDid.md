# Interface: PortableDid

Format to document a DID identifier, along with its associated data,
which can be exported, saved to a file, or imported. The intent is
bundle all of the necessary metadata to enable usage of the DID in
different contexts.

## Table of contents

### Properties

- [canonicalId](PortableDid.md#canonicalid)
- [did](PortableDid.md#did)
- [document](PortableDid.md#document)
- [keySet](PortableDid.md#keyset)
- [metadata](PortableDid.md#metadata)

## Properties

### canonicalId

• `Optional` **canonicalId**: `string`

A DID method can define different forms of a DID that are logically
equivalent. An example is when a DID takes one form prior to registration
in a verifiable data registry and another form after such registration.
This is the purpose of the canonicalId property.

The `canonicalId` must be used as the primary ID for the DID subject,
with all other equivalent values treated as secondary aliases.

**`See`**

[W3C DID Document Metadata](https://www.w3.org/TR/did-core/#dfn-canonicalid)

#### Defined in

[types.ts:205](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L205)

___

### did

• **did**: `string`

#### Defined in

[types.ts:192](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L192)

___

### document

• **document**: [`DidDocument`](../index.md#diddocument)

A set of data describing the DID subject, including mechanisms, such as
cryptographic public keys, that the DID subject or a DID delegate can use
to authenticate itself and prove its association with the DID.

#### Defined in

[types.ts:212](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L212)

___

### keySet

• **keySet**: [`DidKeySet`](../index.md#didkeyset)

A collection of cryptographic keys associated with the DID subject. The
`keySet` encompasses various forms, such as recovery keys, update keys,
and verification method keys, to enable authentication and verification
of the DID subject's association with the DID.

#### Defined in

[types.ts:220](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L220)

___

### metadata

• `Optional` **metadata**: [`DidMetadata`](../index.md#didmetadata)

This property can be used to store method specific data about
each managed DID and additional properties of any type.

#### Defined in

[types.ts:226](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L226)
