# Class: AesCtrAlgorithm

## Hierarchy

- [`BaseAesCtrAlgorithm`](BaseAesCtrAlgorithm.md)

  ↳ **`AesCtrAlgorithm`**

## Table of contents

### Constructors

- [constructor](AesCtrAlgorithm.md#constructor)

### Properties

- [keyUsages](AesCtrAlgorithm.md#keyusages)
- [name](AesCtrAlgorithm.md#name)

### Methods

- [checkAlgorithmName](AesCtrAlgorithm.md#checkalgorithmname)
- [checkAlgorithmOptions](AesCtrAlgorithm.md#checkalgorithmoptions)
- [checkCryptoKey](AesCtrAlgorithm.md#checkcryptokey)
- [checkGenerateKey](AesCtrAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](AesCtrAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](AesCtrAlgorithm.md#checkkeytype)
- [checkKeyUsages](AesCtrAlgorithm.md#checkkeyusages)
- [decrypt](AesCtrAlgorithm.md#decrypt)
- [deriveBits](AesCtrAlgorithm.md#derivebits)
- [encrypt](AesCtrAlgorithm.md#encrypt)
- [generateKey](AesCtrAlgorithm.md#generatekey)
- [sign](AesCtrAlgorithm.md#sign)
- [verify](AesCtrAlgorithm.md#verify)
- [create](AesCtrAlgorithm.md#create)

## Constructors

### constructor

• **new AesCtrAlgorithm**()

#### Inherited from

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[constructor](BaseAesCtrAlgorithm.md#constructor)

## Properties

### keyUsages

• `Readonly` **keyUsages**: [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[]

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[keyUsages](BaseAesCtrAlgorithm.md#keyusages)

#### Defined in

[packages/crypto/src/algorithms-api/aes/ctr.ts:13](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/ctr.ts#L13)

___

### name

• `Readonly` **name**: ``"AES-CTR"``

Name of the algorithm

#### Inherited from

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[name](BaseAesCtrAlgorithm.md#name)

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

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[checkAlgorithmName](BaseAesCtrAlgorithm.md#checkalgorithmname)

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

#### Inherited from

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[checkAlgorithmOptions](BaseAesCtrAlgorithm.md#checkalgorithmoptions)

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

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[checkCryptoKey](BaseAesCtrAlgorithm.md#checkcryptokey)

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

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[checkGenerateKey](BaseAesCtrAlgorithm.md#checkgeneratekey)

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

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[checkKeyAlgorithm](BaseAesCtrAlgorithm.md#checkkeyalgorithm)

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

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[checkKeyType](BaseAesCtrAlgorithm.md#checkkeytype)

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

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[checkKeyUsages](BaseAesCtrAlgorithm.md#checkkeyusages)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesCtrOptions`](../interfaces/Web5Crypto.AesCtrOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[decrypt](BaseAesCtrAlgorithm.md#decrypt)

#### Defined in

[packages/crypto/src/crypto-algorithms/aes-ctr.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/aes-ctr.ts#L9)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[deriveBits](BaseAesCtrAlgorithm.md#derivebits)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:38](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L38)

___

### encrypt

▸ **encrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`AesCtrOptions`](../interfaces/Web5Crypto.AesCtrOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[encrypt](BaseAesCtrAlgorithm.md#encrypt)

#### Defined in

[packages/crypto/src/crypto-algorithms/aes-ctr.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/aes-ctr.ts#L30)

___

### generateKey

▸ **generateKey**(`options`): `Promise`<[`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md)\>

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

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[generateKey](BaseAesCtrAlgorithm.md#generatekey)

#### Defined in

[packages/crypto/src/crypto-algorithms/aes-ctr.ts:51](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/aes-ctr.ts#L51)

___

### sign

▸ **sign**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[sign](BaseAesCtrAlgorithm.md#sign)

#### Defined in

[packages/crypto/src/algorithms-api/aes/base.ts:42](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/aes/base.ts#L42)

___

### verify

▸ **verify**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[verify](BaseAesCtrAlgorithm.md#verify)

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

[BaseAesCtrAlgorithm](BaseAesCtrAlgorithm.md).[create](BaseAesCtrAlgorithm.md#create)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
