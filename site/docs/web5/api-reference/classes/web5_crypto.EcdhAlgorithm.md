---
id: "web5_crypto.EcdhAlgorithm"
title: "Class: EcdhAlgorithm"
sidebar_label: "@web5/crypto.EcdhAlgorithm"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).EcdhAlgorithm

## Hierarchy

- [`BaseEcdhAlgorithm`](web5_crypto.BaseEcdhAlgorithm.md)

  ↳ **`EcdhAlgorithm`**

## Constructors

### constructor

• **new EcdhAlgorithm**()

#### Inherited from

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[constructor](web5_crypto.BaseEcdhAlgorithm.md#constructor)

## Properties

### keyUsages

• **keyUsages**: [`KeyPairUsage`](../interfaces/web5_crypto.Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[keyUsages](web5_crypto.BaseEcdhAlgorithm.md#keyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdh.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L11)

___

### name

• `Readonly` **name**: `string` = `'ECDH'`

Name of the algorithm

#### Inherited from

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[name](web5_crypto.BaseEcdhAlgorithm.md#name)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdh.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L9)

___

### namedCurves

• `Readonly` **namedCurves**: `string`[]

#### Overrides

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[namedCurves](web5_crypto.BaseEcdhAlgorithm.md#namedcurves)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/ecdh.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdh.ts#L9)

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

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[checkAlgorithmName](web5_crypto.BaseEcdhAlgorithm.md#checkalgorithmname)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

___

### checkAlgorithmOptions

▸ **checkAlgorithmOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdhDeriveKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcdhDeriveKeyOptions.md) |
| `options.baseKey` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |

#### Returns

`void`

#### Inherited from

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[checkAlgorithmOptions](web5_crypto.BaseEcdhAlgorithm.md#checkalgorithmoptions)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdh.ts:16](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L16)

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

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[checkCryptoKey](web5_crypto.BaseEcdhAlgorithm.md#checkcryptokey)

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

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[checkGenerateKey](web5_crypto.BaseEcdhAlgorithm.md#checkgeneratekey)

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

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[checkKeyAlgorithm](web5_crypto.BaseEcdhAlgorithm.md#checkkeyalgorithm)

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

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[checkKeyType](web5_crypto.BaseEcdhAlgorithm.md#checkkeytype)

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

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[checkKeyUsages](web5_crypto.BaseEcdhAlgorithm.md#checkkeyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[decrypt](web5_crypto.BaseEcdhAlgorithm.md#decrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

___

### deriveBits

▸ **deriveBits**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdhDeriveKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcdhDeriveKeyOptions.md) |
| `options.baseKey` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |
| `options.length` | ``null`` \| `number` |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[deriveBits](web5_crypto.BaseEcdhAlgorithm.md#derivebits)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/ecdh.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdh.ts#L11)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[encrypt](web5_crypto.BaseEcdhAlgorithm.md#encrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L30)

___

### generateKey

▸ **generateKey**(`options`): `Promise`<[`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcGenerateKeyOptions.md) \| [`EcdsaGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcdsaGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)\>

#### Overrides

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[generateKey](web5_crypto.BaseEcdhAlgorithm.md#generatekey)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/ecdh.ts:75](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdh.ts#L75)

___

### sign

▸ **sign**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[sign](web5_crypto.BaseEcdhAlgorithm.md#sign)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdh.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L46)

___

### verify

▸ **verify**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[verify](web5_crypto.BaseEcdhAlgorithm.md#verify)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdh.ts:50](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L50)

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

[BaseEcdhAlgorithm](web5_crypto.BaseEcdhAlgorithm.md).[create](web5_crypto.BaseEcdhAlgorithm.md#create)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
