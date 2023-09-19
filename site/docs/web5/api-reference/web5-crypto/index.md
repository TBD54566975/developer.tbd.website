# @web5/crypto - v0.2.0

## Table of contents

### Namespaces

- [Web5Crypto](modules/Web5Crypto.md)
- [utils](modules/utils.md)

### Classes

- [AesCtr](classes/AesCtr.md)
- [AesCtrAlgorithm](classes/AesCtrAlgorithm.md)
- [AesGcm](classes/AesGcm.md)
- [BaseAesAlgorithm](classes/BaseAesAlgorithm.md)
- [BaseAesCtrAlgorithm](classes/BaseAesCtrAlgorithm.md)
- [BaseEcdhAlgorithm](classes/BaseEcdhAlgorithm.md)
- [BaseEcdsaAlgorithm](classes/BaseEcdsaAlgorithm.md)
- [BaseEdDsaAlgorithm](classes/BaseEdDsaAlgorithm.md)
- [BaseEllipticCurveAlgorithm](classes/BaseEllipticCurveAlgorithm.md)
- [ConcatKdf](classes/ConcatKdf.md)
- [CryptoAlgorithm](classes/CryptoAlgorithm.md)
- [CryptoError](classes/CryptoError.md)
- [CryptoKey](classes/CryptoKey.md)
- [DataError](classes/DataError.md)
- [EcdhAlgorithm](classes/EcdhAlgorithm.md)
- [EcdsaAlgorithm](classes/EcdsaAlgorithm.md)
- [Ed25519](classes/Ed25519.md)
- [EdDsaAlgorithm](classes/EdDsaAlgorithm.md)
- [InvalidAccessError](classes/InvalidAccessError.md)
- [Jose](classes/Jose.md)
- [NotSupportedError](classes/NotSupportedError.md)
- [OperationError](classes/OperationError.md)
- [Secp256k1](classes/Secp256k1.md)
- [SyntaxError](classes/SyntaxError.md)
- [X25519](classes/X25519.md)
- [XChaCha20](classes/XChaCha20.md)
- [XChaCha20Poly1305](classes/XChaCha20Poly1305.md)

### Interfaces

- [BytesKeyPair](interfaces/BytesKeyPair.md)
- [JoseHeaderParams](interfaces/JoseHeaderParams.md)
- [JweHeaderParams](interfaces/JweHeaderParams.md)
- [JwsHeaderParams](interfaces/JwsHeaderParams.md)

### Type Aliases

- [ConcatKdfOtherInfo](index.md#concatkdfotherinfo)
- [HashFunction](index.md#hashfunction)
- [JsonWebKey](index.md#jsonwebkey)
- [JwkKeyPair](index.md#jwkkeypair)
- [JwkNamedCurves](index.md#jwknamedcurves)
- [JwkOperation](index.md#jwkoperation)
- [JwkParamsAnyKeyType](index.md#jwkparamsanykeytype)
- [JwkParamsEcPrivate](index.md#jwkparamsecprivate)
- [JwkParamsEcPublic](index.md#jwkparamsecpublic)
- [JwkParamsOctPrivate](index.md#jwkparamsoctprivate)
- [JwkParamsOkpPrivate](index.md#jwkparamsokpprivate)
- [JwkParamsOkpPublic](index.md#jwkparamsokppublic)
- [JwkParamsRsaPrivate](index.md#jwkparamsrsaprivate)
- [JwkParamsRsaPublic](index.md#jwkparamsrsapublic)
- [JwkType](index.md#jwktype)
- [JwkUse](index.md#jwkuse)
- [PrivateKeyJwk](index.md#privatekeyjwk)
- [PublicKeyJwk](index.md#publickeyjwk)

### Variables

- [CryptoKeyWithJwk](index.md#cryptokeywithjwk)

### Functions

- [CryptoKeyToJwkMixin](index.md#cryptokeytojwkmixin)

## Type Aliases

### ConcatKdfOtherInfo

Ƭ **ConcatKdfOtherInfo**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `algorithmId` | `string` | The algorithm the derived secret keying material will be used with. |
| `partyUInfo` | `string` \| `TypedArray` | Information related to party U (initiator) involved in the key agreement transaction. It could be a public key, identifier, or any other data. |
| `partyVInfo` | `string` \| `TypedArray` | Information related to party V (receiver) involved in the key agreement transaction. Similar to partyUInfo, it could be a public key, identifier, etc. |
| `suppPrivInfo?` | `string` \| `TypedArray` | Optional field. It is used when it is desired to secretively bind additional information into the derived keying material. It is a secret value agreed upon by the entities who are party to the key agreement. |
| `suppPubInfo?` | `number` | Optional field. It is usually used to ensure the uniqueness of the derived keying material when the input keying material is used in multiple key-derivation key-agreement transactions. It is usually a public value such as the keyDataLen. |

#### Defined in

[packages/crypto/src/crypto-primitives/concat-kdf.ts:7](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/concat-kdf.ts#L7)

___

### HashFunction

Ƭ **HashFunction**: (`data`: `Uint8Array`) => `Uint8Array`

#### Type declaration

▸ (`data`): `Uint8Array`

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |

##### Returns

`Uint8Array`

#### Defined in

[packages/crypto/src/crypto-primitives/secp256k1.ts:7](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L7)

___

### JsonWebKey

Ƭ **JsonWebKey**: [`PrivateKeyJwk`](index.md#privatekeyjwk) \| [`PublicKeyJwk`](index.md#publickeyjwk)

#### Defined in

[packages/crypto/src/jose.ts:289](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L289)

___

### JwkKeyPair

Ƭ **JwkKeyPair**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `privateKeyJwk` | [`PrivateKeyJwk`](index.md#privatekeyjwk) |
| `publicKeyJwk` | [`PublicKeyJwk`](index.md#publickeyjwk) |

#### Defined in

[packages/crypto/src/jose.ts:284](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L284)

___

### JwkNamedCurves

Ƭ **JwkNamedCurves**: ``"P-256"`` \| ``"P-384"`` \| ``"P-521"`` \| ``"Ed25519"`` \| ``"Ed448"`` \| ``"X25519"`` \| ``"X448"`` \| ``"secp256k1"``

JSON Web Key Elliptic Curve

#### Defined in

[packages/crypto/src/jose.ts:64](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L64)

___

### JwkOperation

Ƭ **JwkOperation**: [`KeyUsage`](modules/Web5Crypto.md#keyusage)[] \| `string`[]

JSON Web Key Operations

decrypt    : Decrypt content and validate decryption, if applicable
deriveBits : Derive bits not to be used as a key
deriveKey  : Derive key
encrypt    : Encrypt content
sign       : Compute digital signature or MAC
unwrapKey  : Decrypt key and validate decryption, if applicable
verify     : Verify digital signature or MAC
wrapKey    : Encrypt key

#### Defined in

[packages/crypto/src/jose.ts:22](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L22)

___

### JwkParamsAnyKeyType

Ƭ **JwkParamsAnyKeyType**: `Object`

JSON Web Key Parameters

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alg?` | `string` |
| `ext?` | ``"true"`` \| ``"false"`` |
| `key_ops?` | [`JwkOperation`](index.md#jwkoperation) |
| `kid?` | `string` |
| `kty` | [`JwkType`](index.md#jwktype) |
| `use?` | [`JwkUse`](index.md#jwkuse) |
| `x5c?` | `string` |
| `x5t?` | `string` |
| `x5t#S256?` | `string` |
| `x5u?` | `string` |

#### Defined in

[packages/crypto/src/jose.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L87)

___

### JwkParamsEcPrivate

Ƭ **JwkParamsEcPrivate**: [`JwkParamsEcPublic`](index.md#jwkparamsecpublic) & { `d`: `string`  }

#### Defined in

[packages/crypto/src/jose.ts:150](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L150)

___

### JwkParamsEcPublic

Ƭ **JwkParamsEcPublic**: `Omit`<[`JwkParamsAnyKeyType`](index.md#jwkparamsanykeytype), ``"alg"`` \| ``"kty"``\> & { `alg?`: ``"ES256"`` \| ``"ES256K"`` \| ``"ES384"`` \| ``"ES512"`` ; `crv`: ``"secp256k1"`` \| ``"P-256"`` \| ``"P-384"`` \| ``"P-521"`` ; `kty`: ``"EC"`` ; `x`: `string` ; `y?`: `string`  }

#### Defined in

[packages/crypto/src/jose.ts:111](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L111)

___

### JwkParamsOctPrivate

Ƭ **JwkParamsOctPrivate**: `Omit`<[`JwkParamsAnyKeyType`](index.md#jwkparamsanykeytype), ``"alg"`` \| ``"kty"``\> & { `alg?`: ``"A128CBC"`` \| ``"A192CBC"`` \| ``"A256CBC"`` \| ``"A128CTR"`` \| ``"A192CTR"`` \| ``"A256CTR"`` \| ``"A128GCM"`` \| ``"A192GCM"`` \| ``"A256GCM"`` \| ``"HS256"`` \| ``"HS384"`` \| ``"HS512"`` ; `k`: `string` ; `kty`: ``"oct"``  }

#### Defined in

[packages/crypto/src/jose.ts:196](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L196)

___

### JwkParamsOkpPrivate

Ƭ **JwkParamsOkpPrivate**: [`JwkParamsOkpPublic`](index.md#jwkparamsokppublic) & { `d`: `string`  }

#### Defined in

[packages/crypto/src/jose.ts:185](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L185)

___

### JwkParamsOkpPublic

Ƭ **JwkParamsOkpPublic**: `Omit`<[`JwkParamsAnyKeyType`](index.md#jwkparamsanykeytype), ``"kty"`` \| ``"alg"`` \| ``"crv"``\> & `Pick`<[`JwkParamsEcPublic`](index.md#jwkparamsecpublic), ``"x"``\> & { `alg?`: ``"EdDSA"`` ; `crv`: ``"Ed25519"`` \| ``"Ed448"`` \| ``"X25519"`` \| ``"X448"`` ; `kty`: ``"OKP"``  }

#### Defined in

[packages/crypto/src/jose.ts:161](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L161)

___

### JwkParamsRsaPrivate

Ƭ **JwkParamsRsaPrivate**: [`JwkParamsRsaPublic`](index.md#jwkparamsrsapublic) & { `d`: `string` ; `dp?`: `string` ; `dq?`: `string` ; `oth?`: { `d`: `string` ; `r`: `string` ; `t`: `string`  }[] ; `p?`: `string` ; `q?`: `string` ; `qi?`: `string`  }

#### Defined in

[packages/crypto/src/jose.ts:259](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L259)

___

### JwkParamsRsaPublic

Ƭ **JwkParamsRsaPublic**: `Omit`<[`JwkParamsAnyKeyType`](index.md#jwkparamsanykeytype), ``"kty"``\> & { `e`: `string` ; `kty`: ``"RSA"`` ; `n`: `string`  }

#### Defined in

[packages/crypto/src/jose.ts:244](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L244)

___

### JwkType

Ƭ **JwkType**: ``"EC"`` \| ``"RSA"`` \| ``"oct"`` \| ``"OKP"``

JSON Web Key Types

#### Defined in

[packages/crypto/src/jose.ts:35](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L35)

___

### JwkUse

Ƭ **JwkUse**: ``"sig"`` \| ``"enc"`` \| `string`

JSON Web Key Use

sig : Digital Signature or MAC
enc : Encryption

#### Defined in

[packages/crypto/src/jose.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L30)

___

### PrivateKeyJwk

Ƭ **PrivateKeyJwk**: [`JwkParamsEcPrivate`](index.md#jwkparamsecprivate) \| [`JwkParamsOkpPrivate`](index.md#jwkparamsokpprivate) \| [`JwkParamsOctPrivate`](index.md#jwkparamsoctprivate) \| [`JwkParamsRsaPrivate`](index.md#jwkparamsrsaprivate)

#### Defined in

[packages/crypto/src/jose.ts:282](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L282)

___

### PublicKeyJwk

Ƭ **PublicKeyJwk**: [`JwkParamsEcPublic`](index.md#jwkparamsecpublic) \| [`JwkParamsOkpPublic`](index.md#jwkparamsokppublic) \| [`JwkParamsRsaPublic`](index.md#jwkparamsrsapublic)

#### Defined in

[packages/crypto/src/jose.ts:280](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L280)

## Variables

### CryptoKeyWithJwk

• `Const` **CryptoKeyWithJwk**: (...`args`: `any`[]) => `__class`<typeof [`CryptoKey`](classes/CryptoKey.md)\> & typeof [`CryptoKey`](classes/CryptoKey.md)

#### Defined in

[packages/crypto/src/jose.ts:938](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L938)

## Functions

### CryptoKeyToJwkMixin

▸ **CryptoKeyToJwkMixin**<`T`\>(`Base`): (...`args`: `any`[]) => `__class`<`T`\> & `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Constructable` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Base` | `T` |

#### Returns

(...`args`: `any`[]) => `__class`<`T`\> & `T`

#### Defined in

[packages/crypto/src/jose.ts:929](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L929)
