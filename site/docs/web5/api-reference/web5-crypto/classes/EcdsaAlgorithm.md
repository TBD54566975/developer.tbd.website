# Class: EcdsaAlgorithm

## Hierarchy

- [`BaseEcdsaAlgorithm`](BaseEcdsaAlgorithm.md)

  ↳ **`EcdsaAlgorithm`**

## Table of contents

### Constructors

- [constructor](EcdsaAlgorithm.md#constructor)

### Properties

- [hashAlgorithms](EcdsaAlgorithm.md#hashalgorithms)
- [keyUsages](EcdsaAlgorithm.md#keyusages)
- [name](EcdsaAlgorithm.md#name)
- [namedCurves](EcdsaAlgorithm.md#namedcurves)

### Methods

- [checkAlgorithmName](EcdsaAlgorithm.md#checkalgorithmname)
- [checkAlgorithmOptions](EcdsaAlgorithm.md#checkalgorithmoptions)
- [checkCryptoKey](EcdsaAlgorithm.md#checkcryptokey)
- [checkGenerateKey](EcdsaAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](EcdsaAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](EcdsaAlgorithm.md#checkkeytype)
- [checkKeyUsages](EcdsaAlgorithm.md#checkkeyusages)
- [decrypt](EcdsaAlgorithm.md#decrypt)
- [deriveBits](EcdsaAlgorithm.md#derivebits)
- [encrypt](EcdsaAlgorithm.md#encrypt)
- [generateKey](EcdsaAlgorithm.md#generatekey)
- [sign](EcdsaAlgorithm.md#sign)
- [verify](EcdsaAlgorithm.md#verify)
- [create](EcdsaAlgorithm.md#create)

## Constructors

### constructor

• **new EcdsaAlgorithm**()

#### Inherited from

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[constructor](BaseEcdsaAlgorithm.md#constructor)

## Properties

### hashAlgorithms

• `Readonly` **hashAlgorithms**: `string`[]

#### Overrides

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[hashAlgorithms](BaseEcdsaAlgorithm.md#hashalgorithms)

#### Defined in

[packages/crypto/src/crypto-algorithms/ecdsa.ts:8](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L8)

___

### keyUsages

• `Readonly` **keyUsages**: [`KeyPairUsage`](../interfaces/Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[keyUsages](BaseEcdsaAlgorithm.md#keyusages)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:13](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L13)

___

### name

• `Readonly` **name**: `string` = `'ECDSA'`

Name of the algorithm

#### Inherited from

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[name](BaseEcdsaAlgorithm.md#name)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L9)

___

### namedCurves

• `Readonly` **namedCurves**: `string`[]

#### Overrides

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[namedCurves](BaseEcdsaAlgorithm.md#namedcurves)

#### Defined in

[packages/crypto/src/crypto-algorithms/ecdsa.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L9)

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

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[checkAlgorithmName](BaseEcdsaAlgorithm.md#checkalgorithmname)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

___

### checkAlgorithmOptions

▸ **checkAlgorithmOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdsaOptions`](../interfaces/Web5Crypto.EcdsaOptions.md) |

#### Returns

`void`

#### Inherited from

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[checkAlgorithmOptions](BaseEcdsaAlgorithm.md#checkalgorithmoptions)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:18](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L18)

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

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[checkCryptoKey](BaseEcdsaAlgorithm.md#checkcryptokey)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:29](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L29)

___

### checkGenerateKey

▸ **checkGenerateKey**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcGenerateKeyOptions`](../interfaces/Web5Crypto.EcGenerateKeyOptions.md) |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`void`

#### Inherited from

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[checkGenerateKey](BaseEcdsaAlgorithm.md#checkgeneratekey)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L11)

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

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[checkKeyAlgorithm](BaseEcdsaAlgorithm.md#checkkeyalgorithm)

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

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[checkKeyType](BaseEcdsaAlgorithm.md#checkkeytype)

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

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[checkKeyUsages](BaseEcdsaAlgorithm.md#checkkeyusages)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[decrypt](BaseEcdsaAlgorithm.md#decrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[deriveBits](BaseEcdsaAlgorithm.md#derivebits)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L30)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[encrypt](BaseEcdsaAlgorithm.md#encrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L30)

___

### generateKey

▸ **generateKey**(`options`): `Promise`<[`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdsaGenerateKeyOptions`](../interfaces/Web5Crypto.EcdsaGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

#### Overrides

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[generateKey](BaseEcdsaAlgorithm.md#generatekey)

#### Defined in

[packages/crypto/src/crypto-algorithms/ecdsa.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L11)

___

### sign

▸ **sign**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdsaOptions`](../interfaces/Web5Crypto.EcdsaOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[sign](BaseEcdsaAlgorithm.md#sign)

#### Defined in

[packages/crypto/src/crypto-algorithms/ecdsa.ts:45](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L45)

___

### verify

▸ **verify**(`options`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdsaOptions`](../interfaces/Web5Crypto.EcdsaOptions.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |
| `options.signature` | `Uint8Array` |

#### Returns

`Promise`<`boolean`\>

#### Overrides

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[verify](BaseEcdsaAlgorithm.md#verify)

#### Defined in

[packages/crypto/src/crypto-algorithms/ecdsa.ts:78](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdsa.ts#L78)

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

[BaseEcdsaAlgorithm](BaseEcdsaAlgorithm.md).[create](BaseEcdsaAlgorithm.md#create)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
