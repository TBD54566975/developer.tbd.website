---
id: "web5_crypto.BaseAesCtrAlgorithm"
title: "Class: BaseAesCtrAlgorithm"
sidebar_label: "@web5/crypto.BaseAesCtrAlgorithm"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).BaseAesCtrAlgorithm

## Hierarchy

- [`BaseAesAlgorithm`](web5_crypto.BaseAesAlgorithm.md)

  ↳ **`BaseAesCtrAlgorithm`**

  ↳↳ [`AesCtrAlgorithm`](web5_crypto.AesCtrAlgorithm.md)

## Constructors

### constructor

• **new BaseAesCtrAlgorithm**()

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[constructor](web5_crypto.BaseAesAlgorithm.md#constructor)

## Properties

### keyUsages

• `Readonly` **keyUsages**: [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[]

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Overrides

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[keyUsages](web5_crypto.BaseAesAlgorithm.md#keyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/aes/ctr.ts:13](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/ctr.ts#L13)

___

### name

• `Readonly` **name**: ``"AES-CTR"``

Name of the algorithm

#### Overrides

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[name](web5_crypto.BaseAesAlgorithm.md#name)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/aes/ctr.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/ctr.ts#L11)

## Methods

### checkAlgorithmName

▸ **checkAlgorithmName**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithmName` | `string` |

#### Returns

`void`

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[checkAlgorithmName](web5_crypto.BaseAesAlgorithm.md#checkalgorithmname)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

___

### checkAlgorithmOptions

▸ **checkAlgorithmOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesCtrOptions`](../interfaces/web5_crypto.Web5Crypto.AesCtrOptions.md) |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |

#### Returns

`void`

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/aes/ctr.ts:15](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/ctr.ts#L15)

___

### checkCryptoKey

▸ **checkCryptoKey**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |

#### Returns

`void`

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[checkCryptoKey](web5_crypto.BaseAesAlgorithm.md#checkcryptokey)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:29](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L29)

___

### checkGenerateKey

▸ **checkGenerateKey**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.AesGenerateKeyOptions.md) |
| `options.keyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] |

#### Returns

`void`

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[checkGenerateKey](web5_crypto.BaseAesAlgorithm.md#checkgeneratekey)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/aes/base.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L11)

___

### checkKeyAlgorithm

▸ **checkKeyAlgorithm**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keyAlgorithmName` | `string` |

#### Returns

`void`

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[checkKeyAlgorithm](web5_crypto.BaseAesAlgorithm.md#checkkeyalgorithm)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:38](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L38)

___

### checkKeyType

▸ **checkKeyType**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.allowedKeyType` | [`KeyType`](../namespaces/web5_crypto.Web5Crypto.md#keytype) |
| `options.keyType` | [`KeyType`](../namespaces/web5_crypto.Web5Crypto.md#keytype) |

#### Returns

`void`

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[checkKeyType](web5_crypto.BaseAesAlgorithm.md#checkkeytype)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:50](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L50)

___

### checkKeyUsages

▸ **checkKeyUsages**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.allowedKeyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] \| [`KeyPairUsage`](../interfaces/web5_crypto.Web5Crypto.KeyPairUsage.md) |
| `options.keyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] |

#### Returns

`void`

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[checkKeyUsages](web5_crypto.BaseAesAlgorithm.md#checkkeyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ `Abstract` **decrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesCtrOptions`](../interfaces/web5_crypto.Web5Crypto.AesCtrOptions.md) \| [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md) \| [`AesGcmOptions`](../interfaces/web5_crypto.Web5Crypto.AesGcmOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[decrypt](web5_crypto.BaseAesAlgorithm.md#decrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:91](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L91)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[deriveBits](web5_crypto.BaseAesAlgorithm.md#derivebits)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/aes/base.ts:38](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L38)

___

### encrypt

▸ `Abstract` **encrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesCtrOptions`](../interfaces/web5_crypto.Web5Crypto.AesCtrOptions.md) \| [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md) \| [`AesGcmOptions`](../interfaces/web5_crypto.Web5Crypto.AesGcmOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[encrypt](web5_crypto.BaseAesAlgorithm.md#encrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:103](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L103)

___

### generateKey

▸ `Abstract` **generateKey**(`options`): `Promise`<[`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.AesGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md)\>

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[generateKey](web5_crypto.BaseAesAlgorithm.md#generatekey)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/aes/base.ts:32](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L32)

___

### sign

▸ **sign**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[sign](web5_crypto.BaseAesAlgorithm.md#sign)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/aes/base.ts:42](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L42)

___

### verify

▸ **verify**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[verify](web5_crypto.BaseAesAlgorithm.md#verify)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/aes/base.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L46)

___

### create

▸ `Static` **create**<`T`\>(`this`): `T`

Creates an instance of the class on which it is called.

This is a generic factory method that creates an instance of any
crypto algorithm that extends this abstract class.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`CryptoAlgorithm`](web5_crypto.CryptoAlgorithm.md) | The type of the instance to be created. |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | () => `T` |

#### Returns

`T`

An instance of the class it is called on.

**`Throws`**

If the class it is called on cannot be constructed.

#### Inherited from

[BaseAesAlgorithm](web5_crypto.BaseAesAlgorithm.md).[create](web5_crypto.BaseAesAlgorithm.md#create)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
