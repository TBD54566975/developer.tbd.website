# Class: CryptoAlgorithm

## Hierarchy

- **`CryptoAlgorithm`**

  ↳ [`BaseEllipticCurveAlgorithm`](BaseEllipticCurveAlgorithm.md)

  ↳ [`BaseAesAlgorithm`](BaseAesAlgorithm.md)

## Table of contents

### Constructors

- [constructor](CryptoAlgorithm.md#constructor)

### Properties

- [keyUsages](CryptoAlgorithm.md#keyusages)
- [name](CryptoAlgorithm.md#name)

### Methods

- [checkAlgorithmName](CryptoAlgorithm.md#checkalgorithmname)
- [checkCryptoKey](CryptoAlgorithm.md#checkcryptokey)
- [checkKeyAlgorithm](CryptoAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](CryptoAlgorithm.md#checkkeytype)
- [checkKeyUsages](CryptoAlgorithm.md#checkkeyusages)
- [decrypt](CryptoAlgorithm.md#decrypt)
- [deriveBits](CryptoAlgorithm.md#derivebits)
- [encrypt](CryptoAlgorithm.md#encrypt)
- [generateKey](CryptoAlgorithm.md#generatekey)
- [sign](CryptoAlgorithm.md#sign)
- [verify](CryptoAlgorithm.md#verify)
- [create](CryptoAlgorithm.md#create)

## Constructors

### constructor

• **new CryptoAlgorithm**()

## Properties

### keyUsages

• `Readonly` `Abstract` **keyUsages**: [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] \| [`KeyPairUsage`](../interfaces/Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:15](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L15)

___

### name

• `Readonly` `Abstract` **name**: `string`

Name of the algorithm

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:10](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L10)

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

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

___

### checkCryptoKey

▸ **checkCryptoKey**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`void`

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:29](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L29)

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

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:38](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L38)

___

### checkKeyType

▸ **checkKeyType**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.allowedKeyType` | [`KeyType`](../modules/Web5Crypto.md#keytype) |
| `options.keyType` | [`KeyType`](../modules/Web5Crypto.md#keytype) |

#### Returns

`void`

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:50](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L50)

___

### checkKeyUsages

▸ **checkKeyUsages**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.allowedKeyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] \| [`KeyPairUsage`](../interfaces/Web5Crypto.KeyPairUsage.md) |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`void`

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ `Abstract` **decrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesCtrOptions`](../interfaces/Web5Crypto.AesCtrOptions.md) \| [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md) \| [`AesGcmOptions`](../interfaces/Web5Crypto.AesGcmOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:91](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L91)

___

### deriveBits

▸ `Abstract` **deriveBits**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md) \| [`EcdhDeriveKeyOptions`](../interfaces/Web5Crypto.EcdhDeriveKeyOptions.md) |
| `options.baseKey` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |
| `options.length` | ``null`` \| `number` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:97](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L97)

___

### encrypt

▸ `Abstract` **encrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesCtrOptions`](../interfaces/Web5Crypto.AesCtrOptions.md) \| [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md) \| [`AesGcmOptions`](../interfaces/Web5Crypto.AesGcmOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:103](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L103)

___

### generateKey

▸ `Abstract` **generateKey**(`options`): `Promise`<[`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) \| [`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | `Partial`<[`GenerateKeyOptions`](../modules/Web5Crypto.md#generatekeyoptions)\> |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) \| [`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:109](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L109)

___

### sign

▸ `Abstract` **sign**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md) \| [`EcdsaOptions`](../interfaces/Web5Crypto.EcdsaOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:115](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L115)

___

### verify

▸ `Abstract` **verify**(`options`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md) \| [`EcdsaOptions`](../interfaces/Web5Crypto.EcdsaOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |
| `options.signature` | `Uint8Array` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:121](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L121)

___

### create

▸ `Static` **create**<`T`\>(`this`): `T`

Creates an instance of the class on which it is called.

This is a generic factory method that creates an instance of any
crypto algorithm that extends this abstract class.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`CryptoAlgorithm`](CryptoAlgorithm.md) | The type of the instance to be created. |

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | () => `T` |

#### Returns

`T`

An instance of the class it is called on.

**`Throws`**

If the class it is called on cannot be constructed.

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
