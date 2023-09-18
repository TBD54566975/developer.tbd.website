---
id: "web5_crypto.Web5Crypto"
title: "Namespace: Web5Crypto"
sidebar_label: "@web5/crypto.Web5Crypto"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).Web5Crypto

## Interfaces

- [AesCtrOptions](../interfaces/web5_crypto.Web5Crypto.AesCtrOptions.md)
- [AesGcmOptions](../interfaces/web5_crypto.Web5Crypto.AesGcmOptions.md)
- [AesGenerateKeyOptions](../interfaces/web5_crypto.Web5Crypto.AesGenerateKeyOptions.md)
- [Algorithm](../interfaces/web5_crypto.Web5Crypto.Algorithm.md)
- [CryptoKey](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md)
- [CryptoKeyPair](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md)
- [EcGenerateKeyOptions](../interfaces/web5_crypto.Web5Crypto.EcGenerateKeyOptions.md)
- [EcdhDeriveKeyOptions](../interfaces/web5_crypto.Web5Crypto.EcdhDeriveKeyOptions.md)
- [EcdsaGenerateKeyOptions](../interfaces/web5_crypto.Web5Crypto.EcdsaGenerateKeyOptions.md)
- [EcdsaOptions](../interfaces/web5_crypto.Web5Crypto.EcdsaOptions.md)
- [HmacGenerateKeyOptions](../interfaces/web5_crypto.Web5Crypto.HmacGenerateKeyOptions.md)
- [KeyAlgorithm](../interfaces/web5_crypto.Web5Crypto.KeyAlgorithm.md)
- [KeyPairUsage](../interfaces/web5_crypto.Web5Crypto.KeyPairUsage.md)

## Type Aliases

### AlgorithmIdentifier

Ƭ **AlgorithmIdentifier**: [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md)

#### Defined in

[web5-js/packages/crypto/src/types/web5-crypto.ts:21](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L21)

___

### EdDsaGenerateKeyOptions

Ƭ **EdDsaGenerateKeyOptions**: [`EcGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcGenerateKeyOptions.md)

#### Defined in

[web5-js/packages/crypto/src/types/web5-crypto.ts:52](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L52)

___

### EdDsaOptions

Ƭ **EdDsaOptions**: [`Algorithm`](../interfaces/web5_crypto.Web5Crypto.Algorithm.md)

#### Defined in

[web5-js/packages/crypto/src/types/web5-crypto.ts:54](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L54)

___

### GenerateKeyOptions

Ƭ **GenerateKeyOptions**: [`AesGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.AesGenerateKeyOptions.md) \| [`EcGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.EcGenerateKeyOptions.md) \| [`HmacGenerateKeyOptions`](../interfaces/web5_crypto.Web5Crypto.HmacGenerateKeyOptions.md)

#### Defined in

[web5-js/packages/crypto/src/types/web5-crypto.ts:56](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L56)

___

### KeyType

Ƭ **KeyType**: ``"private"`` \| ``"public"`` \| ``"secret"``

KeyType

The read-only `type` property indicates which kind of key
is represented by the object.

It can have the following string values:

  "secret": This key is a secret key for use with a symmetric algorithm.
  "private": This key is the private half of an asymmetric algorithm's `ManagedKeyPair`.
  "public": This key is the public half of an asymmetric algorithm's `ManagedKeyPair`.

#### Defined in

[web5-js/packages/crypto/src/types/web5-crypto.ts:84](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L84)

___

### KeyUsage

Ƭ **KeyUsage**: ``"encrypt"`` \| ``"decrypt"`` \| ``"sign"`` \| ``"verify"`` \| ``"deriveKey"`` \| ``"deriveBits"`` \| ``"wrapKey"`` \| ``"unwrapKey"``

KeyUsage

The read-only usage property indicates what can be done with the key.

An Array of strings from the following list:

  "encrypt": The key may be used to encrypt messages.
  "decrypt": The key may be used to decrypt messages.
  "sign": The key may be used to sign messages.
  "verify": The key may be used to verify signatures.
  "deriveKey": The key may be used in deriving a new key.
  "deriveBits": The key may be used in deriving bits.
  "wrapKey": The key may be used to wrap a key.
  "unwrapKey": The key may be used to unwrap a key.

Reference: IANA "JSON Web Key Operations" registry
           https://www.iana.org/assignments/jose/jose.xhtml#web-key-operations

#### Defined in

[web5-js/packages/crypto/src/types/web5-crypto.ts:105](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L105)

___

### NamedCurve

Ƭ **NamedCurve**: `string`

#### Defined in

[web5-js/packages/crypto/src/types/web5-crypto.ts:107](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L107)

___

### PrivateKeyType

Ƭ **PrivateKeyType**: ``"private"`` \| ``"secret"``

#### Defined in

[web5-js/packages/crypto/src/types/web5-crypto.ts:109](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L109)
