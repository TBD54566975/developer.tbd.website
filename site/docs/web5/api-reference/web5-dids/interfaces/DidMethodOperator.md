# Interface: DidMethodOperator

## Hierarchy

- **`DidMethodOperator`**

  ↳ [`DidMethodApi`](DidMethodApi.md)

## Table of contents

### Constructors

- [constructor](DidMethodOperator.md#constructor)

### Properties

- [methodName](DidMethodOperator.md#methodname)

### Methods

- [create](DidMethodOperator.md#create)
- [generateKeySet](DidMethodOperator.md#generatekeyset)
- [getDefaultSigningKey](DidMethodOperator.md#getdefaultsigningkey)

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

▸ **create**(`options`): `Promise`<[`PortableDid`](PortableDid.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `any` |

#### Returns

`Promise`<[`PortableDid`](PortableDid.md)\>

#### Defined in

[types.ts:85](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L85)

___

### generateKeySet

▸ **generateKeySet**(): `Promise`<[`DidKeySet`](../index.md#didkeyset)\>

#### Returns

`Promise`<[`DidKeySet`](../index.md#didkeyset)\>

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

#### Defined in

[types.ts:89](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L89)
