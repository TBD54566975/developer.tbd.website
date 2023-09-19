# Class: BaseEcdsaAlgorithm

## Hierarchy

- [`BaseEllipticCurveAlgorithm`](BaseEllipticCurveAlgorithm.md)

  ↳ **`BaseEcdsaAlgorithm`**

  ↳↳ [`EcdsaAlgorithm`](EcdsaAlgorithm.md)

## Table of contents

### Constructors

- [constructor](BaseEcdsaAlgorithm.md#constructor)

### Properties

- [hashAlgorithms](BaseEcdsaAlgorithm.md#hashalgorithms)
- [keyUsages](BaseEcdsaAlgorithm.md#keyusages)
- [name](BaseEcdsaAlgorithm.md#name)
- [namedCurves](BaseEcdsaAlgorithm.md#namedcurves)

### Methods

- [checkAlgorithmName](BaseEcdsaAlgorithm.md#checkalgorithmname)
- [checkAlgorithmOptions](BaseEcdsaAlgorithm.md#checkalgorithmoptions)
- [checkCryptoKey](BaseEcdsaAlgorithm.md#checkcryptokey)
- [checkGenerateKey](BaseEcdsaAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](BaseEcdsaAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](BaseEcdsaAlgorithm.md#checkkeytype)
- [checkKeyUsages](BaseEcdsaAlgorithm.md#checkkeyusages)
- [decrypt](BaseEcdsaAlgorithm.md#decrypt)
- [deriveBits](BaseEcdsaAlgorithm.md#derivebits)
- [encrypt](BaseEcdsaAlgorithm.md#encrypt)
- [generateKey](BaseEcdsaAlgorithm.md#generatekey)
- [sign](BaseEcdsaAlgorithm.md#sign)
- [verify](BaseEcdsaAlgorithm.md#verify)
- [create](BaseEcdsaAlgorithm.md#create)

## Constructors

### constructor

• **new BaseEcdsaAlgorithm**()

#### Inherited from

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[constructor](BaseEllipticCurveAlgorithm.md#constructor)

## Properties

### hashAlgorithms

• `Readonly` `Abstract` **hashAlgorithms**: `string`[]

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L11)

___

### keyUsages

• `Readonly` **keyUsages**: [`KeyPairUsage`](../interfaces/Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Overrides

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[keyUsages](BaseEllipticCurveAlgorithm.md#keyusages)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:13](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L13)

___

### name

• `Readonly` **name**: `string` = `'ECDSA'`

Name of the algorithm

#### Overrides

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[name](BaseEllipticCurveAlgorithm.md#name)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L9)

___

### namedCurves

• `Abstract` **namedCurves**: `string`[]

#### Inherited from

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[namedCurves](BaseEllipticCurveAlgorithm.md#namedcurves)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L9)

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[checkAlgorithmName](BaseEllipticCurveAlgorithm.md#checkalgorithmname)

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[checkCryptoKey](BaseEllipticCurveAlgorithm.md#checkcryptokey)

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[checkGenerateKey](BaseEllipticCurveAlgorithm.md#checkgeneratekey)

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[checkKeyAlgorithm](BaseEllipticCurveAlgorithm.md#checkkeyalgorithm)

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[checkKeyType](BaseEllipticCurveAlgorithm.md#checkkeytype)

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[checkKeyUsages](BaseEllipticCurveAlgorithm.md#checkkeyusages)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[decrypt](BaseEllipticCurveAlgorithm.md#decrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[deriveBits](BaseEllipticCurveAlgorithm.md#derivebits)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L30)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[encrypt](BaseEllipticCurveAlgorithm.md#encrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L30)

___

### generateKey

▸ `Abstract` **generateKey**(`options`): `Promise`<[`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcGenerateKeyOptions`](../interfaces/Web5Crypto.EcGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

#### Inherited from

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[generateKey](BaseEllipticCurveAlgorithm.md#generatekey)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:34](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L34)

___

### sign

▸ `Abstract` **sign**(`options`): `Promise`<`Uint8Array`\>

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[sign](BaseEllipticCurveAlgorithm.md#sign)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:34](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L34)

___

### verify

▸ `Abstract` **verify**(`options`): `Promise`<`boolean`\>

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[verify](BaseEllipticCurveAlgorithm.md#verify)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdsa.ts:36](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdsa.ts#L36)

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[create](BaseEllipticCurveAlgorithm.md#create)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
