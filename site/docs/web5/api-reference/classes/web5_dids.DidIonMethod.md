---
id: "web5_dids.DidIonMethod"
title: "Class: DidIonMethod"
sidebar_label: "@web5/dids.DidIonMethod"
custom_edit_url: null
---

[@web5/dids](../modules/web5_dids.md).DidIonMethod

## Implements

- [`DidMethod`](../interfaces/web5_dids.DidMethod.md)

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

▸ `Static` **anchor**(`options`): `Promise`<[`DidResolutionResult`](../modules/web5_dids.md#didresolutionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.challengeEnabled?` | `boolean` |
| `options.challengeEndpoint?` | `string` |
| `options.keySet` | [`DidIonKeySet`](../modules/web5_dids.md#didionkeyset) |
| `options.operationsEndpoint?` | `string` |
| `options.services` | [`DidService`](../modules/web5_dids.md#didservice)[] |

#### Returns

`Promise`<[`DidResolutionResult`](../modules/web5_dids.md#didresolutionresult)\>

#### Defined in

[did-ion.ts:79](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L79)

___

### create

▸ `Static` **create**(`options?`): `Promise`<[`PortableDid`](../interfaces/web5_dids.PortableDid.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`DidIonCreateOptions`](../modules/web5_dids.md#didioncreateoptions) |

#### Returns

`Promise`<[`PortableDid`](../interfaces/web5_dids.PortableDid.md)\>

#### Defined in

[did-ion.ts:137](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L137)

___

### createIonDocument

▸ `Private` `Static` **createIonDocument**(`options`): `Promise`<`default`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keySet` | [`DidIonKeySet`](../modules/web5_dids.md#didionkeyset) |
| `options.services?` | [`DidService`](../modules/web5_dids.md#didservice)[] |

#### Returns

`Promise`<`default`\>

#### Defined in

[did-ion.ts:515](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L515)

___

### decodeLongFormDid

▸ `Static` **decodeLongFormDid**(`options`): `Promise`<[`IonCreateRequestModel`](../interfaces/web5_dids.IonCreateRequestModel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didUrl` | `string` |

#### Returns

`Promise`<[`IonCreateRequestModel`](../interfaces/web5_dids.IonCreateRequestModel.md)\>

#### Defined in

[did-ion.ts:174](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L174)

___

### generateDwnOptions

▸ `Static` **generateDwnOptions**(`options`): `Promise`<[`DidIonCreateOptions`](../modules/web5_dids.md#didioncreateoptions)\>

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

`Promise`<[`DidIonCreateOptions`](../modules/web5_dids.md#didioncreateoptions)\>

#### Defined in

[did-ion.ts:202](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L202)

___

### generateJwkKeyPair

▸ `Static` **generateJwkKeyPair**(`options`): `Promise`<[`JwkKeyPair`](../modules/web5_crypto.md#jwkkeypair)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keyAlgorithm` | ``"Ed25519"`` \| ``"secp256k1"`` |
| `options.keyId?` | `string` |

#### Returns

`Promise`<[`JwkKeyPair`](../modules/web5_crypto.md#jwkkeypair)\>

#### Defined in

[did-ion.ts:252](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L252)

___

### generateKeySet

▸ `Static` **generateKeySet**(`options?`): `Promise`<[`DidIonKeySet`](../modules/web5_dids.md#didionkeyset)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |
| `options.keyAlgorithm?` | ``"Ed25519"`` \| ``"secp256k1"`` |
| `options.keySet?` | [`DidIonKeySet`](../modules/web5_dids.md#didionkeyset) |

#### Returns

`Promise`<[`DidIonKeySet`](../modules/web5_dids.md#didionkeyset)\>

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
| `options.didDocument` | [`DidDocument`](../modules/web5_dids.md#diddocument) |

#### Returns

`Promise`<`string`\>

Verification method identifier for the default signing key.

#### Defined in

[did-ion.ts:355](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L355)

___

### getIonCreateRequest

▸ `Private` `Static` **getIonCreateRequest**(`options`): `Promise`<[`IonCreateRequestModel`](../interfaces/web5_dids.IonCreateRequestModel.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.ionDocument` | `default` |
| `options.recoveryPublicKeyJwk` | [`PublicKeyJwk`](../modules/web5_crypto.md#publickeyjwk) |
| `options.updatePublicKeyJwk` | [`PublicKeyJwk`](../modules/web5_crypto.md#publickeyjwk) |

#### Returns

`Promise`<[`IonCreateRequestModel`](../interfaces/web5_dids.IonCreateRequestModel.md)\>

#### Defined in

[did-ion.ts:578](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L578)

___

### getLongFormDid

▸ `Static` **getLongFormDid**(`options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keySet` | [`DidIonKeySet`](../modules/web5_dids.md#didionkeyset) |
| `options.services` | [`DidService`](../modules/web5_dids.md#didservice)[] |

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

### jwkToIonJwk

▸ `Private` `Static` **jwkToIonJwk**(`«destructured»`): `default` \| `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `key` | [`PublicKeyJwk`](../modules/web5_crypto.md#publickeyjwk) \| [`PrivateKeyJwk`](../modules/web5_crypto.md#privatekeyjwk) |

#### Returns

`default` \| `default`

#### Defined in

[did-ion.ts:595](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L595)

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

[did-ion.ts:429](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L429)
