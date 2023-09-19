# Interface: DidMethodResolver

## Hierarchy

- **`DidMethodResolver`**

  ↳ [`DidMethodApi`](DidMethodApi.md)

## Table of contents

### Constructors

- [constructor](DidMethodResolver.md#constructor)

### Properties

- [methodName](DidMethodResolver.md#methodname)

### Methods

- [resolve](DidMethodResolver.md#resolve)

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

▸ **resolve**(`options`): `Promise`<[`DidResolutionResult`](../index.md#didresolutionresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didUrl` | `string` |
| `options.resolutionOptions?` | [`DidResolutionOptions`](DidResolutionOptions.md) |

#### Returns

`Promise`<[`DidResolutionResult`](../index.md#didresolutionresult)\>

#### Defined in

[types.ts:75](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L75)
