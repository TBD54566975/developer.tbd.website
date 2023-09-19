# Class: BaseEcdhAlgorithm

## Hierarchy

- [`BaseEllipticCurveAlgorithm`](BaseEllipticCurveAlgorithm.md)

  ↳ **`BaseEcdhAlgorithm`**

  ↳↳ [`EcdhAlgorithm`](EcdhAlgorithm.md)

## Table of contents

### Constructors

- [constructor](BaseEcdhAlgorithm.md#constructor)

### Properties

- [keyUsages](BaseEcdhAlgorithm.md#keyusages)
- [name](BaseEcdhAlgorithm.md#name)
- [namedCurves](BaseEcdhAlgorithm.md#namedcurves)

### Methods

- [checkAlgorithmName](BaseEcdhAlgorithm.md#checkalgorithmname)
- [checkAlgorithmOptions](BaseEcdhAlgorithm.md#checkalgorithmoptions)
- [checkCryptoKey](BaseEcdhAlgorithm.md#checkcryptokey)
- [checkGenerateKey](BaseEcdhAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](BaseEcdhAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](BaseEcdhAlgorithm.md#checkkeytype)
- [checkKeyUsages](BaseEcdhAlgorithm.md#checkkeyusages)
- [decrypt](BaseEcdhAlgorithm.md#decrypt)
- [deriveBits](BaseEcdhAlgorithm.md#derivebits)
- [encrypt](BaseEcdhAlgorithm.md#encrypt)
- [generateKey](BaseEcdhAlgorithm.md#generatekey)
- [sign](BaseEcdhAlgorithm.md#sign)
- [verify](BaseEcdhAlgorithm.md#verify)
- [create](BaseEcdhAlgorithm.md#create)

## Constructors

### constructor

• **new BaseEcdhAlgorithm**()

#### Inherited from

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[constructor](BaseEllipticCurveAlgorithm.md#constructor)

## Properties

### keyUsages

• **keyUsages**: [`KeyPairUsage`](../interfaces/Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Overrides

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[keyUsages](BaseEllipticCurveAlgorithm.md#keyusages)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdh.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L11)

___

### name

• `Readonly` **name**: `string` = `'ECDH'`

Name of the algorithm

#### Overrides

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[name](BaseEllipticCurveAlgorithm.md#name)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdh.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L9)

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
| `options.algorithm` | [`EcdhDeriveKeyOptions`](../interfaces/Web5Crypto.EcdhDeriveKeyOptions.md) |
| `options.baseKey` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`void`

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdh.ts:16](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L16)

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

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[deriveBits](BaseEllipticCurveAlgorithm.md#derivebits)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:97](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L97)

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

▸ **sign**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[sign](BaseEllipticCurveAlgorithm.md#sign)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdh.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L46)

___

### verify

▸ **verify**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Overrides

[BaseEllipticCurveAlgorithm](BaseEllipticCurveAlgorithm.md).[verify](BaseEllipticCurveAlgorithm.md#verify)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdh.ts:50](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L50)

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
