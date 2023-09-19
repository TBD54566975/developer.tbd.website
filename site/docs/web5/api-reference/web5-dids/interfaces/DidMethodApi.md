# Interface: DidMethodApi

## Hierarchy

- [`DidMethodOperator`](DidMethodOperator.md)

- [`DidMethodResolver`](DidMethodResolver.md)

  ↳ **`DidMethodApi`**

## Table of contents

### Constructors

- [constructor](DidMethodApi.md#constructor)

### Properties

- [methodName](DidMethodApi.md#methodname)

### Methods

- [create](DidMethodApi.md#create)
- [generateKeySet](DidMethodApi.md#generatekeyset)
- [getDefaultSigningKey](DidMethodApi.md#getdefaultsigningkey)
- [resolve](DidMethodApi.md#resolve)

## Constructors

### constructor

• **new DidMethodApi**()

#### Inherited from

[DidMethodResolver](DidMethodResolver.md).[constructor](DidMethodResolver.md#constructor)

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

[DidMethodResolver](DidMethodResolver.md).[methodName](DidMethodResolver.md#methodname)

#### Defined in

[types.ts:68](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L68)

## Methods

### create

▸ **create**(`options`): `Promise`<[`PortableDid`](PortableDid.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`Promise`<[`PortableDid`](PortableDid.md)\>

#### Inherited from

[DidMethodOperator](DidMethodOperator.md).[create](DidMethodOperator.md#create)

#### Defined in

[types.ts:85](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L85)

___

### generateKeySet

▸ **generateKeySet**(): `Promise`<[`DidKeySet`](../index.md#didkeyset)\>

#### Returns

`Promise`<[`DidKeySet`](../index.md#didkeyset)\>

#### Inherited from

[DidMethodOperator](DidMethodOperator.md).[generateKeySet](DidMethodOperator.md#generatekeyset)

#### Defined in

[types.ts:87](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L87)

___

### getDefaultSigningKey

▸ **getDefaultSigningKey**(`options`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didDocument` | [`DidDocument`](../index.md#diddocument) |

#### Returns

`Promise`<`string`\>

#### Inherited from

[DidMethodOperator](DidMethodOperator.md).[getDefaultSigningKey](DidMethodOperator.md#getdefaultsigningkey)

#### Defined in

[types.ts:89](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L89)

___

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

#### Inherited from

[DidMethodResolver](DidMethodResolver.md).[resolve](DidMethodResolver.md#resolve)

#### Defined in

[types.ts:75](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L75)
