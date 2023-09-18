---
id: "web5_crypto.XChaCha20"
title: "Class: XChaCha20"
sidebar_label: "@web5/crypto.XChaCha20"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).XChaCha20

## Constructors

### constructor

• **new XChaCha20**()

## Methods

### decrypt

▸ `Static` **decrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.data` | `Uint8Array` |
| `options.key` | `Uint8Array` |
| `options.nonce` | `Uint8Array` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/xchacha20.ts:4](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20.ts#L4)

___

### encrypt

▸ `Static` **encrypt**(`options`): `Promise`<`Uint8Array`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.data` | `Uint8Array` |
| `options.key` | `Uint8Array` |
| `options.nonce` | `Uint8Array` |

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/xchacha20.ts:16](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20.ts#L16)

___

### generateKey

▸ `Static` **generateKey**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[web5-js/packages/crypto/src/crypto-primitives/xchacha20.ts:28](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20.ts#L28)
