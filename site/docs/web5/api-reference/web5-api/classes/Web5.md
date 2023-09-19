# Class: Web5

Web5 Main Class

## Table of contents

### Constructors

- [constructor](Web5.md#constructor)

### Properties

- [agent](Web5.md#agent)
- [did](Web5.md#did)
- [dwn](Web5.md#dwn)
- [vc](Web5.md#vc)

### Methods

- [connect](Web5.md#connect)

## Constructors

### constructor

• **new Web5**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Web5Options` |

#### Defined in

[web5.ts:65](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L65)

## Properties

### agent

• **agent**: `Web5Agent`

#### Defined in

[web5.ts:59](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L59)

___

### did

• **did**: [`DidApi`](DidApi.md)

#### Defined in

[web5.ts:60](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L60)

___

### dwn

• **dwn**: [`DwnApi`](DwnApi.md)

#### Defined in

[web5.ts:61](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L61)

___

### vc

• **vc**: [`VcApi`](VcApi.md)

#### Defined in

[web5.ts:62](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L62)

## Methods

### connect

▸ `Static` **connect**(`options?`): `Promise`<{ `did`: `string` = connectedDid; `web5`: [`Web5`](Web5.md)  }\>

Connects to a Web5Agent. Defaults to creating a local Web5UserAgent
if one isn't provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`Web5ConnectOptions`](../index.md#web5connectoptions) | optional overrides |

#### Returns

`Promise`<{ `did`: `string` = connectedDid; `web5`: [`Web5`](Web5.md)  }\>

#### Defined in

[web5.ts:81](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L81)
