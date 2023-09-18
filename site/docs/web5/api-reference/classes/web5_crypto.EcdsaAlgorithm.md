---
id: "web5_crypto.EcdsaAlgorithm"
title: "Class: EcdsaAlgorithm"
sidebar_label: "@web5/crypto.EcdsaAlgorithm"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).EcdsaAlgorithm

## Hierarchy

- [`BaseEcdsaAlgorithm`](web5_crypto.BaseEcdsaAlgorithm.md)

  ↳ **`EcdsaAlgorithm`**

## Constructors

### constructor

• **new EcdsaAlgorithm**()

#### Inherited from

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[constructor](web5_crypto.BaseEcdsaAlgorithm.md#constructor)

## Properties

### hashAlgorithms

• `Readonly` **hashAlgorithms**: `string`[]

#### Overrides

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[hashAlgorithms](web5_crypto.BaseEcdsaAlgorithm.md#hashalgorithms)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/ecdsa.ts:8](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L8)

___

### keyUsages

• `Readonly` **keyUsages**: [`KeyPairUsage`](../interfaces/web5_crypto.Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[keyUsages](web5_crypto.BaseEcdsaAlgorithm.md#keyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdsa.ts:13](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L13)

___

### name

• `Readonly` **name**: `string` = `'ECDSA'`

Name of the algorithm

#### Inherited from

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[name](web5_crypto.BaseEcdsaAlgorithm.md#name)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdsa.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L9)

___

### namedCurves

• `Readonly` **namedCurves**: `string`[]

#### Overrides

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[namedCurves](web5_crypto.BaseEcdsaAlgorithm.md#namedcurves)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/ecdsa.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L9)

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

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[checkAlgorithmName](web5_crypto.BaseEcdsaAlgorithm.md#checkalgorithmname)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

___

### checkAlgorithmOptions

▸ **checkAlgorithmOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdsaOptions`](../interfaces/web5_crypto.Web5Crypto.EcdsaOptions.md) |

#### Returns

`void`

#### Inherited from

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[checkAlgorithmOptions](web5_crypto.BaseEcdsaAlgorithm.md#checkalgorithmoptions)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdsa.ts:18](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L18)

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

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[checkCryptoKey](web5_crypto.BaseEcdsaAlgorithm.md#checkcryptokey)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:29](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L29)

___

### checkGenerateKey

▸ **checkGenerateKey**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcGenerateKeyOptions.md) |
| `options.keyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] |

#### Returns

`void`

#### Inherited from

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[checkGenerateKey](web5_crypto.BaseEcdsaAlgorithm.md#checkgeneratekey)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L11)

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

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[checkKeyAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md#checkkeyalgorithm)

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

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[checkKeyType](web5_crypto.BaseEcdsaAlgorithm.md#checkkeytype)

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

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[checkKeyUsages](web5_crypto.BaseEcdsaAlgorithm.md#checkkeyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[decrypt](web5_crypto.BaseEcdsaAlgorithm.md#decrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[deriveBits](web5_crypto.BaseEcdsaAlgorithm.md#derivebits)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdsa.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L30)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[encrypt](web5_crypto.BaseEcdsaAlgorithm.md#encrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L30)

___

### generateKey

▸ **generateKey**(`options`): `Promise`<[`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdsaGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcdsaGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)\>

#### Overrides

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[generateKey](web5_crypto.BaseEcdsaAlgorithm.md#generatekey)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/ecdsa.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L11)

___

### sign

▸ **sign**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdsaOptions`](../interfaces/web5_crypto.Web5Crypto.EcdsaOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[sign](web5_crypto.BaseEcdsaAlgorithm.md#sign)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/ecdsa.ts:45](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L45)

___

### verify

▸ **verify**(`options`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdsaOptions`](../interfaces/web5_crypto.Web5Crypto.EcdsaOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |
| `options.signature` | `Uint8Array` |

#### Returns

`Promise`<`boolean`\>

#### Overrides

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[verify](web5_crypto.BaseEcdsaAlgorithm.md#verify)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/ecdsa.ts:78](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L78)

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

[BaseEcdsaAlgorithm](web5_crypto.BaseEcdsaAlgorithm.md).[create](web5_crypto.BaseEcdsaAlgorithm.md#create)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
