---
id: "web5_api.Web5"
title: "Class: Web5"
sidebar_label: "@web5/api.Web5"
custom_edit_url: null
---

[@web5/api](../modules/web5_api.md).Web5

## Constructors

### constructor

• **new Web5**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Web5Options` |

#### Defined in

[web5.ts:62](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L62)

## Properties

### agent

• **agent**: `Web5Agent`

#### Defined in

[web5.ts:56](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L56)

___

### connectedDid

• `Private` **connectedDid**: `string`

#### Defined in

[web5.ts:60](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L60)

___

### did

• **did**: [`DidApi`](web5_api.DidApi.md)

#### Defined in

[web5.ts:57](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L57)

___

### dwn

• **dwn**: [`DwnApi`](web5_api.DwnApi.md)

#### Defined in

[web5.ts:58](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L58)

___

### vc

• **vc**: [`VcApi`](web5_api.VcApi.md)

#### Defined in

[web5.ts:59](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L59)

## Methods

### connect

▸ `Static` **connect**(`options?`): `Promise`<{ `did`: `string` = connectedDid; `web5`: [`Web5`](web5_api.Web5.md)  }\>

Connects to a Web5Agent. Defaults to creating a local Web5UserAgent
if one isn't provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Web5ConnectOptions`](../modules/web5_api.md#web5connectoptions) | optional overrides |

#### Returns

`Promise`<{ `did`: `string` = connectedDid; `web5`: [`Web5`](web5_api.Web5.md)  }\>

#### Defined in

[web5.ts:78](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L78)
