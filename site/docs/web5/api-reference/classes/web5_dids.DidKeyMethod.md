---
id: "web5_dids.DidKeyMethod"
title: "Class: DidKeyMethod"
sidebar_label: "@web5/dids.DidKeyMethod"
custom_edit_url: null
---

[@web5/dids](../modules/web5_dids.md).DidKeyMethod

## Implements

- [`DidMethod`](../interfaces/web5_dids.DidMethod.md)

## Constructors

### constructor

• **new DidKeyMethod**()

## Properties

### methodName

▪ `Static` **methodName**: `string` = `'key'`

Name of the DID method

#### Defined in

[did-key.ts:84](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L84)

## Methods

### create

▸ `Static` **create**(`options?`): `Promise`<[`PortableDid`](../interfaces/web5_dids.PortableDid.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`DidKeyCreateOptions`](../modules/web5_dids.md#didkeycreateoptions) |

#### Returns

`Promise`<[`PortableDid`](../interfaces/web5_dids.PortableDid.md)\>

#### Defined in

[did-key.ts:86](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L86)

___

### createDocument

▸ `Static` **createDocument**(`options`): `Promise`<[`DidDocument`](../modules/web5_dids.md#diddocument)\>

Expands a did:key identifier to a DID Document.

Reference: https://w3c-ccg.github.io/did-method-key/#document-creation-algorithm

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`DidKeyCreateDocumentOptions`](../modules/web5_dids.md#didkeycreatedocumentoptions) |

#### Returns

`Promise`<[`DidDocument`](../modules/web5_dids.md#diddocument)\>

- A DID dodcument.

#### Defined in

[did-key.ts:136](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L136)

___

### createEncryptionMethod

▸ `Static` **createEncryptionMethod**(`options`): `Promise`<[`VerificationMethod`](../modules/web5_dids.md#verificationmethod)\>

Decoding a multibase-encoded multicodec value into a verification method
that is suitable for verifying that encrypted information will be
received by the intended recipient.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.did` | `string` |
| `options.enableExperimentalPublicKeyTypes` | `boolean` |
| `options.multibaseValue` | `string` |
| `options.publicKeyFormat` | `string` |

#### Returns

`Promise`<[`VerificationMethod`](../modules/web5_dids.md#verificationmethod)\>

#### Defined in

[did-key.ts:293](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L293)

___

### createSignatureMethod

▸ `Static` **createSignatureMethod**(`options`): `Promise`<[`VerificationMethod`](../modules/web5_dids.md#verificationmethod)\>

Decodes a multibase-encoded multicodec value into a verification method
that is suitable for verifying digital signatures.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Signature method creation algorithm inputs. |
| `options.did` | `string` | - |
| `options.enableExperimentalPublicKeyTypes` | `boolean` | - |
| `options.multibaseValue` | `string` | - |
| `options.publicKeyFormat` | `string` | - |

#### Returns

`Promise`<[`VerificationMethod`](../modules/web5_dids.md#verificationmethod)\>

- A verification method.

#### Defined in

[did-key.ts:491](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L491)

___

### deriveEncryptionKey

▸ `Static` **deriveEncryptionKey**(`options`): `Promise`<[`DidKeyDeriveEncryptionKeyResult`](../modules/web5_dids.md#didkeyderiveencryptionkeyresult)\>

Transform a multibase-encoded multicodec value to public encryption key
components that are suitable for encrypting messages to a receiver. A
mathematical proof elaborating on the safety of performing this operation
is available in:
[On using the same key pair for Ed25519 and an X25519 based KEM](https://eprint.iacr.org/2021/509.pdf)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.multibaseValue` | `string` |

#### Returns

`Promise`<[`DidKeyDeriveEncryptionKeyResult`](../modules/web5_dids.md#didkeyderiveencryptionkeyresult)\>

#### Defined in

[did-key.ts:431](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L431)

___

### generateKeySet

▸ `Static` **generateKeySet**(`options?`): `Promise`<[`DidKeyKeySet`](../modules/web5_dids.md#didkeykeyset)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.keyAlgorithm?` | ``"Ed25519"`` \| ``"secp256k1"`` |

#### Returns

`Promise`<[`DidKeyKeySet`](../modules/web5_dids.md#didkeykeyset)\>

#### Defined in

[did-key.ts:636](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L636)

___

### getDefaultSigningKey

▸ `Static` **getDefaultSigningKey**(`options`): `Promise`<`string`\>

Given the W3C DID Document of a `did:key` DID, return the identifier of
the verification method key that will be used for signing messages and
credentials, by default.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didDocument` | [`DidDocument`](../modules/web5_dids.md#diddocument) |

#### Returns

`Promise`<`string`\>

Verification method identifier for the default signing key.

#### Defined in

[did-key.ts:690](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L690)

___

### resolve

▸ `Static` **resolve**(`options`): `Promise`<[`DidResolutionResult`](../modules/web5_dids.md#didresolutionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didUrl` | `string` |
| `options.resolutionOptions?` | [`DidResolutionOptions`](../interfaces/web5_dids.DidResolutionOptions.md) |

#### Returns

`Promise`<[`DidResolutionResult`](../modules/web5_dids.md#didresolutionresult)\>

#### Defined in

[did-key.ts:707](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L707)

___

### validateIdentifier

▸ `Static` **validateIdentifier**(`options`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.did` | `string` |

#### Returns

`boolean`

#### Defined in

[did-key.ts:758](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L758)
