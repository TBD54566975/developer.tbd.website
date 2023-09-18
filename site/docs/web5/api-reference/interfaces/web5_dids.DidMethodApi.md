---
id: "web5_dids.DidMethodApi"
title: "Interface: DidMethodApi"
sidebar_label: "@web5/dids.DidMethodApi"
custom_edit_url: null
---

[@web5/dids](../modules/web5_dids.md).DidMethodApi

## Hierarchy

- [`DidMethodOperator`](web5_dids.DidMethodOperator.md)

- [`DidMethodResolver`](web5_dids.DidMethodResolver.md)

  ↳ **`DidMethodApi`**

## Constructors

### constructor

• **new DidMethodApi**()

#### Inherited from

[DidMethodResolver](web5_dids.DidMethodResolver.md).[constructor](web5_dids.DidMethodResolver.md#constructor)

#### Defined in

[types.ts:67](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L67)

• **new DidMethodApi**()

#### Inherited from

DidMethodOperator.constructor

#### Defined in

[types.ts:82](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L82)

• **new DidMethodApi**()

#### Inherited from

DidMethodOperator.constructor

#### Defined in

[types.ts:72](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L72)

## Properties

### methodName

• **methodName**: `string`

#### Overrides

[DidMethodResolver](web5_dids.DidMethodResolver.md).[methodName](web5_dids.DidMethodResolver.md#methodname)

#### Defined in

[types.ts:68](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L68)

## Methods

### create

▸ **create**(`options`): `Promise`<[`PortableDid`](web5_dids.PortableDid.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`Promise`<[`PortableDid`](web5_dids.PortableDid.md)\>

#### Inherited from

[DidMethodOperator](web5_dids.DidMethodOperator.md).[create](web5_dids.DidMethodOperator.md#create)

#### Defined in

[types.ts:85](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L85)

___

### generateKeySet

▸ **generateKeySet**(): `Promise`<[`DidKeySet`](../modules/web5_dids.md#didkeyset)\>

#### Returns

`Promise`<[`DidKeySet`](../modules/web5_dids.md#didkeyset)\>

#### Inherited from

[DidMethodOperator](web5_dids.DidMethodOperator.md).[generateKeySet](web5_dids.DidMethodOperator.md#generatekeyset)

#### Defined in

[types.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L87)

___

### getDefaultSigningKey

▸ **getDefaultSigningKey**(`options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didDocument` | [`DidDocument`](../modules/web5_dids.md#diddocument) |

#### Returns

`Promise`<`string`\>

#### Inherited from

[DidMethodOperator](web5_dids.DidMethodOperator.md).[getDefaultSigningKey](web5_dids.DidMethodOperator.md#getdefaultsigningkey)

#### Defined in

[types.ts:89](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L89)

___

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

#### Inherited from

[DidMethodResolver](web5_dids.DidMethodResolver.md).[resolve](web5_dids.DidMethodResolver.md#resolve)

#### Defined in

[types.ts:75](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L75)
