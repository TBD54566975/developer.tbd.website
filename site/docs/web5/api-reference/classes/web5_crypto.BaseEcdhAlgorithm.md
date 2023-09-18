---
id: "web5_crypto.BaseEcdhAlgorithm"
title: "Class: BaseEcdhAlgorithm"
sidebar_label: "@web5/crypto.BaseEcdhAlgorithm"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).BaseEcdhAlgorithm

## Hierarchy

- [`BaseEllipticCurveAlgorithm`](web5_crypto.BaseEllipticCurveAlgorithm.md)

  ↳ **`BaseEcdhAlgorithm`**

  ↳↳ [`EcdhAlgorithm`](web5_crypto.EcdhAlgorithm.md)

## Constructors

### constructor

• **new BaseEcdhAlgorithm**()

#### Inherited from

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[constructor](web5_crypto.BaseEllipticCurveAlgorithm.md#constructor)

## Properties

### keyUsages

• **keyUsages**: [`KeyPairUsage`](../interfaces/web5_crypto.Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Overrides

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[keyUsages](web5_crypto.BaseEllipticCurveAlgorithm.md#keyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdh.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L11)

___

### name

• `Readonly` **name**: `string` = `'ECDH'`

Name of the algorithm

#### Overrides

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[name](web5_crypto.BaseEllipticCurveAlgorithm.md#name)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdh.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L9)

___

### namedCurves

• `Abstract` **namedCurves**: `string`[]

#### Inherited from

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[namedCurves](web5_crypto.BaseEllipticCurveAlgorithm.md#namedcurves)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L9)

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

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[checkAlgorithmName](web5_crypto.BaseEllipticCurveAlgorithm.md#checkalgorithmname)

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

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[checkCryptoKey](web5_crypto.BaseEllipticCurveAlgorithm.md#checkcryptokey)

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

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[checkGenerateKey](web5_crypto.BaseEllipticCurveAlgorithm.md#checkgeneratekey)

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

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[checkKeyAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md#checkkeyalgorithm)

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

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[checkKeyType](web5_crypto.BaseEllipticCurveAlgorithm.md#checkkeytype)

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

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[checkKeyUsages](web5_crypto.BaseEllipticCurveAlgorithm.md#checkkeyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[decrypt](web5_crypto.BaseEllipticCurveAlgorithm.md#decrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

___

### deriveBits

▸ `Abstract` **deriveBits**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md) \| [`EcdhDeriveKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcdhDeriveKeyOptions.md) |
| `options.baseKey` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |
| `options.length` | ``null`` \| `number` |

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[deriveBits](web5_crypto.BaseEllipticCurveAlgorithm.md#derivebits)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:97](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L97)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[encrypt](web5_crypto.BaseEllipticCurveAlgorithm.md#encrypt)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L30)

___

### generateKey

▸ `Abstract` **generateKey**(`options`): `Promise`<[`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)\>

#### Inherited from

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[generateKey](web5_crypto.BaseEllipticCurveAlgorithm.md#generatekey)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:34](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L34)

___

### sign

▸ **sign**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[sign](web5_crypto.BaseEllipticCurveAlgorithm.md#sign)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/ecdh.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L46)

___

### verify

▸ **verify**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[verify](web5_crypto.BaseEllipticCurveAlgorithm.md#verify)

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

[BaseEllipticCurveAlgorithm](web5_crypto.BaseEllipticCurveAlgorithm.md).[create](web5_crypto.BaseEllipticCurveAlgorithm.md#create)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
