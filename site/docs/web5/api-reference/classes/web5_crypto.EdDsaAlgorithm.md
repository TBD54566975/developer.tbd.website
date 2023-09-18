---
id: "web5_crypto.EdDsaAlgorithm"
title: "Class: EdDsaAlgorithm"
sidebar_label: "@web5/crypto.EdDsaAlgorithm"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).EdDsaAlgorithm

## Hierarchy

- [`BaseEdDsaAlgorithm`](web5_crypto.BaseEdDsaAlgorithm.md)

  ↳ **`EdDsaAlgorithm`**

## Constructors

### constructor

• **new EdDsaAlgorithm**()

#### Inherited from

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[constructor](web5_crypto.BaseEdDsaAlgorithm.md#constructor)

## Properties

### keyUsages

• `Readonly` **keyUsages**: [`KeyPairUsage`](../interfaces/web5_crypto.Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[keyUsages](web5_crypto.BaseEdDsaAlgorithm.md#keyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/eddsa.ts:10](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/eddsa.ts#L10)

___

### name

• `Readonly` **name**: `string` = `'EdDSA'`

Name of the algorithm

#### Inherited from

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[name](web5_crypto.BaseEdDsaAlgorithm.md#name)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/eddsa.ts:8](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/eddsa.ts#L8)

___

### namedCurves

• `Readonly` **namedCurves**: `string`[]

#### Overrides

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[namedCurves](web5_crypto.BaseEdDsaAlgorithm.md#namedcurves)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/eddsa.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/eddsa.ts#L9)

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

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[checkAlgorithmName](web5_crypto.BaseEdDsaAlgorithm.md#checkalgorithmname)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

___

### checkAlgorithmOptions

▸ **checkAlgorithmOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md) |

#### Returns

`void`

#### Inherited from

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[checkAlgorithmOptions](web5_crypto.BaseEdDsaAlgorithm.md#checkalgorithmoptions)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/eddsa.ts:15](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/eddsa.ts#L15)

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

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[checkCryptoKey](web5_crypto.BaseEdDsaAlgorithm.md#checkcryptokey)

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

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[checkGenerateKey](web5_crypto.BaseEdDsaAlgorithm.md#checkgeneratekey)

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

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[checkKeyAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md#checkkeyalgorithm)

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

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[checkKeyType](web5_crypto.BaseEdDsaAlgorithm.md#checkkeytype)

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

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[checkKeyUsages](web5_crypto.BaseEdDsaAlgorithm.md#checkkeyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[decrypt](web5_crypto.BaseEdDsaAlgorithm.md#decrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[deriveBits](web5_crypto.BaseEdDsaAlgorithm.md#derivebits)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/eddsa.ts:23](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/eddsa.ts#L23)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[encrypt](web5_crypto.BaseEdDsaAlgorithm.md#encrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L30)

___

### generateKey

▸ **generateKey**(`options`): `Promise`<[`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)\>

#### Overrides

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[generateKey](web5_crypto.BaseEdDsaAlgorithm.md#generatekey)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/eddsa.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/eddsa.ts#L11)

___

### sign

▸ **sign**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[sign](web5_crypto.BaseEdDsaAlgorithm.md#sign)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/eddsa.ts:44](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/eddsa.ts#L44)

___

### verify

▸ **verify**(`options`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |
| `options.signature` | `Uint8Array` |

#### Returns

`Promise`<`boolean`\>

#### Overrides

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[verify](web5_crypto.BaseEdDsaAlgorithm.md#verify)

#### Defined in

[web5-js/packages/crypto/src/crypto-algorithms/eddsa.ts:77](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/eddsa.ts#L77)

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

[BaseEdDsaAlgorithm](web5_crypto.BaseEdDsaAlgorithm.md).[create](web5_crypto.BaseEdDsaAlgorithm.md#create)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
