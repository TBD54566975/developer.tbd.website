# Class: BaseAesCtrAlgorithm

## Hierarchy

- [`BaseAesAlgorithm`](BaseAesAlgorithm.md)

  ↳ **`BaseAesCtrAlgorithm`**

  ↳↳ [`AesCtrAlgorithm`](AesCtrAlgorithm.md)

## Table of contents

### Constructors

- [constructor](BaseAesCtrAlgorithm.md#constructor)

### Properties

- [keyUsages](BaseAesCtrAlgorithm.md#keyusages)
- [name](BaseAesCtrAlgorithm.md#name)

### Methods

- [checkAlgorithmName](BaseAesCtrAlgorithm.md#checkalgorithmname)
- [checkAlgorithmOptions](BaseAesCtrAlgorithm.md#checkalgorithmoptions)
- [checkCryptoKey](BaseAesCtrAlgorithm.md#checkcryptokey)
- [checkGenerateKey](BaseAesCtrAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](BaseAesCtrAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](BaseAesCtrAlgorithm.md#checkkeytype)
- [checkKeyUsages](BaseAesCtrAlgorithm.md#checkkeyusages)
- [decrypt](BaseAesCtrAlgorithm.md#decrypt)
- [deriveBits](BaseAesCtrAlgorithm.md#derivebits)
- [encrypt](BaseAesCtrAlgorithm.md#encrypt)
- [generateKey](BaseAesCtrAlgorithm.md#generatekey)
- [sign](BaseAesCtrAlgorithm.md#sign)
- [verify](BaseAesCtrAlgorithm.md#verify)
- [create](BaseAesCtrAlgorithm.md#create)

## Constructors

### constructor

• **new BaseAesCtrAlgorithm**()

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[constructor](BaseAesAlgorithm.md#constructor)

## Properties

### keyUsages

• `Readonly` **keyUsages**: [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[]

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Overrides

[BaseAesAlgorithm](BaseAesAlgorithm.md).[keyUsages](BaseAesAlgorithm.md#keyusages)

#### Defined in

[packages/crypto/src/algorithms-api/aes/ctr.ts:13](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/ctr.ts#L13)

___

### name

• `Readonly` **name**: ``"AES-CTR"``

Name of the algorithm

#### Overrides

[BaseAesAlgorithm](BaseAesAlgorithm.md).[name](BaseAesAlgorithm.md#name)

#### Defined in

[packages/crypto/src/algorithms-api/aes/ctr.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/ctr.ts#L11)

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

[BaseAesAlgorithm](BaseAesAlgorithm.md).[checkAlgorithmName](BaseAesAlgorithm.md#checkalgorithmname)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

___

### checkAlgorithmOptions

▸ **checkAlgorithmOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesCtrOptions`](../interfaces/Web5Crypto.AesCtrOptions.md) |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`void`

#### Defined in

[packages/crypto/src/algorithms-api/aes/ctr.ts:15](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/ctr.ts#L15)

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

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[checkCryptoKey](BaseAesAlgorithm.md#checkcryptokey)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:29](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L29)

___

### checkGenerateKey

▸ **checkGenerateKey**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesGenerateKeyOptions`](../interfaces/Web5Crypto.AesGenerateKeyOptions.md) |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`void`

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[checkGenerateKey](BaseAesAlgorithm.md#checkgeneratekey)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L11)

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

[BaseAesAlgorithm](BaseAesAlgorithm.md).[checkKeyAlgorithm](BaseAesAlgorithm.md#checkkeyalgorithm)

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

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[checkKeyType](BaseAesAlgorithm.md#checkkeytype)

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

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[checkKeyUsages](BaseAesAlgorithm.md#checkkeyusages)

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

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[decrypt](BaseAesAlgorithm.md#decrypt)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:91](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L91)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[deriveBits](BaseAesAlgorithm.md#derivebits)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:38](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L38)

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

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[encrypt](BaseAesAlgorithm.md#encrypt)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:103](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L103)

___

### generateKey

▸ `Abstract` **generateKey**(`options`): `Promise`<[`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesGenerateKeyOptions`](../interfaces/Web5Crypto.AesGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md)\>

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[generateKey](BaseAesAlgorithm.md#generatekey)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:32](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L32)

___

### sign

▸ **sign**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[sign](BaseAesAlgorithm.md#sign)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:42](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L42)

___

### verify

▸ **verify**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[verify](BaseAesAlgorithm.md#verify)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L46)

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

#### Inherited from

[BaseAesAlgorithm](BaseAesAlgorithm.md).[create](BaseAesAlgorithm.md#create)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
