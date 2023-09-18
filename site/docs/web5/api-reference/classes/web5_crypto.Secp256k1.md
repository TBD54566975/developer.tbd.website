---
id: "web5_crypto.Secp256k1"
title: "Class: Secp256k1"
sidebar_label: "@web5/crypto.Secp256k1"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).Secp256k1

The `Secp256k1` class provides an interface for generating secp256k1 key pairs,
computing public keys from private keys, generating shaerd secrets, and
signing and verifying messages.

The class uses the '@noble/secp256k1' package for the cryptographic operations,
and the '@noble/hashes/sha256' package for generating the hash digests needed
for the signing and verification operations.

The methods of this class are all asynchronous and return Promises. They all use
the Uint8Array type for keys, signatures, and data, providing a consistent
interface for working with binary data.

Example usage:

```ts
const keyPair = await Secp256k1.generateKeyPair();
const message = new TextEncoder().encode('Hello, world!');
const signature = await Secp256k1.sign({
  algorithm: { hash: 'SHA-256' },
  key: keyPair.privateKey,
  data: message
});
const isValid = await Secp256k1.verify({
  algorithm: { hash: 'SHA-256' },
  key: keyPair.publicKey,
  signature,
  data: message
});
console.log(isValid); // true
```

## Constructors

### constructor

• **new Secp256k1**()

## Properties

### hashAlgorithms

▪ `Private` `Static` **hashAlgorithms**: `Record`<`string`, [`HashFunction`](../modules/web5_crypto.md#hashfunction)\>

A private static field containing a map of hash algorithm names to their
corresponding hash functions.  The map is used in the 'sign' and 'verify'
methods to get the specified hash function.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:47](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L47)

## Methods

### convertPublicKey

▸ `Static` **convertPublicKey**(`options`): `Promise`<`Uint8Array`\>

Converts a public key between its compressed and uncompressed forms.

Given a public key, this method can either compress or decompress it
depending on the provided `compressedPublicKey` option. The conversion
process involves decoding the Weierstrass points from the key bytes
and then returning the key in the desired format.

This is useful in scenarios where space is a consideration or when
interfacing with systems that expect a specific public key format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the public key conversion. |
| `options.compressedPublicKey` | `boolean` | A boolean indicating whether the output should be in compressed form. If true, the method returns the compressed form of the provided public key. If false, it returns the uncompressed form. |
| `options.publicKey` | `Uint8Array` | The original public key, represented as a Uint8Array. |

#### Returns

`Promise`<`Uint8Array`\>

A Promise that resolves to the converted public key as a Uint8Array.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:72](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L72)

___

### generateKeyPair

▸ `Static` **generateKeyPair**(`options?`): `Promise`<[`BytesKeyPair`](../interfaces/web5_crypto.BytesKeyPair.md)\>

Generates a secp256k1 key pair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | Optional parameters for the key generation. |
| `options.compressedPublicKey?` | `boolean` | If true, generates a compressed public key. Defaults to true. |

#### Returns

`Promise`<[`BytesKeyPair`](../interfaces/web5_crypto.BytesKeyPair.md)\>

A Promise that resolves to an object containing the private and public keys as Uint8Array.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:92](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L92)

___

### getCurvePoints

▸ `Static` **getCurvePoints**(`options`): `Promise`<{ `x`: `Uint8Array` ; `y`: `Uint8Array`  }\>

Returns the elliptic curve points (x and y coordinates) for a given secp256k1 key.

In the case of a private key, the public key is first computed from the private key,
then the x and y coordinates of the public key point on the elliptic curve are returned.

In the case of a public key, the x and y coordinates of the key point on the elliptic
curve are returned directly.

The returned coordinates can be used to perform various operations on the elliptic curve,
such as addition and multiplication of points, which can be used in various cryptographic
schemes and protocols.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the operation. |
| `options.key` | `Uint8Array` | The key for which to get the elliptic curve points. Can be either a private key or a public key. The key should be passed as a Uint8Array. |

#### Returns

`Promise`<{ `x`: `Uint8Array` ; `y`: `Uint8Array`  }\>

A Promise that resolves to an object with properties 'x' and 'y',
         each being a Uint8Array representing the x and y coordinates of the key point on the elliptic curve.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:131](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L131)

___

### getPublicKey

▸ `Static` **getPublicKey**(`options`): `Promise`<`Uint8Array`\>

Computes the public key from a given private key.
If compressedPublicKey=true then the output is a 33-byte public key.
If compressedPublicKey=false then the output is a 65-byte public key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the public key computation. |
| `options.compressedPublicKey?` | `boolean` | If true, returns a compressed public key. Defaults to true. |
| `options.privateKey` | `Uint8Array` | The 32-byte private key from which to compute the public key. |

#### Returns

`Promise`<`Uint8Array`\>

A Promise that resolves to the computed public key as a Uint8Array.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:161](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L161)

___

### sharedSecret

▸ `Static` **sharedSecret**(`options`): `Promise`<`Uint8Array`\>

Generates a RFC6090 ECDH shared secret given the private key of one party
and the public key another party.

Note: When performing Elliptic Curve Diffie-Hellman (ECDH) key agreement,
the resulting shared secret is a point on the elliptic curve, which
consists of an x-coordinate and a y-coordinate. With a 256-bit curve like
secp256k1, each of these coordinates is 32 bytes (256 bits) long. However,
in the ECDH process, it's standard practice to use only the x-coordinate
of the shared secret point as the resulting shared key. This is because
the y-coordinate does not add to the entropy of the key, and both parties
can independently compute the x-coordinate, so using just the x-coordinate
simplifies matters.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.compressedSecret?` | `boolean` |
| `options.privateKey` | `Uint8Array` |
| `options.publicKey` | `Uint8Array` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:189](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L189)

___

### sign

▸ `Static` **sign**(`options`): `Promise`<`Uint8Array`\>

Generates a RFC6979 ECDSA signature of given data with a given private key and hash algorithm.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the signing operation. |
| `options.data` | `Uint8Array` | The data to sign. |
| `options.hash` | `string` | The hash algorithm to use to generate a digest of the data. |
| `options.key` | `Uint8Array` | The private key to use for signing. |

#### Returns

`Promise`<`Uint8Array`\>

A Promise that resolves to the signature as a Uint8Array.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:213](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L213)

___

### validatePrivateKey

▸ `Static` **validatePrivateKey**(`options`): `Promise`<`boolean`\>

Validates a given private key to ensure that it's a valid 32-byte number
that is less than the secp256k1 curve's order.

This method checks the byte length of the key and its numerical validity
according to the secp256k1 curve's parameters. It doesn't verify whether
the key corresponds to a known or authorized entity or whether it has
been compromised.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the key validation. |
| `options.key` | `Uint8Array` | The private key to validate, represented as a Uint8Array. |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to a boolean indicating whether the private
         key is a valid 32-byte number less than the secp256k1 curve's order.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:247](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L247)

___

### validatePublicKey

▸ `Static` **validatePublicKey**(`options`): `Promise`<`boolean`\>

Validates a given public key to ensure that it corresponds to a
valid point on the secp256k1 elliptic curve.

This method decodes the Weierstrass points from the key bytes and
asserts their validity on the curve. If the points are not valid,
the method returns false. If the points are valid, the method
returns true.

Note: This method does not check whether the key corresponds to a
known or authorized entity, or whether it has been compromised.
It only checks the mathematical validity of the key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the key validation. |
| `options.key` | `Uint8Array` | The key to validate, represented as a Uint8Array. |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to a boolean indicating whether the key
         corresponds to a valid point on the secp256k1 elliptic curve.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:273](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L273)

___

### verify

▸ `Static` **verify**(`options`): `Promise`<`boolean`\>

Verifies a RFC6979 ECDSA signature of given data with a given public key and hash algorithm.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the verification operation. |
| `options.data` | `Uint8Array` | The data that was signed. |
| `options.hash` | `string` | The hash algorithm to use to generate a digest of the data. |
| `options.key` | `Uint8Array` | The public key to use for verification. |
| `options.signature` | `Uint8Array` | The signature to verify. |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to a boolean indicating whether the signature is valid.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/secp256k1.ts:302](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/secp256k1.ts#L302)
