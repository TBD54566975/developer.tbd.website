# Class: AesCtr

The `AesCtr` class provides an interface for AES-CTR
(Advanced Encryption Standard - Counter) encryption and decryption
operations. The class uses the Web Crypto API for cryptographic operations.

All methods of this class are asynchronous and return Promises. They all
use the Uint8Array type for keys and data, providing a consistent
interface for working with binary data.

Example usage:

```ts
const key = await AesCtr.generateKey({ length: 128 });
const counter = new Uint8Array(16); // initialize a 16-byte counter
const message = new TextEncoder().encode('Hello, world!');
const ciphertext = await AesCtr.encrypt({
  counter,
  data: message,
  key,
  length: 128 // counter length in bits
});
const plaintext = await AesCtr.decrypt({
  counter,
  data: ciphertext,
  key,
  length: 128 // counter length in bits
});
console.log(new TextDecoder().decode(plaintext)); // 'Hello, world!'
```

## Table of contents

### Constructors

- [constructor](AesCtr.md#constructor)

### Methods

- [decrypt](AesCtr.md#decrypt)
- [encrypt](AesCtr.md#encrypt)
- [generateKey](AesCtr.md#generatekey)

## Constructors

### constructor

• **new AesCtr**()

## Methods

### decrypt

▸ `Static` **decrypt**(`options`): `Promise`<`Uint8Array`\>

Decrypts the provided data using AES-CTR.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the decryption operation. |
| `options.counter` | `Uint8Array` | The initial value of the counter block. |
| `options.data` | `Uint8Array` | The data to decrypt. |
| `options.key` | `Uint8Array` | The key to use for decryption. |
| `options.length` | `number` | The length of the counter block in bits. |

#### Returns

`Promise`<`Uint8Array`\>

A Promise that resolves to the decrypted data as a Uint8Array.

#### Defined in

[packages/crypto/src/crypto-primitives/aes-ctr.ts:44](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/aes-ctr.ts#L44)

___

### encrypt

▸ `Static` **encrypt**(`options`): `Promise`<`Uint8Array`\>

Encrypts the provided data using AES-CTR.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options for the encryption operation. |
| `options.counter` | `Uint8Array` | The initial value of the counter block. |
| `options.data` | `Uint8Array` | The data to encrypt. |
| `options.key` | `Uint8Array` | The key to use for encryption. |
| `options.length` | `number` | The length of the counter block in bits. |

#### Returns

`Promise`<`Uint8Array`\>

A Promise that resolves to the encrypted data as a Uint8Array.

#### Defined in

[packages/crypto/src/crypto-primitives/aes-ctr.ts:76](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/aes-ctr.ts#L76)

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

[packages/crypto/src/crypto-primitives/aes-ctr.ts:104](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/aes-ctr.ts#L104)
