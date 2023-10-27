---
title: '@tbdex/http-server'
---

A configurable implementation of the [tbdex http api draft specification](https://github.com/TBD54566975/tbdex-protocol/blob/main/rest-api/README.md)

[Link to GitHub Repo](https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-server)

## Classes

- [TbdexHttpServer](classes/TbdexHttpServer.md)

## Interfaces

- [ExchangesApi](interfaces/ExchangesApi.md)
- [OfferingsApi](interfaces/OfferingsApi.md)

## Type Aliases

### Filters

Ƭ **Filters**: `Object`

Type alias for the filtering options of the get requests

#### Type declaration

| Name | Type |
| :------ | :------ |
| `exchanges` | [`GetExchangesFilter`](index.md#getexchangesfilter) |
| `offerings` | [`GetOfferingsFilter`](index.md#getofferingsfilter) |

___

### GetCallback

Ƭ **GetCallback**<`T`\>: (`ctx`: [`RequestContext`](index.md#requestcontext), `filter`: [`Filters`](index.md#filters)[`T`]) => `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GetKind`](index.md#getkind) |

#### Type declaration

▸ (`ctx`, `filter`): `any`

Callback handler for the get requests

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RequestContext`](index.md#requestcontext) |
| `filter` | [`Filters`](index.md#filters)[`T`] |

##### Returns

`any`

___

### GetCallbacks

Ƭ **GetCallbacks**: { [Kind in GetKind]: GetCallback<Kind\> }

Map of callbacks handlers for the get requests

___

### GetExchangesFilter

Ƭ **GetExchangesFilter**: `Object`

Filter options for retrieving a list of exchanges

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `exchangeId?` | `string`[] | List of exchanges ids |

___

### GetKind

Ƭ **GetKind**: ``"exchanges"`` \| ``"offerings"``

Union type for get requests

___

### GetOfferingsFilter

Ƭ **GetOfferingsFilter**: `Object`

Filter options for retrieving a list of offerings

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string` | Offering ID |
| `payinCurrency?` | `string` | Currency that the PFI is buying in exchange for payout currency - ISO 3166 currency code string |
| `payoutCurrency?` | `string` | Currency that the PFI is selling - ISO 3166 currency code string |

___

### RequestContext

Ƭ **RequestContext**: `Object`

Type alias for the request context

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | `Request` | Express request type |
| `response` | `Response` | Express response type |

___

### RequestHandler

Ƭ **RequestHandler**: (`request`: `Request`, `response`: `Response`) => `any`

#### Type declaration

▸ (`request`, `response`): `any`

Type alias for the request handler

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request` |
| `response` | `Response` |

##### Returns

`any`

___

### SubmitCallback

Ƭ **SubmitCallback**<`T`\>: (`ctx`: [`RequestContext`](index.md#requestcontext), `message`: `MessageKindClasses`[`T`]) => `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SubmitKind`](index.md#submitkind) |

#### Type declaration

▸ (`ctx`, `message`): `any`

Callback handler for the submit requests

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`RequestContext`](index.md#requestcontext) |
| `message` | `MessageKindClasses`[`T`] |

##### Returns

`any`

___

### SubmitCallbacks

Ƭ **SubmitCallbacks**: { [Kind in SubmitKind]: SubmitCallback<Kind\> }

Map of callbacks handlers for the submit requests

___

### SubmitKind

Ƭ **SubmitKind**: ``"rfq"`` \| ``"order"`` \| ``"close"``

Union type for submit requests
