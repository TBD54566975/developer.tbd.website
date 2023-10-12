## Constructors

### constructor

• **new TbdexHttpServer**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `NewHttpServerOptions` |

## Properties

### api

• **api**: `Express`

___

### callbacks

• **callbacks**: `CallbackMap`

___

### exchangesApi

• **exchangesApi**: [`ExchangesApi`](../interfaces/ExchangesApi.md)

___

### offeringsApi

• **offeringsApi**: [`OfferingsApi`](../interfaces/OfferingsApi.md)

## Methods

### get

▸ **get**<`T`\>(`resourceKind`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GetKind`](../index.md#getkind) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `resourceKind` | `T` |
| `callback` | [`GetCallbacks`](../index.md#getcallbacks)[`T`] |

#### Returns

`void`

___

### listen

▸ **listen**(`port`, `callback?`): `Server`<typeof `IncomingMessage`, typeof `ServerResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `port` | `string` \| `number` |
| `callback?` | () => `void` |

#### Returns

`Server`<typeof `IncomingMessage`, typeof `ServerResponse`\>

___

### submit

▸ **submit**<`T`\>(`messageKind`, `callback`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SubmitKind`](../index.md#submitkind) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageKind` | `T` |
| `callback` | [`SubmitCallbacks`](../index.md#submitcallbacks)[`T`] |

#### Returns

`void`
