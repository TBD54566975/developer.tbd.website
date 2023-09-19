# Interface: JwsHeaderParams

## Hierarchy

- [`JoseHeaderParams`](JoseHeaderParams.md)

  ↳ **`JwsHeaderParams`**

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [alg](JwsHeaderParams.md#alg)
- [crit](JwsHeaderParams.md#crit)
- [cty](JwsHeaderParams.md#cty)
- [jku](JwsHeaderParams.md#jku)
- [jwk](JwsHeaderParams.md#jwk)
- [kid](JwsHeaderParams.md#kid)
- [typ](JwsHeaderParams.md#typ)
- [x5c](JwsHeaderParams.md#x5c)
- [x5t](JwsHeaderParams.md#x5t)
- [x5u](JwsHeaderParams.md#x5u)

## Properties

### alg

• **alg**: ``"ES256"`` \| ``"ES256K"`` \| ``"ES384"`` \| ``"ES512"`` \| ``"HS256"`` \| ``"HS384"`` \| ``"HS512"``

#### Defined in

[packages/crypto/src/jose.ts:303](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L303)

___

### crit

• `Optional` **crit**: `string`[]

#### Defined in

[packages/crypto/src/jose.ts:321](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L321)

___

### cty

• `Optional` **cty**: `string`

#### Inherited from

[JoseHeaderParams](JoseHeaderParams.md).[cty](JoseHeaderParams.md#cty)

#### Defined in

[packages/crypto/src/jose.ts:292](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L292)

___

### jku

• `Optional` **jku**: `string`

#### Inherited from

[JoseHeaderParams](JoseHeaderParams.md).[jku](JoseHeaderParams.md#jku)

#### Defined in

[packages/crypto/src/jose.ts:293](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L293)

___

### jwk

• `Optional` **jwk**: [`PublicKeyJwk`](../index.md#publickeyjwk)

#### Inherited from

[JoseHeaderParams](JoseHeaderParams.md).[jwk](JoseHeaderParams.md#jwk)

#### Defined in

[packages/crypto/src/jose.ts:294](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L294)

___

### kid

• `Optional` **kid**: `string`

#### Inherited from

[JoseHeaderParams](JoseHeaderParams.md).[kid](JoseHeaderParams.md#kid)

#### Defined in

[packages/crypto/src/jose.ts:295](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L295)

___

### typ

• `Optional` **typ**: `string`

#### Inherited from

[JoseHeaderParams](JoseHeaderParams.md).[typ](JoseHeaderParams.md#typ)

#### Defined in

[packages/crypto/src/jose.ts:296](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L296)

___

### x5c

• `Optional` **x5c**: `string`[]

#### Inherited from

[JoseHeaderParams](JoseHeaderParams.md).[x5c](JoseHeaderParams.md#x5c)

#### Defined in

[packages/crypto/src/jose.ts:297](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L297)

___

### x5t

• `Optional` **x5t**: `string`

#### Inherited from

[JoseHeaderParams](JoseHeaderParams.md).[x5t](JoseHeaderParams.md#x5t)

#### Defined in

[packages/crypto/src/jose.ts:298](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L298)

___

### x5u

• `Optional` **x5u**: `string`

#### Inherited from

[JoseHeaderParams](JoseHeaderParams.md).[x5u](JoseHeaderParams.md#x5u)

#### Defined in

[packages/crypto/src/jose.ts:299](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L299)
