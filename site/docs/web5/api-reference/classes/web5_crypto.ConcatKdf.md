---
id: "web5_crypto.ConcatKdf"
title: "Class: ConcatKdf"
sidebar_label: "@web5/crypto.ConcatKdf"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).ConcatKdf

An implementation of the Concatenation Key Derivation Function (ConcatKDF)
as specified in NIST.800-56A, a single-step key-derivation function (SSKDF).
ConcatKDF produces a derived key from a secret key (like a shared secret
from ECDH), and other optional public information. This implementation
specifically uses SHA-256 as the pseudorandom function (PRF).

**`See`**

 - [NIST.800-56A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-56Ar3.pdf)
 - [RFC 7518 Section 4.6.2](https://datatracker.ietf.org/doc/html/rfc7518#section-4.6.2)

Note: This implementation allows for only a single round / repetition
using the function K(1) = H(counter || Z || OtherInfo), where:
  K(1) is the derived key material after one round
  H is the SHA-256 hashing function
  counter is a 32-bit, big-endian bit string counter set to 0x00000001
  Z is the shared secret value obtained from a key agreement protocol
  OtherInfo is a bit string used to ensure that the derived keying
    material is adequately "bound" to the key-agreement transaction.

Additional Information:

Z, or "shared secret":
  The shared secret value obtained from a key agreement protocol, such as
  Diffie-Hellman, ECDH (Elliptic Curve Diffie-Hellman). Importantly, this
  shared secret is not directly used as the encryption or authentication
  key, but as an input to a key derivation function (KDF), such as Concat
  KDF, to generate the actual key. This adds an extra layer of security, as
  even if the shared secret gets compromised, the actual  encryption or
  authentication key stays safe. This shared secret 'Z' value is kept
  confidential between the two parties in the key agreement protocol.

## Constructors

### constructor

• **new ConcatKdf**()

## Methods

### computeOtherInfo

▸ `Private` `Static` **computeOtherInfo**(`options`): `Uint8Array`

Computes the OtherInfo parameter as specified in NIST.800-56A.
OtherInfo binds the derived key material to the context of the
key agreement transaction.

This implementation follows the recommended format for OtherInfo
specified in section 5.8.1.2.1 of the NIST.800-56A publication.

OtherInfo is a bit string equal to the following concatenation:
AlgorithmID || PartyUInfo || PartyVInfo {|| SuppPubInfo }{|| SuppPrivInfo }

SuppPubInfo is the key length in bits, big endian encoded as a
32-bit number. For example, 128 would be [0, 0, 0, 128] and
256 would be [0, 0, 1, 0].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ConcatKdfOtherInfo`](../modules/web5_crypto.md#concatkdfotherinfo) | Input data to construct OtherInfo. |

#### Returns

`Uint8Array`

OtherInfo as a Uint8Array.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/concat-kdf.ts:139](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/concat-kdf.ts#L139)

___

### deriveKey

▸ `Static` **deriveKey**(`options`): `Promise`<`Uint8Array`\>

Derives a key of a specified length from the input parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Input parameters for key derivation. |
| `options.keyDataLen` | `number` | The desired length of the derived key in bits. |
| `options.otherInfo` | [`ConcatKdfOtherInfo`](../modules/web5_crypto.md#concatkdfotherinfo) | Additional public information to use in key derivation. |
| `options.sharedSecret` | `Uint8Array` | The shared secret key to derive from. |

#### Returns

`Promise`<`Uint8Array`\>

The derived key as a Uint8Array.

**`Throws`**

If the keyDataLen would require multiple rounds.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/concat-kdf.ts:86](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/concat-kdf.ts#L86)

___

### toDataLenData

▸ `Private` `Static` **toDataLenData**(`options`): `Uint8Array`

Encodes input data as a length-prefixed byte string, or
as a fixed-length bit string if specified.

If variableLength = true, return the data in the form Datalen || Data,
where Data is a variable-length string of zero or more (eight-bit)
bytes, and Datalen is a fixed-length, big-endian counter that
indicates the length (in bytes) of Data.

If variableLength = false, return the data formatted as a
fixed-length bit string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Input data and options for the conversion. |
| `options.data` | `unknown` | The input data to encode. Must be a type convertible to Uint8Array by the Convert class. |
| `options.variableLength?` | `boolean` | Whether to output the data as variable length. Default is true. |

#### Returns

`Uint8Array`

The input data encoded as a Uint8Array.

**`Throws`**

If fixed-length data is not a number.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/concat-kdf.ts:175](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/concat-kdf.ts#L175)
