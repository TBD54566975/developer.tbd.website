---
id: "web5_crypto.BaseEllipticCurveAlgorithm"
title: "Class: BaseEllipticCurveAlgorithm"
sidebar_label: "@web5/crypto.BaseEllipticCurveAlgorithm"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).BaseEllipticCurveAlgorithm

## Hierarchy

- [`CryptoAlgorithm`](web5_crypto.CryptoAlgorithm.md)

  ↳ **`BaseEllipticCurveAlgorithm`**

  ↳↳ [`BaseEcdhAlgorithm`](web5_crypto.BaseEcdhAlgorithm.md)

  ↳↳ [`BaseEcdsaAlgorithm`](web5_crypto.BaseEcdsaAlgorithm.md)

  ↳↳ [`BaseEdDsaAlgorithm`](web5_crypto.BaseEdDsaAlgorithm.md)

## Constructors

### constructor

• **new BaseEllipticCurveAlgorithm**()

#### Inherited from

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[constructor](web5_crypto.CryptoAlgorithm.md#constructor)

## Properties

### keyUsages

• `Abstract` `Readonly` **keyUsages**: [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] \| [`KeyPairUsage`](../interfaces/web5_crypto.Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[keyUsages](web5_crypto.CryptoAlgorithm.md#keyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:15](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L15)

___

### name

• `Abstract` `Readonly` **name**: `string`

Name of the algorithm

#### Inherited from

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[name](web5_crypto.CryptoAlgorithm.md#name)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:10](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L10)

___

### namedCurves

• `Abstract` **namedCurves**: `string`[]

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

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[checkAlgorithmName](web5_crypto.CryptoAlgorithm.md#checkalgorithmname)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

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

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[checkCryptoKey](web5_crypto.CryptoAlgorithm.md#checkcryptokey)

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

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[checkKeyAlgorithm](web5_crypto.CryptoAlgorithm.md#checkkeyalgorithm)

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

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[checkKeyType](web5_crypto.CryptoAlgorithm.md#checkkeytype)

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

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[checkKeyUsages](web5_crypto.CryptoAlgorithm.md#checkkeyusages)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[decrypt](web5_crypto.CryptoAlgorithm.md#decrypt)

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

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[deriveBits](web5_crypto.CryptoAlgorithm.md#derivebits)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:97](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L97)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[encrypt](web5_crypto.CryptoAlgorithm.md#encrypt)

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

#### Overrides

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[generateKey](web5_crypto.CryptoAlgorithm.md#generatekey)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/ec/base.ts:34](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L34)

___

### sign

▸ `Abstract` **sign**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md) \| [`EcdsaOptions`](../interfaces/web5_crypto.Web5Crypto.EcdsaOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[sign](web5_crypto.CryptoAlgorithm.md#sign)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:115](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L115)

___

### verify

▸ `Abstract` **verify**(`options`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md) \| [`EcdsaOptions`](../interfaces/web5_crypto.Web5Crypto.EcdsaOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) |
| `options.signature` | `Uint8Array` |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[verify](web5_crypto.CryptoAlgorithm.md#verify)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:121](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L121)

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

[CryptoAlgorithm](web5_crypto.CryptoAlgorithm.md).[create](web5_crypto.CryptoAlgorithm.md#create)

#### Defined in

[web5-js/packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
