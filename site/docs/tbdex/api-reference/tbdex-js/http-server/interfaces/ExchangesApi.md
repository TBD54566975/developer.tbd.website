PFI Exchanges API

## Methods

### getClose

▸ **getClose**(`opts`): `Promise`<`Close`\>

Retrieve the close reason if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<`Close`\>

___

### getExchange

▸ **getExchange**(`opts`): `Promise`<`MessageKindClass`[]\>

Retrieve a single exchange if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `string` |

#### Returns

`Promise`<`MessageKindClass`[]\>

___

### getExchanges

▸ **getExchanges**(`opts?`): `Promise`<`MessageKindClass`[][]\>

Retrieve a list of exchanges based on the given filter

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Object` |
| `opts.filter` | [`GetExchangesFilter`](../index.md#getexchangesfilter) |

#### Returns

`Promise`<`MessageKindClass`[][]\>

___

### getOrder

▸ **getOrder**(`opts`): `Promise`<`Order`\>

Retrieve an Order if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<`Order`\>

___

### getOrderStatuses

▸ **getOrderStatuses**(`opts`): `Promise`<`OrderStatus`[]\>

Retrieve the order statuses if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<`OrderStatus`[]\>

___

### getQuote

▸ **getQuote**(`opts`): `Promise`<`Quote`\>

Retrieve a Quote if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<`Quote`\>

___

### getRfq

▸ **getRfq**(`opts`): `Promise`<`Rfq`\>

Retrieve a RFQ if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.exchangeId` | `string` |

#### Returns

`Promise`<`Rfq`\>
