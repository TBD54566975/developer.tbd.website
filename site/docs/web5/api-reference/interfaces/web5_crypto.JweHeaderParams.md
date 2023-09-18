---
id: "web5_crypto.JweHeaderParams"
title: "Interface: JweHeaderParams"
sidebar_label: "@web5/crypto.JweHeaderParams"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).JweHeaderParams

## Hierarchy

- [`JoseHeaderParams`](web5_crypto.JoseHeaderParams.md)

  ↳ **`JweHeaderParams`**

## Indexable

▪ [key: `string`]: `unknown`

## Properties

### alg

• **alg**: ``"dir"`` \| ``"A128KW"`` \| ``"A192KW"`` \| ``"A256KW"`` \| ``"ECDH-ES"`` \| ``"ECDH-ES+A128KW"`` \| ``"ECDH-ES+A192KW"`` \| ``"ECDH-ES+A256KW"`` \| ``"A128GCMKW"`` \| ``"A192GCMKW"`` \| ``"A256GCMKW"`` \| ``"PBES2-HS256+A128KW"`` \| ``"PBES2-HS384+A192KW"`` \| ``"PBES2-HS512+A256KW"`` \| ``"PBES2-HS512+XC20PKW"``

#### Defined in

[web5-js/packages/crypto/src/jose.ts:328](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L328)

___

### apu

• `Optional` **apu**: `Uint8Array`

#### Defined in

[web5-js/packages/crypto/src/jose.ts:360](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L360)

___

### apv

• `Optional` **apv**: `Uint8Array`

#### Defined in

[web5-js/packages/crypto/src/jose.ts:362](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L362)

___

### crit

• `Optional` **crit**: `string`[]

#### Defined in

[web5-js/packages/crypto/src/jose.ts:366](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L366)

___

### cty

• `Optional` **cty**: `string`

#### Inherited from

[JoseHeaderParams](web5_crypto.JoseHeaderParams.md).[cty](web5_crypto.JoseHeaderParams.md#cty)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:292](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L292)

___

### enc

• **enc**: ``"A128GCM"`` \| ``"A192GCM"`` \| ``"A256GCM"`` \| ``"A128CBC-HS256"`` \| ``"A192CBC-HS384"`` \| ``"A256CBC-HS512"`` \| ``"XC20P"``

Cryptographic Algorithms for Content Encryption
JWE uses cryptographic algorithms to encrypt and integrity-protect the
plaintext and to integrity-protect the Additional Authenticated Data.

#### Defined in

[web5-js/packages/crypto/src/jose.ts:373](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L373)

___

### epk

• `Optional` **epk**: `Uint8Array`

#### Defined in

[web5-js/packages/crypto/src/jose.ts:392](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L392)

___

### iv

• `Optional` **iv**: `Uint8Array`

#### Defined in

[web5-js/packages/crypto/src/jose.ts:394](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L394)

___

### jku

• `Optional` **jku**: `string`

#### Inherited from

[JoseHeaderParams](web5_crypto.JoseHeaderParams.md).[jku](web5_crypto.JoseHeaderParams.md#jku)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:293](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L293)

___

### jwk

• `Optional` **jwk**: [`PublicKeyJwk`](../modules/web5_crypto.md#publickeyjwk)

#### Inherited from

[JoseHeaderParams](web5_crypto.JoseHeaderParams.md).[jwk](web5_crypto.JoseHeaderParams.md#jwk)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:294](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L294)

___

### kid

• `Optional` **kid**: `string`

#### Inherited from

[JoseHeaderParams](web5_crypto.JoseHeaderParams.md).[kid](web5_crypto.JoseHeaderParams.md#kid)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:295](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L295)

___

### p2c

• `Optional` **p2c**: `number`

#### Defined in

[web5-js/packages/crypto/src/jose.ts:396](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L396)

___

### p2s

• `Optional` **p2s**: `string`

#### Defined in

[web5-js/packages/crypto/src/jose.ts:398](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L398)

___

### typ

• `Optional` **typ**: `string`

#### Inherited from

[JoseHeaderParams](web5_crypto.JoseHeaderParams.md).[typ](web5_crypto.JoseHeaderParams.md#typ)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:296](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L296)

___

### x5c

• `Optional` **x5c**: `string`[]

#### Inherited from

[JoseHeaderParams](web5_crypto.JoseHeaderParams.md).[x5c](web5_crypto.JoseHeaderParams.md#x5c)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:297](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L297)

___

### x5t

• `Optional` **x5t**: `string`

#### Inherited from

[JoseHeaderParams](web5_crypto.JoseHeaderParams.md).[x5t](web5_crypto.JoseHeaderParams.md#x5t)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:298](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L298)

___

### x5u

• `Optional` **x5u**: `string`

#### Inherited from

[JoseHeaderParams](web5_crypto.JoseHeaderParams.md).[x5u](web5_crypto.JoseHeaderParams.md#x5u)

#### Defined in

[web5-js/packages/crypto/src/jose.ts:299](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L299)
