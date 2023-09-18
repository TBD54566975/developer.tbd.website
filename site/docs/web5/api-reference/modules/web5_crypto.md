---
id: "web5_crypto"
title: "Module: @web5/crypto"
sidebar_label: "@web5/crypto"
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [Web5Crypto](../namespaces/web5_crypto.Web5Crypto.md)
- [utils](../namespaces/web5_crypto.utils.md)

## Classes

- [AesCtr](../classes/web5_crypto.AesCtr.md)
- [AesCtrAlgorithm](../classes/web5_crypto.AesCtrAlgorithm.md)
- [AesGcm](../classes/web5_crypto.AesGcm.md)
- [BaseAesAlgorithm](../classes/web5_crypto.BaseAesAlgorithm.md)
- [BaseAesCtrAlgorithm](../classes/web5_crypto.BaseAesCtrAlgorithm.md)
- [BaseEcdhAlgorithm](../classes/web5_crypto.BaseEcdhAlgorithm.md)
- [BaseEcdsaAlgorithm](../classes/web5_crypto.BaseEcdsaAlgorithm.md)
- [BaseEdDsaAlgorithm](../classes/web5_crypto.BaseEdDsaAlgorithm.md)
- [BaseEllipticCurveAlgorithm](../classes/web5_crypto.BaseEllipticCurveAlgorithm.md)
- [ConcatKdf](../classes/web5_crypto.ConcatKdf.md)
- [CryptoAlgorithm](../classes/web5_crypto.CryptoAlgorithm.md)
- [CryptoError](../classes/web5_crypto.CryptoError.md)
- [CryptoKey](../classes/web5_crypto.CryptoKey.md)
- [DataError](../classes/web5_crypto.DataError.md)
- [EcdhAlgorithm](../classes/web5_crypto.EcdhAlgorithm.md)
- [EcdsaAlgorithm](../classes/web5_crypto.EcdsaAlgorithm.md)
- [Ed25519](../classes/web5_crypto.Ed25519.md)
- [EdDsaAlgorithm](../classes/web5_crypto.EdDsaAlgorithm.md)
- [InvalidAccessError](../classes/web5_crypto.InvalidAccessError.md)
- [Jose](../classes/web5_crypto.Jose.md)
- [NotSupportedError](../classes/web5_crypto.NotSupportedError.md)
- [OperationError](../classes/web5_crypto.OperationError.md)
- [Secp256k1](../classes/web5_crypto.Secp256k1.md)
- [SyntaxError](../classes/web5_crypto.SyntaxError.md)
- [X25519](../classes/web5_crypto.X25519.md)
- [XChaCha20](../classes/web5_crypto.XChaCha20.md)
- [XChaCha20Poly1305](../classes/web5_crypto.XChaCha20Poly1305.md)

## Interfaces

- [BytesKeyPair](../interfaces/web5_crypto.BytesKeyPair.md)
- [JoseHeaderParams](../interfaces/web5_crypto.JoseHeaderParams.md)
- [JweHeaderParams](../interfaces/web5_crypto.JweHeaderParams.md)
- [JwsHeaderParams](../interfaces/web5_crypto.JwsHeaderParams.md)

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

[web5-js/packages/crypto/src/crypto-primitives/concat-kdf.ts:7](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/concat-kdf.ts#L7)

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

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:7](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L7)

___

### JsonWebKey

Ƭ **JsonWebKey**: [`PrivateKeyJwk`](web5_crypto.md#privatekeyjwk) \| [`PublicKeyJwk`](web5_crypto.md#publickeyjwk)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:289](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L289)

___

### JwkKeyPair

Ƭ **JwkKeyPair**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `privateKeyJwk` | [`PrivateKeyJwk`](web5_crypto.md#privatekeyjwk) |
| `publicKeyJwk` | [`PublicKeyJwk`](web5_crypto.md#publickeyjwk) |

#### Defined in

[web5-js/packages/crypto/src/jose.ts:284](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L284)

___

### JwkNamedCurves

Ƭ **JwkNamedCurves**: ``"P-256"`` \| ``"P-384"`` \| ``"P-521"`` \| ``"Ed25519"`` \| ``"Ed448"`` \| ``"X25519"`` \| ``"X448"`` \| ``"secp256k1"``

JSON Web Key Elliptic Curve

#### Defined in

[web5-js/packages/crypto/src/jose.ts:64](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L64)

___

### JwkOperation

Ƭ **JwkOperation**: [`KeyUsage`](../namespaces/web5_crypto.Web5Crypto.md#keyusage)[] \| `string`[]

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

[web5-js/packages/crypto/src/jose.ts:22](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L22)

___

### JwkParamsAnyKeyType

Ƭ **JwkParamsAnyKeyType**: `Object`

JSON Web Key Parameters

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alg?` | `string` |
| `ext?` | ``"true"`` \| ``"false"`` |
| `key_ops?` | [`JwkOperation`](web5_crypto.md#jwkoperation) |
| `kid?` | `string` |
| `kty` | [`JwkType`](web5_crypto.md#jwktype) |
| `use?` | [`JwkUse`](web5_crypto.md#jwkuse) |
| `x5c?` | `string` |
| `x5t?` | `string` |
| `x5t#S256?` | `string` |
| `x5u?` | `string` |

#### Defined in

[web5-js/packages/crypto/src/jose.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L87)

___

### JwkParamsEcPrivate

Ƭ **JwkParamsEcPrivate**: [`JwkParamsEcPublic`](web5_crypto.md#jwkparamsecpublic) & { `d`: `string`  }

#### Defined in

[web5-js/packages/crypto/src/jose.ts:150](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L150)

___

### JwkParamsEcPublic

Ƭ **JwkParamsEcPublic**: `Omit`<[`JwkParamsAnyKeyType`](web5_crypto.md#jwkparamsanykeytype), ``"alg"`` \| ``"kty"``\> & { `alg?`: ``"ES256"`` \| ``"ES256K"`` \| ``"ES384"`` \| ``"ES512"`` ; `crv`: ``"secp256k1"`` \| ``"P-256"`` \| ``"P-384"`` \| ``"P-521"`` ; `kty`: ``"EC"`` ; `x`: `string` ; `y?`: `string`  }

#### Defined in

[web5-js/packages/crypto/src/jose.ts:111](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L111)

___

### JwkParamsOctPrivate

Ƭ **JwkParamsOctPrivate**: `Omit`<[`JwkParamsAnyKeyType`](web5_crypto.md#jwkparamsanykeytype), ``"alg"`` \| ``"kty"``\> & { `alg?`: ``"A128CBC"`` \| ``"A192CBC"`` \| ``"A256CBC"`` \| ``"A128CTR"`` \| ``"A192CTR"`` \| ``"A256CTR"`` \| ``"A128GCM"`` \| ``"A192GCM"`` \| ``"A256GCM"`` \| ``"HS256"`` \| ``"HS384"`` \| ``"HS512"`` ; `k`: `string` ; `kty`: ``"oct"``  }

#### Defined in

[web5-js/packages/crypto/src/jose.ts:196](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L196)

___

### JwkParamsOkpPrivate

Ƭ **JwkParamsOkpPrivate**: [`JwkParamsOkpPublic`](web5_crypto.md#jwkparamsokppublic) & { `d`: `string`  }

#### Defined in

[web5-js/packages/crypto/src/jose.ts:185](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L185)

___

### JwkParamsOkpPublic

Ƭ **JwkParamsOkpPublic**: `Omit`<[`JwkParamsAnyKeyType`](web5_crypto.md#jwkparamsanykeytype), ``"kty"`` \| ``"alg"`` \| ``"crv"``\> & `Pick`<[`JwkParamsEcPublic`](web5_crypto.md#jwkparamsecpublic), ``"x"``\> & { `alg?`: ``"EdDSA"`` ; `crv`: ``"Ed25519"`` \| ``"Ed448"`` \| ``"X25519"`` \| ``"X448"`` ; `kty`: ``"OKP"``  }

#### Defined in

[web5-js/packages/crypto/src/jose.ts:161](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L161)

___

### JwkParamsRsaPrivate

Ƭ **JwkParamsRsaPrivate**: [`JwkParamsRsaPublic`](web5_crypto.md#jwkparamsrsapublic) & { `d`: `string` ; `dp?`: `string` ; `dq?`: `string` ; `oth?`: { `d`: `string` ; `r`: `string` ; `t`: `string`  }[] ; `p?`: `string` ; `q?`: `string` ; `qi?`: `string`  }

#### Defined in

[web5-js/packages/crypto/src/jose.ts:259](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L259)

___

### JwkParamsRsaPublic

Ƭ **JwkParamsRsaPublic**: `Omit`<[`JwkParamsAnyKeyType`](web5_crypto.md#jwkparamsanykeytype), ``"kty"``\> & { `e`: `string` ; `kty`: ``"RSA"`` ; `n`: `string`  }

#### Defined in

[web5-js/packages/crypto/src/jose.ts:244](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L244)

___

### JwkType

Ƭ **JwkType**: ``"EC"`` \| ``"RSA"`` \| ``"oct"`` \| ``"OKP"``

JSON Web Key Types

#### Defined in

[web5-js/packages/crypto/src/jose.ts:35](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L35)

___

### JwkUse

Ƭ **JwkUse**: ``"sig"`` \| ``"enc"`` \| `string`

JSON Web Key Use

sig : Digital Signature or MAC
enc : Encryption

#### Defined in

[web5-js/packages/crypto/src/jose.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L30)

___

### PrivateKeyJwk

Ƭ **PrivateKeyJwk**: [`JwkParamsEcPrivate`](web5_crypto.md#jwkparamsecprivate) \| [`JwkParamsOkpPrivate`](web5_crypto.md#jwkparamsokpprivate) \| [`JwkParamsOctPrivate`](web5_crypto.md#jwkparamsoctprivate) \| [`JwkParamsRsaPrivate`](web5_crypto.md#jwkparamsrsaprivate)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:282](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L282)

___

### PublicKeyJwk

Ƭ **PublicKeyJwk**: [`JwkParamsEcPublic`](web5_crypto.md#jwkparamsecpublic) \| [`JwkParamsOkpPublic`](web5_crypto.md#jwkparamsokppublic) \| [`JwkParamsRsaPublic`](web5_crypto.md#jwkparamsrsapublic)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:280](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L280)

## Variables

### CryptoKeyWithJwk

• `Const` **CryptoKeyWithJwk**: (...`args`: `any`[]) => `__class`<typeof [`CryptoKey`](../classes/web5_crypto.CryptoKey.md)\> & typeof [`CryptoKey`](../classes/web5_crypto.CryptoKey.md)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:938](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L938)

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

[web5-js/packages/crypto/src/jose.ts:929](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L929)
