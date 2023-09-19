# Class: XChaCha20Poly1305

## Table of contents

### Constructors

- [constructor](XChaCha20Poly1305.md#constructor)

### Methods

- [decrypt](XChaCha20Poly1305.md#decrypt)
- [encrypt](XChaCha20Poly1305.md#encrypt)
- [generateKey](XChaCha20Poly1305.md#generatekey)

## Constructors

### constructor

• **new XChaCha20Poly1305**()

## Methods

### decrypt

▸ `Static` **decrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.additionalData?` | `Uint8Array` |
| `options.data` | `Uint8Array` |
| `options.key` | `Uint8Array` |
| `options.nonce` | `Uint8Array` |
| `options.tag` | `Uint8Array` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts:7](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts#L7)

___

### encrypt

▸ `Static` **encrypt**(`options`): `Promise`<{ `ciphertext`: `Uint8Array` ; `tag`: `Uint8Array`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.additionalData?` | `Uint8Array` |
| `options.data` | `Uint8Array` |
| `options.key` | `Uint8Array` |
| `options.nonce` | `Uint8Array` |

#### Returns

`Promise`<{ `ciphertext`: `Uint8Array` ; `tag`: `Uint8Array`  }\>

#### Defined in

[packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts:23](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts#L23)

___

### generateKey

▸ `Static` **generateKey**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts:40](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts#L40)
