# Class: BaseAesAlgorithm

## Hierarchy

- [`CryptoAlgorithm`](CryptoAlgorithm.md)

  ↳ **`BaseAesAlgorithm`**

  ↳↳ [`BaseAesCtrAlgorithm`](BaseAesCtrAlgorithm.md)

## Table of contents

### Constructors

- [constructor](BaseAesAlgorithm.md#constructor)

### Properties

- [keyUsages](BaseAesAlgorithm.md#keyusages)
- [name](BaseAesAlgorithm.md#name)

### Methods

- [checkAlgorithmName](BaseAesAlgorithm.md#checkalgorithmname)
- [checkCryptoKey](BaseAesAlgorithm.md#checkcryptokey)
- [checkGenerateKey](BaseAesAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](BaseAesAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](BaseAesAlgorithm.md#checkkeytype)
- [checkKeyUsages](BaseAesAlgorithm.md#checkkeyusages)
- [decrypt](BaseAesAlgorithm.md#decrypt)
- [deriveBits](BaseAesAlgorithm.md#derivebits)
- [encrypt](BaseAesAlgorithm.md#encrypt)
- [generateKey](BaseAesAlgorithm.md#generatekey)
- [sign](BaseAesAlgorithm.md#sign)
- [verify](BaseAesAlgorithm.md#verify)
- [create](BaseAesAlgorithm.md#create)

## Constructors

### constructor

• **new BaseAesAlgorithm**()

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[constructor](CryptoAlgorithm.md#constructor)

## Properties

### keyUsages

• `Readonly` `Abstract` **keyUsages**: [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] \| [`KeyPairUsage`](../interfaces/Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[keyUsages](CryptoAlgorithm.md#keyusages)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:15](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L15)

___

### name

• `Readonly` `Abstract` **name**: `string`

Name of the algorithm

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[name](CryptoAlgorithm.md#name)

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

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[checkAlgorithmName](CryptoAlgorithm.md#checkalgorithmname)

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

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[checkCryptoKey](CryptoAlgorithm.md#checkcryptokey)

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

[CryptoAlgorithm](CryptoAlgorithm.md).[checkKeyAlgorithm](CryptoAlgorithm.md#checkkeyalgorithm)

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

[CryptoAlgorithm](CryptoAlgorithm.md).[checkKeyType](CryptoAlgorithm.md#checkkeytype)

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

[CryptoAlgorithm](CryptoAlgorithm.md).[checkKeyUsages](CryptoAlgorithm.md#checkkeyusages)

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

[CryptoAlgorithm](CryptoAlgorithm.md).[decrypt](CryptoAlgorithm.md#decrypt)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:91](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L91)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[CryptoAlgorithm](CryptoAlgorithm.md).[deriveBits](CryptoAlgorithm.md#derivebits)

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

[CryptoAlgorithm](CryptoAlgorithm.md).[encrypt](CryptoAlgorithm.md#encrypt)

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

#### Overrides

[CryptoAlgorithm](CryptoAlgorithm.md).[generateKey](CryptoAlgorithm.md#generatekey)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:32](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L32)

___

### sign

▸ **sign**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[CryptoAlgorithm](CryptoAlgorithm.md).[sign](CryptoAlgorithm.md#sign)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:42](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L42)

___

### verify

▸ **verify**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[CryptoAlgorithm](CryptoAlgorithm.md).[verify](CryptoAlgorithm.md#verify)

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

[CryptoAlgorithm](CryptoAlgorithm.md).[create](CryptoAlgorithm.md#create)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
