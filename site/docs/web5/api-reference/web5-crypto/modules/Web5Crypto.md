# Namespace: Web5Crypto

## Table of contents

### Interfaces

- [AesCtrOptions](../interfaces/Web5Crypto.AesCtrOptions.md)
- [AesGcmOptions](../interfaces/Web5Crypto.AesGcmOptions.md)
- [AesGenerateKeyOptions](../interfaces/Web5Crypto.AesGenerateKeyOptions.md)
- [Algorithm](../interfaces/Web5Crypto.Algorithm.md)
- [CryptoKey](../interfaces/Web5Crypto.CryptoKey.md)
- [CryptoKeyPair](../interfaces/Web5Crypto.CryptoKeyPair.md)
- [EcGenerateKeyOptions](../interfaces/Web5Crypto.EcGenerateKeyOptions.md)
- [EcdhDeriveKeyOptions](../interfaces/Web5Crypto.EcdhDeriveKeyOptions.md)
- [EcdsaGenerateKeyOptions](../interfaces/Web5Crypto.EcdsaGenerateKeyOptions.md)
- [EcdsaOptions](../interfaces/Web5Crypto.EcdsaOptions.md)
- [HmacGenerateKeyOptions](../interfaces/Web5Crypto.HmacGenerateKeyOptions.md)
- [KeyAlgorithm](../interfaces/Web5Crypto.KeyAlgorithm.md)
- [KeyPairUsage](../interfaces/Web5Crypto.KeyPairUsage.md)

### Type Aliases

- [AlgorithmIdentifier](Web5Crypto.md#algorithmidentifier)
- [EdDsaGenerateKeyOptions](Web5Crypto.md#eddsageneratekeyoptions)
- [EdDsaOptions](Web5Crypto.md#eddsaoptions)
- [GenerateKeyOptions](Web5Crypto.md#generatekeyoptions)
- [KeyType](Web5Crypto.md#keytype)
- [KeyUsage](Web5Crypto.md#keyusage)
- [NamedCurve](Web5Crypto.md#namedcurve)
- [PrivateKeyType](Web5Crypto.md#privatekeytype)

## Type Aliases

### AlgorithmIdentifier

Ƭ **AlgorithmIdentifier**: [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md)

#### Defined in

[packages/crypto/src/types/web5-crypto.ts:21](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L21)

___

### EdDsaGenerateKeyOptions

Ƭ **EdDsaGenerateKeyOptions**: [`EcGenerateKeyOptions`](../interfaces/Web5Crypto.EcGenerateKeyOptions.md)

#### Defined in

[packages/crypto/src/types/web5-crypto.ts:52](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L52)

___

### EdDsaOptions

Ƭ **EdDsaOptions**: [`Algorithm`](../interfaces/Web5Crypto.Algorithm.md)

#### Defined in

[packages/crypto/src/types/web5-crypto.ts:54](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L54)

___

### GenerateKeyOptions

Ƭ **GenerateKeyOptions**: [`AesGenerateKeyOptions`](../interfaces/Web5Crypto.AesGenerateKeyOptions.md) \| [`EcGenerateKeyOptions`](../interfaces/Web5Crypto.EcGenerateKeyOptions.md) \| [`HmacGenerateKeyOptions`](../interfaces/Web5Crypto.HmacGenerateKeyOptions.md)

#### Defined in

[packages/crypto/src/types/web5-crypto.ts:56](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L56)

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

[packages/crypto/src/types/web5-crypto.ts:84](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L84)

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

[packages/crypto/src/types/web5-crypto.ts:105](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L105)

___

### NamedCurve

Ƭ **NamedCurve**: `string`

#### Defined in

[packages/crypto/src/types/web5-crypto.ts:107](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L107)

___

### PrivateKeyType

Ƭ **PrivateKeyType**: ``"private"`` \| ``"secret"``

#### Defined in

[packages/crypto/src/types/web5-crypto.ts:109](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/types/web5-crypto.ts#L109)
