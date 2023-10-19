TBDex HTTP Server powered by Express

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

Express server instance

___

### callbacks

• **callbacks**: `CallbackMap`

Map of callbacks handlers for the available requests

___

### exchangesApi

• **exchangesApi**: [`ExchangesApi`](../interfaces/ExchangesApi.md)

PFI Exchanges API

___

### offeringsApi

• **offeringsApi**: [`OfferingsApi`](../interfaces/OfferingsApi.md)

PFI Offerings API

## Methods

### get

▸ **get**<`T`\>(`resourceKind`, `callback`): `void`

Setup the callback for the available Get Requests (eg. offerings, exchanges)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`GetKind`](../index.md#getkind) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resourceKind` | `T` | the kind of resource to be handled |
| `callback` | [`GetCallbacks`](../index.md#getcallbacks)[`T`] | the handler for the resource |

#### Returns

`void`

___

### listen

▸ **listen**(`port`, `callback?`): `Server`<typeof `IncomingMessage`, typeof `ServerResponse`\>

Setup the PFI routes and start a express server to listen for incoming requests

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `port` | `string` \| `number` | server port number |
| `callback?` | () => `void` | to be called when the server is ready |

#### Returns

`Server`<typeof `IncomingMessage`, typeof `ServerResponse`\>

___

### submit

▸ **submit**<`T`\>(`messageKind`, `callback`): `void`

Setup the callback for the available Submit Requests (eg. RFQ, Order, Close)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SubmitKind`](../index.md#submitkind) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageKind` | `T` | the kind of message to be handled |
| `callback` | [`SubmitCallbacks`](../index.md#submitcallbacks)[`T`] | the handler for the message |

#### Returns

`void`
