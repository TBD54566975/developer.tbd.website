# Class: EcdhAlgorithm

## Hierarchy

- [`BaseEcdhAlgorithm`](BaseEcdhAlgorithm.md)

  ↳ **`EcdhAlgorithm`**

## Table of contents

### Constructors

- [constructor](EcdhAlgorithm.md#constructor)

### Properties

- [keyUsages](EcdhAlgorithm.md#keyusages)
- [name](EcdhAlgorithm.md#name)
- [namedCurves](EcdhAlgorithm.md#namedcurves)

### Methods

- [checkAlgorithmName](EcdhAlgorithm.md#checkalgorithmname)
- [checkAlgorithmOptions](EcdhAlgorithm.md#checkalgorithmoptions)
- [checkCryptoKey](EcdhAlgorithm.md#checkcryptokey)
- [checkGenerateKey](EcdhAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](EcdhAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](EcdhAlgorithm.md#checkkeytype)
- [checkKeyUsages](EcdhAlgorithm.md#checkkeyusages)
- [decrypt](EcdhAlgorithm.md#decrypt)
- [deriveBits](EcdhAlgorithm.md#derivebits)
- [encrypt](EcdhAlgorithm.md#encrypt)
- [generateKey](EcdhAlgorithm.md#generatekey)
- [sign](EcdhAlgorithm.md#sign)
- [verify](EcdhAlgorithm.md#verify)
- [create](EcdhAlgorithm.md#create)

## Constructors

### constructor

• **new EcdhAlgorithm**()

#### Inherited from

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[constructor](BaseEcdhAlgorithm.md#constructor)

## Properties

### keyUsages

• **keyUsages**: [`KeyPairUsage`](../interfaces/Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[keyUsages](BaseEcdhAlgorithm.md#keyusages)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdh.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L11)

___

### name

• `Readonly` **name**: `string` = `'ECDH'`

Name of the algorithm

#### Inherited from

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[name](BaseEcdhAlgorithm.md#name)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdh.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L9)

___

### namedCurves

• `Readonly` **namedCurves**: `string`[]

#### Overrides

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[namedCurves](BaseEcdhAlgorithm.md#namedcurves)

#### Defined in

[packages/crypto/src/crypto-algorithms/ecdh.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdh.ts#L9)

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

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[checkAlgorithmName](BaseEcdhAlgorithm.md#checkalgorithmname)

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

#### Inherited from

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[checkAlgorithmOptions](BaseEcdhAlgorithm.md#checkalgorithmoptions)

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

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[checkCryptoKey](BaseEcdhAlgorithm.md#checkcryptokey)

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

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[checkGenerateKey](BaseEcdhAlgorithm.md#checkgeneratekey)

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

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[checkKeyAlgorithm](BaseEcdhAlgorithm.md#checkkeyalgorithm)

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

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[checkKeyType](BaseEcdhAlgorithm.md#checkkeytype)

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

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[checkKeyUsages](BaseEcdhAlgorithm.md#checkkeyusages)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[decrypt](BaseEcdhAlgorithm.md#decrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

___

### deriveBits

▸ **deriveBits**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcdhDeriveKeyOptions`](../interfaces/Web5Crypto.EcdhDeriveKeyOptions.md) |
| `options.baseKey` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |
| `options.length` | ``null`` \| `number` |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[deriveBits](BaseEcdhAlgorithm.md#derivebits)

#### Defined in

[packages/crypto/src/crypto-algorithms/ecdh.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdh.ts#L11)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[encrypt](BaseEcdhAlgorithm.md#encrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L30)

___

### generateKey

▸ **generateKey**(`options`): `Promise`<[`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`EcGenerateKeyOptions`](../interfaces/Web5Crypto.EcGenerateKeyOptions.md) \| [`EcdsaGenerateKeyOptions`](../interfaces/Web5Crypto.EcdsaGenerateKeyOptions.md) |
| `options.extractable` | `boolean` |
| `options.keyUsages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Returns

`Promise`<[`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

#### Overrides

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[generateKey](BaseEcdhAlgorithm.md#generatekey)

#### Defined in

[packages/crypto/src/crypto-algorithms/ecdh.ts:75](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/ecdh.ts#L75)

___

### sign

▸ **sign**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[sign](BaseEcdhAlgorithm.md#sign)

#### Defined in

[packages/crypto/src/algorithms-api/ec/ecdh.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/ecdh.ts#L46)

___

### verify

▸ **verify**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[verify](BaseEcdhAlgorithm.md#verify)

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

[BaseEcdhAlgorithm](BaseEcdhAlgorithm.md).[create](BaseEcdhAlgorithm.md#create)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
