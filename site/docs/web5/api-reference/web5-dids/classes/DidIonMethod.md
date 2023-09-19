# Class: DidIonMethod

## Implements

- [`DidMethod`](../interfaces/DidMethod.md)

## Table of contents

### Constructors

- [constructor](DidIonMethod.md#constructor)

### Properties

- [methodName](DidIonMethod.md#methodname)

### Methods

- [anchor](DidIonMethod.md#anchor)
- [create](DidIonMethod.md#create)
- [decodeLongFormDid](DidIonMethod.md#decodelongformdid)
- [generateDwnOptions](DidIonMethod.md#generatedwnoptions)
- [generateJwkKeyPair](DidIonMethod.md#generatejwkkeypair)
- [generateKeySet](DidIonMethod.md#generatekeyset)
- [getDefaultSigningKey](DidIonMethod.md#getdefaultsigningkey)
- [getLongFormDid](DidIonMethod.md#getlongformdid)
- [getShortFormDid](DidIonMethod.md#getshortformdid)
- [resolve](DidIonMethod.md#resolve)

## Constructors

### constructor

• **new DidIonMethod**()

## Properties

### methodName

▪ `Static` **methodName**: `string` = `'ion'`

Name of the DID method

#### Defined in

[did-ion.ts:77](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L77)

## Methods

### anchor

▸ `Static` **anchor**(`options`): `Promise`<[`DidResolutionResult`](../index.md#didresolutionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.challengeEnabled?` | `boolean` |
| `options.challengeEndpoint?` | `string` |
| `options.keySet` | [`DidIonKeySet`](../index.md#didionkeyset) |
| `options.operationsEndpoint?` | `string` |
| `options.services` | [`DidService`](../index.md#didservice)[] |

#### Returns

`Promise`<[`DidResolutionResult`](../index.md#didresolutionresult)\>

#### Defined in

[did-ion.ts:79](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L79)

___

### create

▸ `Static` **create**(`options?`): `Promise`<[`PortableDid`](../interfaces/PortableDid.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`DidIonCreateOptions`](../index.md#didioncreateoptions) |

#### Returns

`Promise`<[`PortableDid`](../interfaces/PortableDid.md)\>

#### Defined in

[did-ion.ts:137](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L137)

___

### decodeLongFormDid

▸ `Static` **decodeLongFormDid**(`options`): `Promise`<[`IonCreateRequestModel`](../interfaces/IonCreateRequestModel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didUrl` | `string` |

#### Returns

`Promise`<[`IonCreateRequestModel`](../interfaces/IonCreateRequestModel.md)\>

#### Defined in

[did-ion.ts:174](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L174)

___

### generateDwnOptions

▸ `Static` **generateDwnOptions**(`options`): `Promise`<[`DidIonCreateOptions`](../index.md#didioncreateoptions)\>

Generates two key pairs used for authorization and encryption purposes
when interfacing with DWNs. The IDs of these keys are referenced in the
service object that includes the dwnUrls provided.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.encryptionKeyId?` | `string` |
| `options.serviceEndpointNodes` | `string`[] |
| `options.serviceId?` | `string` |
| `options.signingKeyAlgorithm?` | ``"Ed25519"`` \| ``"secp256k1"`` |
| `options.signingKeyId?` | `string` |

#### Returns

`Promise`<[`DidIonCreateOptions`](../index.md#didioncreateoptions)\>

#### Defined in

[did-ion.ts:202](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L202)

___

### generateJwkKeyPair

▸ `Static` **generateJwkKeyPair**(`options`): `Promise`<`JwkKeyPair`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keyAlgorithm` | ``"Ed25519"`` \| ``"secp256k1"`` |
| `options.keyId?` | `string` |

#### Returns

`Promise`<`JwkKeyPair`\>

#### Defined in

[did-ion.ts:252](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L252)

___

### generateKeySet

▸ `Static` **generateKeySet**(`options?`): `Promise`<[`DidIonKeySet`](../index.md#didionkeyset)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.keyAlgorithm?` | ``"Ed25519"`` \| ``"secp256k1"`` |
| `options.keySet?` | [`DidIonKeySet`](../index.md#didionkeyset) |

#### Returns

`Promise`<[`DidIonKeySet`](../index.md#didionkeyset)\>

#### Defined in

[did-ion.ts:301](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L301)

___

### getDefaultSigningKey

▸ `Static` **getDefaultSigningKey**(`options`): `Promise`<`string`\>

Given the W3C DID Document of a `did:ion` DID, return the identifier of
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

[did-ion.ts:355](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L355)

___

### getLongFormDid

▸ `Static` **getLongFormDid**(`options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keySet` | [`DidIonKeySet`](../index.md#didionkeyset) |
| `options.services` | [`DidService`](../index.md#didservice)[] |

#### Returns

`Promise`<`string`\>

#### Defined in

[did-ion.ts:387](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L387)

___

### getShortFormDid

▸ `Static` **getShortFormDid**(`options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didUrl` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[did-ion.ts:413](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L413)

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

[did-ion.ts:429](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L429)
