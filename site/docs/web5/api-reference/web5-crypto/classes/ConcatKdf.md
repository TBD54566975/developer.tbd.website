# Class: ConcatKdf

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

## Table of contents

### Constructors

- [constructor](ConcatKdf.md#constructor)

### Methods

- [deriveKey](ConcatKdf.md#derivekey)

## Constructors

### constructor

• **new ConcatKdf**()

## Methods

### deriveKey

▸ `Static` **deriveKey**(`options`): `Promise`<`Uint8Array`\>

Derives a key of a specified length from the input parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Input parameters for key derivation. |
| `options.keyDataLen` | `number` | The desired length of the derived key in bits. |
| `options.otherInfo` | [`ConcatKdfOtherInfo`](../index.md#concatkdfotherinfo) | Additional public information to use in key derivation. |
| `options.sharedSecret` | `Uint8Array` | The shared secret key to derive from. |

#### Returns

`Promise`<`Uint8Array`\>

The derived key as a Uint8Array.

**`Throws`**

If the keyDataLen would require multiple rounds.

#### Defined in

[packages/crypto/src/crypto-primitives/concat-kdf.ts:86](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/concat-kdf.ts#L86)
