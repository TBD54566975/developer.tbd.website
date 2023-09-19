# Class: DidKeyMethod

## Implements

- [`DidMethod`](../interfaces/DidMethod.md)

## Table of contents

### Constructors

- [constructor](DidKeyMethod.md#constructor)

### Properties

- [methodName](DidKeyMethod.md#methodname)

### Methods

- [create](DidKeyMethod.md#create)
- [createDocument](DidKeyMethod.md#createdocument)
- [createEncryptionMethod](DidKeyMethod.md#createencryptionmethod)
- [createSignatureMethod](DidKeyMethod.md#createsignaturemethod)
- [deriveEncryptionKey](DidKeyMethod.md#deriveencryptionkey)
- [generateKeySet](DidKeyMethod.md#generatekeyset)
- [getDefaultSigningKey](DidKeyMethod.md#getdefaultsigningkey)
- [resolve](DidKeyMethod.md#resolve)
- [validateIdentifier](DidKeyMethod.md#validateidentifier)

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

▸ `Static` **create**(`options?`): `Promise`<[`PortableDid`](../interfaces/PortableDid.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`DidKeyCreateOptions`](../index.md#didkeycreateoptions) |

#### Returns

`Promise`<[`PortableDid`](../interfaces/PortableDid.md)\>

#### Defined in

[did-key.ts:86](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L86)

___

### createDocument

▸ `Static` **createDocument**(`options`): `Promise`<[`DidDocument`](../index.md#diddocument)\>

Expands a did:key identifier to a DID Document.

Reference: https://w3c-ccg.github.io/did-method-key/#document-creation-algorithm

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`DidKeyCreateDocumentOptions`](../index.md#didkeycreatedocumentoptions) |

#### Returns

`Promise`<[`DidDocument`](../index.md#diddocument)\>

- A DID dodcument.

#### Defined in

[did-key.ts:136](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L136)

___

### createEncryptionMethod

▸ `Static` **createEncryptionMethod**(`options`): `Promise`<[`VerificationMethod`](../index.md#verificationmethod)\>

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

`Promise`<[`VerificationMethod`](../index.md#verificationmethod)\>

#### Defined in

[did-key.ts:293](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L293)

___

### createSignatureMethod

▸ `Static` **createSignatureMethod**(`options`): `Promise`<[`VerificationMethod`](../index.md#verificationmethod)\>

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

`Promise`<[`VerificationMethod`](../index.md#verificationmethod)\>

- A verification method.

#### Defined in

[did-key.ts:491](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L491)

___

### deriveEncryptionKey

▸ `Static` **deriveEncryptionKey**(`options`): `Promise`<[`DidKeyDeriveEncryptionKeyResult`](../index.md#didkeyderiveencryptionkeyresult)\>

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

`Promise`<[`DidKeyDeriveEncryptionKeyResult`](../index.md#didkeyderiveencryptionkeyresult)\>

#### Defined in

[did-key.ts:431](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L431)

___

### generateKeySet

▸ `Static` **generateKeySet**(`options?`): `Promise`<[`DidKeyKeySet`](../index.md#didkeykeyset)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.keyAlgorithm?` | ``"Ed25519"`` \| ``"secp256k1"`` |

#### Returns

`Promise`<[`DidKeyKeySet`](../index.md#didkeykeyset)\>

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
| `options.didDocument` | [`DidDocument`](../index.md#diddocument) |

#### Returns

`Promise`<`string`\>

Verification method identifier for the default signing key.

#### Defined in

[did-key.ts:690](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L690)

___

### resolve

▸ `Static` **resolve**(`options`): `Promise`<[`DidResolutionResult`](../index.md#didresolutionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didUrl` | `string` |
| `options.resolutionOptions?` | [`DidResolutionOptions`](../interfaces/DidResolutionOptions.md) |

#### Returns

`Promise`<[`DidResolutionResult`](../index.md#didresolutionresult)\>

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
