PFI Exchanges API

## Methods

### getClose

▸ **getClose**(`opts`): `Promise`<[`Close`](../classes/Close.md)\>

Retrieve the close reason if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<[`Close`](../classes/Close.md)\>

___

### getExchange

▸ **getExchange**(`opts`): `Promise`<[`MessageKindClass`](../index.md#messagekindclass)[]\>

Retrieve a single exchange if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `string` |

#### Returns

`Promise`<[`MessageKindClass`](../index.md#messagekindclass)[]\>

___

### getExchanges

▸ **getExchanges**(`opts?`): `Promise`<[`MessageKindClass`](../index.md#messagekindclass)[][]\>

Retrieve a list of exchanges based on the given filter

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Object` |
| `opts.filter` | [`GetExchangesFilter`](../index.md#getexchangesfilter) |

#### Returns

`Promise`<[`MessageKindClass`](../index.md#messagekindclass)[][]\>

___

### getOrder

▸ **getOrder**(`opts`): `Promise`<[`Order`](../classes/Order.md)\>

Retrieve an Order if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<[`Order`](../classes/Order.md)\>

___

### getOrderStatuses

▸ **getOrderStatuses**(`opts`): `Promise`<[`OrderStatus`](../classes/OrderStatus.md)[]\>

Retrieve the order statuses if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<[`OrderStatus`](../classes/OrderStatus.md)[]\>

___

### getQuote

▸ **getQuote**(`opts`): `Promise`<[`Quote`](../classes/Quote.md)\>

Retrieve a Quote if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<[`Quote`](../classes/Quote.md)\>

___

### getRfq

▸ **getRfq**(`opts`): `Promise`<[`Rfq`](../classes/Rfq.md)\>

Retrieve a RFQ if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<[`Rfq`](../classes/Rfq.md)\>
