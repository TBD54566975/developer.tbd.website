PFI Offerings API

## Methods

### getOffering

▸ **getOffering**(`opts`): `Promise`<[`Offering`](../classes/Offering.md)\>

Retrieve a single offering if found

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id` | `string` |

#### Returns

`Promise`<[`Offering`](../classes/Offering.md)\>

___

### getOfferings

▸ **getOfferings**(`opts?`): `Promise`<[`Offering`](../classes/Offering.md)[]\>

Retrieve a list of offerings based on the given filter

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Object` |
| `opts.filter` | [`GetOfferingsFilter`](../index.md#getofferingsfilter) |

#### Returns

`Promise`<[`Offering`](../classes/Offering.md)[]\>
