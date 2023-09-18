---
id: "web5_crypto.XChaCha20Poly1305"
title: "Class: XChaCha20Poly1305"
sidebar_label: "@web5/crypto.XChaCha20Poly1305"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).XChaCha20Poly1305

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

[web5-js/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts:7](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts#L7)

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

[web5-js/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts:23](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts#L23)

___

### generateKey

▸ `Static` **generateKey**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts:40](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20-poly1305.ts#L40)
