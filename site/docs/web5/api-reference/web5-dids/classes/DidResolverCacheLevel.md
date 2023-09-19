# Class: DidResolverCacheLevel

Naive level-based cache for did resolution results. It just so happens that level aggressively keeps as much as it
can in memory when possible while also writing to the filesystem (in node runtime) and indexedDB (in browser runtime).
the persistent aspect is especially useful across page refreshes.

## Implements

- [`DidResolverCache`](../index.md#didresolvercache)

## Table of contents

### Constructors

- [constructor](DidResolverCacheLevel.md#constructor)

### Methods

- [clear](DidResolverCacheLevel.md#clear)
- [close](DidResolverCacheLevel.md#close)
- [delete](DidResolverCacheLevel.md#delete)
- [get](DidResolverCacheLevel.md#get)
- [set](DidResolverCacheLevel.md#set)

## Constructors

### constructor

• **new DidResolverCacheLevel**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`DidResolverCacheOptions`](../index.md#didresolvercacheoptions) |

#### Defined in

[resolver-cache-level.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-level.ts#L30)

## Methods

### clear

▸ **clear**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

DidResolverCache.clear

#### Defined in

[resolver-cache-level.ts:75](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-level.ts#L75)

___

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

DidResolverCache.close

#### Defined in

[resolver-cache-level.ts:79](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-level.ts#L79)

___

### delete

▸ **delete**(`did`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidResolverCache.delete

#### Defined in

[resolver-cache-level.ts:71](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-level.ts#L71)

___

### get

▸ **get**(`did`): `Promise`<`void` \| [`DidResolutionResult`](../index.md#didresolutionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Promise`<`void` \| [`DidResolutionResult`](../index.md#didresolutionresult)\>

#### Implementation of

DidResolverCache.get

#### Defined in

[resolver-cache-level.ts:40](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-level.ts#L40)

___

### set

▸ **set**(`did`, `value`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |
| `value` | [`DidResolutionResult`](../index.md#didresolutionresult) |

#### Returns

`Promise`<`void`\>

#### Implementation of

DidResolverCache.set

#### Defined in

[resolver-cache-level.ts:64](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-level.ts#L64)
