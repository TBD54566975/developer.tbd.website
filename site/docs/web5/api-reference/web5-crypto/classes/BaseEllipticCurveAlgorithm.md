# Class: BaseEllipticCurveAlgorithm

## Hierarchy

- [`CryptoAlgorithm`](CryptoAlgorithm.md)

  ↳ **`BaseEllipticCurveAlgorithm`**

  ↳↳ [`BaseEcdhAlgorithm`](BaseEcdhAlgorithm.md)

  ↳↳ [`BaseEcdsaAlgorithm`](BaseEcdsaAlgorithm.md)

  ↳↳ [`BaseEdDsaAlgorithm`](BaseEdDsaAlgorithm.md)

## Table of contents

### Constructors

- [constructor](BaseEllipticCurveAlgorithm.md#constructor)

### Properties

- [keyUsages](BaseEllipticCurveAlgorithm.md#keyusages)
- [name](BaseEllipticCurveAlgorithm.md#name)
- [namedCurves](BaseEllipticCurveAlgorithm.md#namedcurves)

### Methods

- [checkAlgorithmName](BaseEllipticCurveAlgorithm.md#checkalgorithmname)
- [checkCryptoKey](BaseEllipticCurveAlgorithm.md#checkcryptokey)
- [checkGenerateKey](BaseEllipticCurveAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](BaseEllipticCurveAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](BaseEllipticCurveAlgorithm.md#checkkeytype)
- [checkKeyUsages](BaseEllipticCurveAlgorithm.md#checkkeyusages)
- [decrypt](BaseEllipticCurveAlgorithm.md#decrypt)
- [deriveBits](BaseEllipticCurveAlgorithm.md#derivebits)
- [encrypt](BaseEllipticCurveAlgorithm.md#encrypt)
- [generateKey](BaseEllipticCurveAlgorithm.md#generatekey)
- [sign](BaseEllipticCurveAlgorithm.md#sign)
- [verify](BaseEllipticCurveAlgorithm.md#verify)
- [create](BaseEllipticCurveAlgorithm.md#create)

## Constructors

### constructor

• **new BaseEllipticCurveAlgorithm**()

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

___

### namedCurves

• `Abstract` **namedCurves**: `string`[]

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
| `options.algorithm` | [`EcGenerateKeyOptions`](../interfaces/Web5Crypto.EcGenerateKeyOptions.md) |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`void`

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

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[CryptoAlgorithm](CryptoAlgorithm.md).[decrypt](CryptoAlgorithm.md#decrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

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

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[deriveBits](CryptoAlgorithm.md#derivebits)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:97](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L97)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[CryptoAlgorithm](CryptoAlgorithm.md).[encrypt](CryptoAlgorithm.md#encrypt)

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

#### Overrides

[CryptoAlgorithm](CryptoAlgorithm.md).[generateKey](CryptoAlgorithm.md#generatekey)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:34](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L34)

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

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[sign](CryptoAlgorithm.md#sign)

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

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[verify](CryptoAlgorithm.md#verify)

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

#### Inherited from

[CryptoAlgorithm](CryptoAlgorithm.md).[create](CryptoAlgorithm.md#create)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
