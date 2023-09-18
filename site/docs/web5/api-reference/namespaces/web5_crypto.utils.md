---
id: "web5_crypto.utils"
title: "Namespace: utils"
sidebar_label: "@web5/crypto.utils"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).utils

## Functions

### checkRequiredProperty

▸ **checkRequiredProperty**(`options`): `void`

Checks whether the properties object provided contains the specified property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.inObject` | `object` |
| `options.property` | `string` |

#### Returns

`void`

void

**`Throws`**

If the property is not a key in the properties object.

#### Defined in

[web5-js/packages/crypto/src/utils.ts:16](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/utils.ts#L16)

___

### checkValidProperty

▸ **checkValidProperty**(`options`): `void`

Checks whether the property specified is a member of the list of valid properties.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.allowedProperties` | `string`[] \| `Map`<`string`, `unknown`\> \| `Set`<`string`\> |
| `options.property` | `string` |

#### Returns

`void`

void

**`Throws`**

If the property is not a member of the allowedProperties Array, Map, or Set.

#### Defined in

[web5-js/packages/crypto/src/utils.ts:37](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/utils.ts#L37)

___

### isBytesKeyPair

▸ **isBytesKeyPair**(`key`): key is BytesKeyPair

Type guard function to check if the given key is a raw key pair
of Uint8Array typed arrays.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `undefined` \| [`BytesKeyPair`](../interfaces/web5_crypto.BytesKeyPair.md) | The key to check. |

#### Returns

key is BytesKeyPair

True if the key is a pair of Uint8Array typed arrays, false otherwise.

#### Defined in

[web5-js/packages/crypto/src/utils.ts:61](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/utils.ts#L61)

___

### isCryptoKeyPair

▸ **isCryptoKeyPair**(`key`): key is CryptoKeyPair

Type guard function to check if the given key is a
Web5Crypto.CryptoKeyPair.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [`CryptoKey`](../interfaces/web5_crypto.Web5Crypto.CryptoKey.md) \| [`CryptoKeyPair`](../interfaces/web5_crypto.Web5Crypto.CryptoKeyPair.md) | The key to check. |

#### Returns

key is CryptoKeyPair

True if the key is a CryptoKeyPair, false otherwise.

#### Defined in

[web5-js/packages/crypto/src/utils.ts:74](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/utils.ts#L74)

___

### keyToMultibaseId

▸ **keyToMultibaseId**(`options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.key` | `Uint8Array` |
| `options.multicodecCode?` | `number` |
| `options.multicodecName?` | `string` |

#### Returns

`string`

#### Defined in

[web5-js/packages/crypto/src/utils.ts:78](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/utils.ts#L78)

___

### multibaseIdToKey

▸ **multibaseIdToKey**(`options`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.multibaseKeyId` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `key` | `Uint8Array` |
| `multicodecCode` | `number` |
| `multicodecName` | `string` |

#### Defined in

[web5-js/packages/crypto/src/utils.ts:91](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/utils.ts#L91)

___

### randomBytes

▸ **randomBytes**(`bytesLength`): `Uint8Array`

Generates secure pseudorandom values of the specified length using
`crypto.getRandomValues`, which defers to the operating system.

This function is a wrapper around `randomBytes` from the '@noble/hashes'
package. It's designed to be cryptographically strong, suitable for
generating keys, initialization vectors, and other random values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytesLength` | `number` | The number of bytes to generate. |

#### Returns

`Uint8Array`

A Uint8Array containing the generated random bytes.

**`Example`**

```ts
const bytes = randomBytes(32); // Generates 32 random bytes
```

**`See`**

[@noble/hashes on NPM](https://www.npmjs.com/package/@noble/hashes)
for more information about the underlying implementation.

#### Defined in

[web5-js/packages/crypto/src/utils.ts:120](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/utils.ts#L120)

___

### randomUuid

▸ **randomUuid**(): `string`

Generates a UUID (Universally Unique Identifier) using a
cryptographically strong random number generator following
the version 4 format, as specified in RFC 4122.

A version 4 UUID is a randomly generated UUID. The 13th character
is set to '4' to denote version 4, and the 17th character is one
of '8', '9', 'A', or 'B' to comply with the variant 1 format of
UUIDs (the high bits are set to '10').

The UUID is a 36 character string, including hyphens, and looks like this:
xxxxxxxx-xxxx-4xxx-axxx-xxxxxxxxxxxx

Note that while UUIDs are not guaranteed to be unique, they are
practically unique" given the large number of possible UUIDs and
the randomness of generation.

After generating the UUID, the function securely wipes the memory
areas used to hold temporary values to prevent any possibility of
the random values being unintentionally leaked or retained in memory.

#### Returns

`string`

A UUID string in version 4 format.

#### Defined in

[web5-js/packages/crypto/src/utils.ts:147](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/crypto/src/utils.ts#L147)
