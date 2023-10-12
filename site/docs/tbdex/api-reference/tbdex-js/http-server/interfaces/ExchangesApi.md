## Methods

### getClose

▸ **getClose**(`opts`): `Promise`<[`Close`](../classes/Close.md)\>

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<[`Rfq`](../classes/Rfq.md)\>
