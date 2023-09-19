# Class: Jose

## Table of contents

### Constructors

- [constructor](Jose.md#constructor)

### Methods

- [cryptoKeyToJwk](Jose.md#cryptokeytojwk)
- [cryptoKeyToJwkPair](Jose.md#cryptokeytojwkpair)
- [joseToMulticodec](Jose.md#josetomulticodec)
- [joseToWebCrypto](Jose.md#josetowebcrypto)
- [jwkThumbprint](Jose.md#jwkthumbprint)
- [jwkToCryptoKey](Jose.md#jwktocryptokey)
- [jwkToKey](Jose.md#jwktokey)
- [jwkToMultibaseId](Jose.md#jwktomultibaseid)
- [keyToJwk](Jose.md#keytojwk)
- [multicodecToJose](Jose.md#multicodectojose)
- [webCryptoToJose](Jose.md#webcryptotojose)

## Constructors

### constructor

• **new Jose**()

## Methods

### cryptoKeyToJwk

▸ `Static` **cryptoKeyToJwk**(`options`): `Promise`<[`JsonWebKey`](../index.md#jsonwebkey)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | [`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md) |

#### Returns

`Promise`<[`JsonWebKey`](../index.md#jsonwebkey)\>

#### Defined in

[packages/crypto/src/jose.ts:470](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L470)

___

### cryptoKeyToJwkPair

▸ `Static` **cryptoKeyToJwkPair**(`options`): `Promise`<[`JwkKeyPair`](../index.md#jwkkeypair)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.keyPair` | [`CryptoKeyPair`](../interfaces/Web5Crypto.CryptoKeyPair.md) |

#### Returns

`Promise`<[`JwkKeyPair`](../index.md#jwkkeypair)\>

#### Defined in

[packages/crypto/src/jose.ts:493](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L493)

___

### joseToMulticodec

▸ `Static` **joseToMulticodec**(`options`): `Promise`<`MulticodecDefinition`<`number`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | [`JsonWebKey`](../index.md#jsonwebkey) |

#### Returns

`Promise`<`MulticodecDefinition`<`number`\>\>

#### Defined in

[packages/crypto/src/jose.ts:508](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L508)

___

### joseToWebCrypto

▸ `Static` **joseToWebCrypto**(`options`): [`GenerateKeyOptions`](../modules/Web5Crypto.md#generatekeyoptions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`<[`JsonWebKey`](../index.md#jsonwebkey)\> |

#### Returns

[`GenerateKeyOptions`](../modules/Web5Crypto.md#generatekeyoptions)

#### Defined in

[packages/crypto/src/jose.ts:536](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L536)

___

### jwkThumbprint

▸ `Static` **jwkThumbprint**(`options`): `Promise`<`string`\>

Computes the thumbprint of a JSON Web Key (JWK) using the method
specified in RFC 7638. This function accepts RSA, EC, OKP, and oct keys
and returns the thumbprint as a base64url encoded SHA-256 hash of the
JWK's required members, serialized and sorted lexicographically.

Purpose:
- Uniquely Identifying Keys: The thumbprint allows the unique
  identification of a specific JWK within a set of JWKs. It provides a
  deterministic way to generate a value that can be used as a key
  identifier (kid) or to match a specific key.

- Simplifying Key Management: In systems where multiple keys are used,
  managing and identifying individual keys can become complex. The
  thumbprint method simplifies this by creating a standardized, unique
  identifier for each key.

- Enabling Interoperability: By standardizing the method to compute a
  thumbprint, different systems can compute the same thumbprint value for
  a given JWK. This enables interoperability among systems that use JWKs.

- Secure Comparison: The thumbprint provides a way to securely compare
  JWKs to determine if they are equivalent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | [`JsonWebKey`](../index.md#jsonwebkey) |

#### Returns

`Promise`<`string`\>

The thumbprint as a base64url encoded string.

**`Throws`**

Throws an error if the provided key type is unsupported.

**`Example`**

```ts
const jwk: PublicKeyJwk = {
  'kty': 'EC',
  'crv': 'secp256k1',
  'x': '61iPYuGefxotzBdQZtDvv6cWHZmXrTTscY-u7Y2pFZc',
  'y': '88nPCVLfrAY9i-wg5ORcwVbHWC_tbeAd1JE2e0co0lU'
};

const thumbprint = jwkThumbprint(jwk);
console.log(`JWK thumbprint: ${thumbprint}`);
```

**`See`**

[RFC7638](https://datatracker.ietf.org/doc/html/rfc7638) for
the specification of JWK thumbprint computation.

#### Defined in

[packages/crypto/src/jose.ts:616](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L616)

___

### jwkToCryptoKey

▸ `Static` **jwkToCryptoKey**(`options`): `Promise`<[`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | [`JsonWebKey`](../index.md#jsonwebkey) |

#### Returns

`Promise`<[`CryptoKey`](../interfaces/Web5Crypto.CryptoKey.md)\>

#### Defined in

[packages/crypto/src/jose.ts:655](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L655)

___

### jwkToKey

▸ `Static` **jwkToKey**(`options`): `Promise`<{ `keyMaterial`: `Uint8Array` ; `keyType`: [`KeyType`](../modules/Web5Crypto.md#keytype)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | [`JsonWebKey`](../index.md#jsonwebkey) |

#### Returns

`Promise`<{ `keyMaterial`: `Uint8Array` ; `keyType`: [`KeyType`](../modules/Web5Crypto.md#keytype)  }\>

#### Defined in

[packages/crypto/src/jose.ts:692](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L692)

___

### jwkToMultibaseId

▸ `Static` **jwkToMultibaseId**(`options`): `Promise`<`string`\>

Note: All secp public keys are converted to compressed point encoding
   before the multibase identifier is computed.

Per [Multicodec table](https://github.com/multiformats/multicodec/blob/master/table.csv):
   public keys for Elliptic Curve cryptography algorithms (e.g., secp256k1,
   secp256k1r1, secp384r1, etc.) are always represented with compressed point
   encoding (e.g., secp256k1-pub, p256-pub, p384-pub, etc.).

Per [RFC 8812](https://datatracker.ietf.org/doc/html/rfc8812#name-jose-and-cose-secp256k1-cur):
   "As a compressed point encoding representation is not defined for JWK
   elliptic curve points, the uncompressed point encoding defined there
   MUST be used. The x and y values represented MUST both be exactly
   256 bits, with any leading zeros preserved.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | [`JsonWebKey`](../index.md#jsonwebkey) |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/crypto/src/jose.ts:752](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L752)

___

### keyToJwk

▸ `Static` **keyToJwk**(`options`): `Promise`<[`JsonWebKey`](../index.md#jsonwebkey)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |

#### Returns

`Promise`<[`JsonWebKey`](../index.md#jsonwebkey)\>

#### Defined in

[packages/crypto/src/jose.ts:782](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L782)

___

### multicodecToJose

▸ `Static` **multicodecToJose**(`options`): `Promise`<[`JsonWebKey`](../index.md#jsonwebkey)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.code?` | `number` |
| `options.name?` | `string` |

#### Returns

`Promise`<[`JsonWebKey`](../index.md#jsonwebkey)\>

#### Defined in

[packages/crypto/src/jose.ts:848](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L848)

___

### webCryptoToJose

▸ `Static` **webCryptoToJose**(`options`): `Partial`<[`JsonWebKey`](../index.md#jsonwebkey)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GenerateKeyOptions`](../modules/Web5Crypto.md#generatekeyoptions) |

#### Returns

`Partial`<[`JsonWebKey`](../index.md#jsonwebkey)\>

#### Defined in

[packages/crypto/src/jose.ts:872](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/jose.ts#L872)
