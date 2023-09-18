---
id: "web5_dids.DidMethodResolver"
title: "Interface: DidMethodResolver"
sidebar_label: "@web5/dids.DidMethodResolver"
custom_edit_url: null
---

[@web5/dids](../modules/web5_dids.md).DidMethodResolver

## Hierarchy

- **`DidMethodResolver`**

  ↳ [`DidMethodApi`](web5_dids.DidMethodApi.md)

## Constructors

### constructor

• **new DidMethodResolver**()

#### Defined in

[types.ts:72](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L72)

## Properties

### methodName

• **methodName**: `string`

#### Defined in

[types.ts:73](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L73)

## Methods

### resolve

▸ **resolve**(`options`): `Promise`<[`DidResolutionResult`](../modules/web5_dids.md#didresolutionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didUrl` | `string` |
| `options.resolutionOptions?` | [`DidResolutionOptions`](web5_dids.DidResolutionOptions.md) |

#### Returns

`Promise`<[`DidResolutionResult`](../modules/web5_dids.md#didresolutionresult)\>

#### Defined in

[types.ts:75](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L75)
