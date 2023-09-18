---
id: "web5_crypto.AesGcm"
title: "Class: AesGcm"
sidebar_label: "@web5/crypto.AesGcm"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).AesGcm

The `AesGcm` class provides an interface for AES-GCM
(Advanced Encryption Standard - Galois/Counter Mode) encryption and
decryption operations. The class uses the Web Crypto API for
cryptographic operations.

All methods of this class are asynchronous and return Promises. They all
use the Uint8Array type for keys and data, providing a consistent
interface for working with binary data.

Example usage:

```ts
const key = await AesGcm.generateKey({ length: 128 });
const iv = new Uint8Array(12); // generate a 12-byte initialization vector
const message = new TextEncoder().encode('Hello, world!');
const ciphertext = await AesGcm.encrypt({
  data: message,
  iv,
  key,
  tagLength: 128
});
const plaintext = await AesGcm.decrypt({
  data: ciphertext,
  iv,
  key,
  tagLength: 128
});
console.log(new TextDecoder().decode(plaintext)); // 'Hello, world!'
```

## Constructors

### constructor

• **new AesGcm**()

## Methods

### decrypt

▸ `Static` **decrypt**(`options`): `Promise`<`Uint8Array`\>

Decrypts the provided data using AES-GCM.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the decryption operation. |
| `options.additionalData?` | `Uint8Array` | Data that will be authenticated along with the encrypted data. |
| `options.data` | `Uint8Array` | The data to decrypt. |
| `options.iv` | `Uint8Array` | A unique initialization vector. |
| `options.key` | `Uint8Array` | The key to use for decryption. |
| `options.tagLength?` | `number` | This size of the authentication tag generated in bits. |

#### Returns

`Promise`<`Uint8Array`\>

A Promise that resolves to the decrypted data as a Uint8Array.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/aes-gcm.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/aes-gcm.ts#L46)

___

### encrypt

▸ `Static` **encrypt**(`options`): `Promise`<`Uint8Array`\>

Encrypts the provided data using AES-GCM.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the encryption operation. |
| `options.additionalData?` | `Uint8Array` | Data that will be authenticated along with the encrypted data. |
| `options.data` | `Uint8Array` | The data to decrypt. |
| `options.iv` | `Uint8Array` | A unique initialization vector. |
| `options.key` | `Uint8Array` | The key to use for decryption. |
| `options.tagLength?` | `number` | This size of the authentication tag generated in bits. |

#### Returns

`Promise`<`Uint8Array`\>

A Promise that resolves to the encrypted data as a Uint8Array.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/aes-gcm.ts:81](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/aes-gcm.ts#L81)

___

### generateKey

▸ `Static` **generateKey**(`options`): `Promise`<`Uint8Array`\>

Generates an AES key of a given length.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.length` | `number` |

#### Returns

`Promise`<`Uint8Array`\>

A Promise that resolves to the generated key as a Uint8Array.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/aes-gcm.ts:111](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/aes-gcm.ts#L111)

___

### importKey

▸ `Private` `Static` **importKey**(`key`): `Promise`<`CryptoKey`\>

A private method to import a raw key for use with the Web Crypto API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Uint8Array` | The raw key material. |

#### Returns

`Promise`<`CryptoKey`\>

A Promise that resolves to a CryptoKey.

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/aes-gcm.ts:129](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/aes-gcm.ts#L129)
