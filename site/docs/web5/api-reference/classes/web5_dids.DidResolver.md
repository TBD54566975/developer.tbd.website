---
id: "web5_dids.DidResolver"
title: "Class: DidResolver"
sidebar_label: "@web5/dids.DidResolver"
custom_edit_url: null
---

[@web5/dids](../modules/web5_dids.md).DidResolver

The `DidResolver` class is responsible for resolving DIDs to DID documents.
It uses method resolvers to resolve DIDs of different methods and a cache
to store resolved DID documents.

## Constructors

### constructor

• **new DidResolver**(`options`)

Constructs a new `DidResolver`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`DidResolverOptions`](../modules/web5_dids.md#didresolveroptions) | The options for constructing the `DidResolver`. |

#### Defined in

[did-resolver.ts:39](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-resolver.ts#L39)

## Properties

### cache

• `Private` **cache**: [`DidResolverCache`](../modules/web5_dids.md#didresolvercache)

A cache for storing resolved DID documents.

#### Defined in

[did-resolver.ts:25](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-resolver.ts#L25)

___

### didResolvers

• `Private` **didResolvers**: `Map`<`string`, [`DidMethodResolver`](../interfaces/web5_dids.DidMethodResolver.md)\>

A map to store method resolvers against method names.

#### Defined in

[did-resolver.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-resolver.ts#L30)

## Methods

### resolve

▸ **resolve**(`didUrl`, `resolutionOptions?`): `Promise`<[`DidResolutionResult`](../modules/web5_dids.md#didresolutionresult)\>

Resolves a DID to a DID Resolution Result.
If the DID Resolution Result is present in the cache, it returns the cached
result. Otherwise, it uses the appropriate method resolver to resolve
the DID, stores the resolution result in the cache, and returns the
resolultion result.

Note: The method signature for resolve() in this implementation must match
the `DidResolver` implementation in
[dwn-sdk-js](https://github.com/TBD54566975/dwn-sdk-js) so that
Web5 apps and the underlying DWN instance can share the same DID
resolution cache.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `didUrl` | `string` | The DID or DID URL to resolve. |
| `resolutionOptions?` | [`DidResolutionOptions`](../interfaces/web5_dids.DidResolutionOptions.md) | - |

#### Returns

`Promise`<[`DidResolutionResult`](../modules/web5_dids.md#didresolutionresult)\>

A promise that resolves to the DID Resolution Result.

#### Defined in

[did-resolver.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-resolver.ts#L63)
