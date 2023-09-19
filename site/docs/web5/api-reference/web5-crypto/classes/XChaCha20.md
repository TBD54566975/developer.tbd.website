# Class: XChaCha20

## Table of contents

### Constructors

- [constructor](XChaCha20.md#constructor)

### Methods

- [decrypt](XChaCha20.md#decrypt)
- [encrypt](XChaCha20.md#encrypt)
- [generateKey](XChaCha20.md#generatekey)

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

[packages/crypto/src/crypto-primitives/xchacha20.ts:4](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20.ts#L4)

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

[packages/crypto/src/crypto-primitives/xchacha20.ts:16](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20.ts#L16)

___

### generateKey

▸ `Static` **generateKey**(): `Promise`<`Uint8Array`\>

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[packages/crypto/src/crypto-primitives/xchacha20.ts:28](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/crypto-primitives/xchacha20.ts#L28)
