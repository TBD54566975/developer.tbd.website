# Class: EdDsaAlgorithm

## Hierarchy

- [`BaseEdDsaAlgorithm`](BaseEdDsaAlgorithm.md)

  ↳ **`EdDsaAlgorithm`**

## Table of contents

### Constructors

- [constructor](EdDsaAlgorithm.md#constructor)

### Properties

- [keyUsages](EdDsaAlgorithm.md#keyusages)
- [name](EdDsaAlgorithm.md#name)
- [namedCurves](EdDsaAlgorithm.md#namedcurves)

### Methods

- [checkAlgorithmName](EdDsaAlgorithm.md#checkalgorithmname)
- [checkAlgorithmOptions](EdDsaAlgorithm.md#checkalgorithmoptions)
- [checkCryptoKey](EdDsaAlgorithm.md#checkcryptokey)
- [checkGenerateKey](EdDsaAlgorithm.md#checkgeneratekey)
- [checkKeyAlgorithm](EdDsaAlgorithm.md#checkkeyalgorithm)
- [checkKeyType](EdDsaAlgorithm.md#checkkeytype)
- [checkKeyUsages](EdDsaAlgorithm.md#checkkeyusages)
- [decrypt](EdDsaAlgorithm.md#decrypt)
- [deriveBits](EdDsaAlgorithm.md#derivebits)
- [encrypt](EdDsaAlgorithm.md#encrypt)
- [generateKey](EdDsaAlgorithm.md#generatekey)
- [sign](EdDsaAlgorithm.md#sign)
- [verify](EdDsaAlgorithm.md#verify)
- [create](EdDsaAlgorithm.md#create)

## Constructors

### constructor

• **new EdDsaAlgorithm**()

#### Inherited from

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[constructor](BaseEdDsaAlgorithm.md#constructor)

## Properties

### keyUsages

• `Readonly` **keyUsages**: [`KeyPairUsage`](../interfaces/Web5Crypto.KeyPairUsage.md)

Indicates which cryptographic operations are permissible to be used with this algorithm.

#### Inherited from

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[keyUsages](BaseEdDsaAlgorithm.md#keyusages)

#### Defined in

[packages/crypto/src/algorithms-api/ec/eddsa.ts:10](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/eddsa.ts#L10)

___

### name

• `Readonly` **name**: `string` = `'EdDSA'`

Name of the algorithm

#### Inherited from

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[name](BaseEdDsaAlgorithm.md#name)

#### Defined in

[packages/crypto/src/algorithms-api/ec/eddsa.ts:8](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/eddsa.ts#L8)

___

### namedCurves

• `Readonly` **namedCurves**: `string`[]

#### Overrides

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[namedCurves](BaseEdDsaAlgorithm.md#namedcurves)

#### Defined in

[packages/crypto/src/crypto-algorithms/eddsa.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/eddsa.ts#L9)

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

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[checkAlgorithmName](BaseEdDsaAlgorithm.md#checkalgorithmname)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L17)

___

### checkAlgorithmOptions

▸ **checkAlgorithmOptions**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md) |

#### Returns

`void`

#### Inherited from

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[checkAlgorithmOptions](BaseEdDsaAlgorithm.md#checkalgorithmoptions)

#### Defined in

[packages/crypto/src/algorithms-api/ec/eddsa.ts:15](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/eddsa.ts#L15)

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

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[checkCryptoKey](BaseEdDsaAlgorithm.md#checkcryptokey)

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

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[checkGenerateKey](BaseEdDsaAlgorithm.md#checkgeneratekey)

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

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[checkKeyAlgorithm](BaseEdDsaAlgorithm.md#checkkeyalgorithm)

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

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[checkKeyType](BaseEdDsaAlgorithm.md#checkkeytype)

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

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[checkKeyUsages](BaseEdDsaAlgorithm.md#checkkeyusages)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L63)

___

### decrypt

▸ **decrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[decrypt](BaseEdDsaAlgorithm.md#decrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L26)

___

### deriveBits

▸ **deriveBits**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[deriveBits](BaseEdDsaAlgorithm.md#derivebits)

#### Defined in

[packages/crypto/src/algorithms-api/ec/eddsa.ts:23](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/eddsa.ts#L23)

___

### encrypt

▸ **encrypt**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Inherited from

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[encrypt](BaseEdDsaAlgorithm.md#encrypt)

#### Defined in

[packages/crypto/src/algorithms-api/ec/base.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/ec/base.ts#L30)

___

### generateKey

▸ **generateKey**(`options`): `Promise`<[`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md)\>

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

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[generateKey](BaseEdDsaAlgorithm.md#generatekey)

#### Defined in

[packages/crypto/src/crypto-algorithms/eddsa.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/eddsa.ts#L11)

___

### sign

▸ **sign**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[sign](BaseEdDsaAlgorithm.md#sign)

#### Defined in

[packages/crypto/src/crypto-algorithms/eddsa.ts:44](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/eddsa.ts#L44)

___

### verify

▸ **verify**(`options`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.algorithm` | [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md) |
| `options.data` | `Uint8Array` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |
| `options.signature` | `Uint8Array` |

#### Returns

`Promise`<`boolean`\>

#### Overrides

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[verify](BaseEdDsaAlgorithm.md#verify)

#### Defined in

[packages/crypto/src/crypto-algorithms/eddsa.ts:77](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-algorithms/eddsa.ts#L77)

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

[BaseEdDsaAlgorithm](BaseEdDsaAlgorithm.md).[create](BaseEdDsaAlgorithm.md#create)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-algorithm.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-algorithm.ts#L87)
