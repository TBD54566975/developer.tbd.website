# Class: CryptoKey

## Implements

- [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md)

## Table of contents

### Constructors

- [constructor](CryptoKey.md#constructor)

### Properties

- [algorithm](CryptoKey.md#algorithm)
- [extractable](CryptoKey.md#extractable)
- [material](CryptoKey.md#material)
- [type](CryptoKey.md#type)
- [usages](CryptoKey.md#usages)

## Constructors

### constructor

• **new CryptoKey**(`algorithm`, `extractable`, `material`, `type`, `usages`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `algorithm` | [`GenerateKeyOptions`](../modules/Web5Crypto.md#generatekeyoptions) |
| `extractable` | `boolean` |
| `material` | `Uint8Array` |
| `type` | [`KeyType`](../modules/Web5Crypto.md#keytype) |
| `usages` | [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[] |

#### Defined in

[packages/crypto/src/algorithms-api/crypto-key.ts:10](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-key.ts#L10)

## Properties

### algorithm

• **algorithm**: [`GenerateKeyOptions`](../modules/Web5Crypto.md#generatekeyoptions)

#### Implementation of

[CryptoKey](../interfaces/Web5Crypto.CryptoKey.md).[algorithm](../interfaces/Web5Crypto.CryptoKey.md#algorithm)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-key.ts:4](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-key.ts#L4)

___

### extractable

• **extractable**: `boolean`

#### Implementation of

[CryptoKey](../interfaces/Web5Crypto.CryptoKey.md).[extractable](../interfaces/Web5Crypto.CryptoKey.md#extractable)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-key.ts:5](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-key.ts#L5)

___

### material

• **material**: `Uint8Array`

#### Implementation of

[CryptoKey](../interfaces/Web5Crypto.CryptoKey.md).[material](../interfaces/Web5Crypto.CryptoKey.md#material)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-key.ts:6](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-key.ts#L6)

___

### type

• **type**: [`KeyType`](../modules/Web5Crypto.md#keytype)

#### Implementation of

[CryptoKey](../interfaces/Web5Crypto.CryptoKey.md).[type](../interfaces/Web5Crypto.CryptoKey.md#type)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-key.ts:7](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-key.ts#L7)

___

### usages

• **usages**: [`KeyUsage`](../modules/Web5Crypto.md#keyusage)[]

#### Implementation of

[CryptoKey](../interfaces/Web5Crypto.CryptoKey.md).[usages](../interfaces/Web5Crypto.CryptoKey.md#usages)

#### Defined in

[packages/crypto/src/algorithms-api/crypto-key.ts:8](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/algorithms-api/crypto-key.ts#L8)
