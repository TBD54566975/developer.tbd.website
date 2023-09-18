---
id: "web5_dids.DidMethodOperator"
title: "Interface: DidMethodOperator"
sidebar_label: "@web5/dids.DidMethodOperator"
custom_edit_url: null
---

[@web5/dids](../modules/web5_dids.md).DidMethodOperator

## Hierarchy

- **`DidMethodOperator`**

  ↳ [`DidMethodApi`](web5_dids.DidMethodApi.md)

## Constructors

### constructor

• **new DidMethodOperator**()

#### Defined in

[types.ts:82](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L82)

## Properties

### methodName

• **methodName**: `string`

#### Defined in

[types.ts:83](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L83)

## Methods

### create

▸ **create**(`options`): `Promise`<[`PortableDid`](web5_dids.PortableDid.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`Promise`<[`PortableDid`](web5_dids.PortableDid.md)\>

#### Defined in

[types.ts:85](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L85)

___

### generateKeySet

▸ **generateKeySet**(): `Promise`<[`DidKeySet`](../modules/web5_dids.md#didkeyset)\>

#### Returns

`Promise`<[`DidKeySet`](../modules/web5_dids.md#didkeyset)\>

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

#### Defined in

[types.ts:89](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L89)
