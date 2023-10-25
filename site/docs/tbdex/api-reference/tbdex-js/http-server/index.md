---
title: '@tbdex/http-server'
---

A configurable implementation of the [tbdex http api draft specification](https://github.com/TBD54566975/tbdex-protocol/blob/main/rest-api/README.md)

[Link to GitHub Repo](https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-server)

## Classes

- [Close](classes/Close.md)
- [Crypto](classes/Crypto.md)
- [DevTools](classes/DevTools.md)
- [Message](classes/Message.md)
- [Offering](classes/Offering.md)
- [Order](classes/Order.md)
- [OrderStatus](classes/OrderStatus.md)
- [Quote](classes/Quote.md)
- [Resource](classes/Resource.md)
- [Rfq](classes/Rfq.md)
- [TbdexHttpClient](classes/TbdexHttpClient.md)
- [TbdexHttpServer](classes/TbdexHttpServer.md)

## Interfaces

- [ExchangesApi](interfaces/ExchangesApi.md)
- [OfferingsApi](interfaces/OfferingsApi.md)

## Type Aliases

### CloseData

Ƭ **CloseData**: `Object`

A Close can be sent by Alice or the PFI as a reply to an RFQ or a Quote

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `reason?` | `string` | an explanation of why the exchange is being closed |

___

### CreateCloseOptions

Ƭ **CreateCloseOptions**: `Object`

Options passed to [OrderStatus.create](classes/OrderStatus.md#create)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`MessageKindModel`](index.md#messagekindmodel)<``"close"``\> |
| `metadata` | `Omit`<[`MessageMetadata`](index.md#messagemetadata)<``"close"``\>, ``"id"`` \| ``"kind"`` \| ``"createdAt"``\> |

___

### CreateCredentialOptions

Ƭ **CreateCredentialOptions**: `Omit`<[`CreateJwtOptions`](index.md#createjwtoptions), ``"payload"``\> & { `data`: `Record`<`string`, `any`\> ; `type`: `string`  }

Options passed to [DevTools.createCredential](classes/DevTools.md#createcredential)

___

### CreateJwtOptions

Ƭ **CreateJwtOptions**: `Object`

Options passed to [DevTools.createJwt](classes/DevTools.md#createjwt)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `issuer` | `PortableDid` | the JWT's issuer |
| `payload` | `any` | the thing to sign |
| `subject` | `string` | the JWT's subject (e.g. Alice's DID) |

___

### CreateOfferingOptions

Ƭ **CreateOfferingOptions**: `Object`

Options passed to [Offering.create](classes/Offering.md#create)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`ResourceKindModel`](index.md#resourcekindmodel)<``"offering"``\> |
| `metadata` | `Omit`<[`ResourceMetadata`](index.md#resourcemetadata)<``"offering"``\>, ``"id"`` \| ``"kind"`` \| ``"createdAt"`` \| ``"updatedAt"``\> |

___

### CreateOrderOptions

Ƭ **CreateOrderOptions**: `Object`

Options passed to [Order.create](classes/Order.md#create)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `metadata` | `Omit`<[`MessageMetadata`](index.md#messagemetadata)<``"order"``\>, ``"id"`` \| ``"kind"`` \| ``"createdAt"``\> |
| `private?` | `Record`<`string`, `any`\> |

___

### CreateOrderStatusOptions

Ƭ **CreateOrderStatusOptions**: `Object`

Options passed to [OrderStatus.create](classes/OrderStatus.md#create)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`MessageKindModel`](index.md#messagekindmodel)<``"orderstatus"``\> |
| `metadata` | `Omit`<[`MessageMetadata`](index.md#messagemetadata)<``"orderstatus"``\>, ``"id"`` \| ``"kind"`` \| ``"createdAt"``\> |

___

### CreateQuoteOptions

Ƭ **CreateQuoteOptions**: `Object`

Options passed to [Quote.create](classes/Quote.md#create)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`MessageKindModel`](index.md#messagekindmodel)<``"quote"``\> |
| `metadata` | `Omit`<[`MessageMetadata`](index.md#messagemetadata)<``"quote"``\>, ``"id"`` \| ``"kind"`` \| ``"createdAt"``\> |

___

### CreateRfqOptions

Ƭ **CreateRfqOptions**: `Object`

Options passed to [Rfq.create](classes/Rfq.md#create)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`MessageKindModel`](index.md#messagekindmodel)<``"rfq"``\> |
| `metadata` | `Omit`<[`MessageMetadata`](index.md#messagemetadata)<``"rfq"``\>, ``"id"`` \| ``"kind"`` \| ``"createdAt"`` \| ``"exchangeId"``\> |
| `private?` | `Record`<`string`, `any`\> |

___

### CurrencyDetails

Ƭ **CurrencyDetails**: `Object`

Currency details object

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyCode` | `string` | ISO 3166 currency code string |
| `maxSubunits?` | `string` | Maximum amount of currency that can be requested |
| `minSubunits?` | `string` | Minimum amount of currency that can be requested |

___

### DataResponse

Ƭ **DataResponse**<`T`\>: [`HttpResponse`](index.md#httpresponse) & { `data`: `T` ; `errors?`: `never`  }

HTTP Response with data

#### Type parameters

| Name |
| :------ |
| `T` |

___

### DidMethodOptions

Ƭ **DidMethodOptions**: ``"key"`` \| ``"ion"``

Supported DID Methods

___

### DidResource

Ƭ **DidResource**: `DidDocument` \| `VerificationMethod` \| `DidService`

A DID Resource is either a DID Document, a DID Verification method or a DID Service

___

### ErrorDetail

Ƭ **ErrorDetail**: `Object`

Error received from the PFI server response

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `code?` | `string` | An application-specific error code, expressed as a string value. |
| `detail` | `string` | A human-readable explanation specific to this occurrence of the problem. |
| `id?` | `string` | A unique identifier for this particular occurrence of the problem. |
| `meta?` | `Record`<`string`, `any`\> | A meta object containing non-standard meta-information about the error. |
| `source?` | { `header?`: `string` ; `parameter?`: `string` ; `pointer?`: `string`  } | An object containing references to the source of the error. |
| `source.header?` | `string` | A string indicating the name of a single request header which caused the error. |
| `source.parameter?` | `string` | A string indicating which URI query parameter caused the error. |
| `source.pointer?` | `string` | A JSON Pointer to the value in the request document that caused the error. |
| `status?` | `string` | The HTTP status code applicable to this problem, expressed as a string value. |
| `title?` | `string` | A short, human-readable summary of the problem. |

___

### ErrorResponse

Ƭ **ErrorResponse**: [`HttpResponse`](index.md#httpresponse) & { `data?`: `never` ; `errors`: [`ErrorDetail`](index.md#errordetail)[]  }

HTTP Response with errors

___

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

### GetExchangeOptions

Ƭ **GetExchangeOptions**: `Object`

options passed to [TbdexHttpClient.getExchange](classes/TbdexHttpClient.md#getexchange) method

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `exchangeId` | `string` | the exchange you want to fetch |
| `kid` | `string` | - |
| `pfiDid` | `string` | the DID of the PFI from whom you want to get offerings |
| `privateKeyJwk` | `Web5PrivateKeyJwk` | the private key used to sign the bearer token |

___

### GetExchangesFilter

Ƭ **GetExchangesFilter**: `Object`

Filter options for retrieving a list of exchanges

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id?` | `string`[] | List of exchanges ids |

___

### GetExchangesOptions

Ƭ **GetExchangesOptions**: `Object`

options passed to [TbdexHttpClient.getExchanges](classes/TbdexHttpClient.md#getexchanges) method

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | { `id`: `string` \| `string`[]  } | - |
| `filter.id` | `string` \| `string`[] | - |
| `kid` | `string` | - |
| `pfiDid` | `string` | the DID of the PFI from whom you want to get offerings |
| `privateKeyJwk` | `Web5PrivateKeyJwk` | - |

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

### GetOfferingsOptions

Ƭ **GetOfferingsOptions**: `Object`

options passed to [TbdexHttpClient.getOfferings](classes/TbdexHttpClient.md#getofferings) method

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | { `id?`: [`ResourceMetadata`](index.md#resourcemetadata)<`any`\>[``"id"``] ; `payinCurrency?`: [`OfferingData`](index.md#offeringdata)[``"payinCurrency"``][``"currencyCode"``] ; `payoutCurrency?`: [`OfferingData`](index.md#offeringdata)[``"payoutCurrency"``][``"currencyCode"``]  } | - |
| `filter.id?` | [`ResourceMetadata`](index.md#resourcemetadata)<`any`\>[``"id"``] | - |
| `filter.payinCurrency?` | [`OfferingData`](index.md#offeringdata)[``"payinCurrency"``][``"currencyCode"``] | ISO 3166 currency code string |
| `filter.payoutCurrency?` | [`OfferingData`](index.md#offeringdata)[``"payoutCurrency"``][``"currencyCode"``] | ISO 3166 currency code string |
| `pfiDid` | `string` | the DID of the PFI from whom you want to get offerings |

___

### HttpResponse

Ƭ **HttpResponse**: `Object`

HTTP Response

#### Type declaration

| Name | Type |
| :------ | :------ |
| `headers` | `Headers` |
| `status` | `number` |

___

### JsonSchema

Ƭ **JsonSchema**: `SchemaObject` \| `boolean`

___

### MessageKind

Ƭ **MessageKind**: ``"rfq"`` \| ``"quote"`` \| ``"order"`` \| ``"orderstatus"`` \| ``"close"``

Type alias to represent a set of message kind string keys

___

### MessageKindClass

Ƭ **MessageKindClass**: [`Rfq`](classes/Rfq.md) \| [`Quote`](classes/Quote.md) \| [`Order`](classes/Order.md) \| [`OrderStatus`](classes/OrderStatus.md) \| [`Close`](classes/Close.md)

Type alias for all message kinds classes

___

### MessageKindClasses

Ƭ **MessageKindClasses**: `Object`

Type alias for all message kinds classes mapped by string keys

#### Type declaration

| Name | Type |
| :------ | :------ |
| `close` | [`Close`](classes/Close.md) |
| `order` | [`Order`](classes/Order.md) |
| `orderstatus` | [`OrderStatus`](classes/OrderStatus.md) |
| `quote` | [`Quote`](classes/Quote.md) |
| `rfq` | [`Rfq`](classes/Rfq.md) |

___

### MessageKindModel

Ƭ **MessageKindModel**<`T`\>: [`MessageKinds`](index.md#messagekinds)[`T`]

Type alias to represent the data content of a message kind

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`MessageKinds`](index.md#messagekinds) |

___

### MessageKinds

Ƭ **MessageKinds**: `Object`

Type alias to map a message kind to its key string value

#### Type declaration

| Name | Type |
| :------ | :------ |
| `close` | [`CloseData`](index.md#closedata) |
| `order` | [`OrderData`](index.md#orderdata) |
| `orderstatus` | [`OrderStatusData`](index.md#orderstatusdata) |
| `quote` | [`QuoteData`](index.md#quotedata) |
| `rfq` | [`RfqData`](index.md#rfqdata) |

___

### MessageMetadata

Ƭ **MessageMetadata**<`T`\>: `Object`

Message's metadata

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](index.md#messagekind) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `createdAt` | `string` | Message creation time. Expressed as ISO8601 |
| `exchangeId` | `string` | ID for an "exchange" of messages between Alice - PFI. Uses the id of the RFQ that initiated the exchange |
| `from` | `string` | The sender's DID |
| `id` | `string` | the message id |
| `kind` | `T` | the message kind (e.g. rfq, quote) |
| `to` | `string` | the recipient's DID |

___

### MessageModel

Ƭ **MessageModel**<`T`\>: `Object`

Represents the full message object: metadata + message kind data + signature

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](index.md#messagekind) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`MessageKindModel`](index.md#messagekindmodel)<`T`\> | The actual message content |
| `metadata` | [`MessageMetadata`](index.md#messagemetadata)<`T`\> | The metadata object contains fields about the message and is present in every tbdex message. |
| `signature` | `string` | signature that verifies that authenticity and integrity of a message |

___

### NewMessage

Ƭ **NewMessage**<`T`\>: `Omit`<[`MessageModel`](index.md#messagemodel)<`T`\>, ``"signature"``\> & { `signature?`: `string`  }

Type alias to represent a brand new message (signature is optional)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](index.md#messagekind) |

___

### NewResource

Ƭ **NewResource**<`T`\>: `Omit`<[`ResourceModel`](index.md#resourcemodel)<`T`\>, ``"signature"``\> & { `signature?`: `string`  }

Type alias to represent a brand new resource (signature is optional)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ResourceKind`](index.md#resourcekind) |

___

### OfferingData

Ƭ **OfferingData**: `Object`

An Offering is used by the PFI to describe a currency pair they have to offer
including the requirements, conditions, and constraints in
order to fulfill that offer.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | Brief description of what is being offered. |
| `payinCurrency` | [`CurrencyDetails`](index.md#currencydetails) | Details about the currency that the PFI is buying in exchange for payout currency. |
| `payinMethods` | [`PaymentMethod`](index.md#paymentmethod)[] | A list of accepted payment methods that Alice can use to a _pay_ a PFI |
| `payoutCurrency` | [`CurrencyDetails`](index.md#currencydetails) | Details about the currency that the PFI is selling. |
| `payoutMethods` | [`PaymentMethod`](index.md#paymentmethod)[] | A list of accepted payment methods that Alice can use to receive the _payout_ currency from a PFI |
| `payoutUnitsPerPayinUnit` | `string` | Number of _payout_ currency units for one _payin_ currency unit (i.e 290000 USD for 1 BTC) |
| `requiredClaims` | `PresentationDefinitionV2` | Articulates the claim(s) required when submitting an RFQ for this offering. |

___

### OrderData

Ƭ **OrderData**: `Object`

Message sent by Alice to the PFI to accept a Quote. Order is currently an empty object

#### Index signature

▪ [key: `string`]: `never`

___

### OrderStatusData

Ƭ **OrderStatusData**: `Object`

Message sent by the PFI to Alice to convey the current status of an order. There can be many OrderStatus
messages in a given Exchange

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `orderStatus` | `string` | Current status of Order that's being executed (e.g. PROCESSING, COMPLETED, FAILED etc.) |

___

### PaymentInstruction

Ƭ **PaymentInstruction**: `Object`

Describes the payment instructions with plain text and/or a link

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `instruction?` | `string` | Instruction on how Alice can pay PFI, or how Alice can be paid by the PFI |
| `link?` | `string` | Link to allow Alice to pay PFI, or be paid by the PFI |

___

### PaymentInstructions

Ƭ **PaymentInstructions**: `Object`

Payment Instructions payin and payout pairs

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `payin?` | [`PaymentInstruction`](index.md#paymentinstruction) | link or instruction describing how to send payin currency to the PFI. |
| `payout?` | [`PaymentInstruction`](index.md#paymentinstruction) | link or Instruction describing how to get recieve payout currency from the PFI |

___

### PaymentMethod

Ƭ **PaymentMethod**: `Object`

The payment method specified by the resource pay in and pay out

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | The type of payment method. e.g. BITCOIN_ADDRESS, DEBIT_CARD etc |
| `requiredPaymentDetails` | [`JsonSchema`](index.md#jsonschema) | A JSON Schema containing the fields that need to be collected in order to use this payment method |

___

### Private

Ƭ **Private**: `Record`<`string`, `any`\>

Holds private data: PII, PCI, etc.

___

### QuoteData

Ƭ **QuoteData**: `Object`

Message sent by the PFI in response to an RFQ. Includes a locked-in price that the PFI is willing to honor until
the quote expires

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `expiresAt` | `string` | When this quote expires. Expressed as ISO8601 |
| `payin` | [`QuoteDetails`](index.md#quotedetails) | the amount of payin currency that the PFI will receive |
| `paymentInstructions?` | [`PaymentInstructions`](index.md#paymentinstructions) | Object that describes how to pay the PFI, and how to get paid by the PFI (e.g. BTC address, payment link) |
| `payout` | [`QuoteDetails`](index.md#quotedetails) | the amount of payout currency that Alice will receive |

___

### QuoteDetails

Ƭ **QuoteDetails**: `Object`

A QuoteDetails object describes the amount of a currency that is being sent or received

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amountSubunits` | `string` | The amount of currency expressed in the smallest respective unit |
| `currencyCode` | `string` | ISO 3166 currency code string |
| `feeSubunits?` | `string` | the amount paid in fees |

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

### ResourceKind

Ƭ **ResourceKind**: keyof [`ResourceKinds`](index.md#resourcekinds)

Type alias to represent a set of resource kind string keys

___

### ResourceKindClass

Ƭ **ResourceKindClass**: [`Offering`](classes/Offering.md)

Type alias for all resource kinds classes

___

### ResourceKindClasses

Ƭ **ResourceKindClasses**: `Object`

Type alias for all resource kinds classes mapped by string keys

#### Type declaration

| Name | Type |
| :------ | :------ |
| `offering` | [`Offering`](classes/Offering.md) |

___

### ResourceKindModel

Ƭ **ResourceKindModel**<`T`\>: [`ResourceKinds`](index.md#resourcekinds)[`T`]

Type alias to represent the data content of a resource kind

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ResourceKind`](index.md#resourcekind) |

___

### ResourceKinds

Ƭ **ResourceKinds**: `Object`

Type alias to map a resource kind to its key string value

#### Type declaration

| Name | Type |
| :------ | :------ |
| `offering` | [`OfferingData`](index.md#offeringdata) |

___

### ResourceMetadata

Ƭ **ResourceMetadata**<`T`\>: `Object`

Resource's metadata

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ResourceKind`](index.md#resourcekind) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `createdAt` | `string` | When the resource was created at. Expressed as ISO8601 |
| `from` | `string` | The author's DID |
| `id` | `string` | the resource id |
| `kind` | `T` | the resource kind (e.g. Offering) |
| `updatedAt?` | `string` | When the resource was last updated. Expressed as ISO8601 |

___

### ResourceModel

Ƭ **ResourceModel**<`T`\>: `Object`

Represents the full resource object: metadata + resource kind data + signature

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ResourceKind`](index.md#resourcekind) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ResourceKindModel`](index.md#resourcekindmodel)<`T`\> | The actual resource content |
| `metadata` | [`ResourceMetadata`](index.md#resourcemetadata)<`T`\> | The metadata object contains fields about the resource and is present in every tbdex resources of all types. |
| `signature` | `string` | signature that verifies that authenticity and integrity of a message |

___

### RfqData

Ƭ **RfqData**: `Object`

Data contained in a RFQ message

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `claims` | `string`[] | claims that fulfill the requirements declared in an Offering |
| `offeringId` | `string` | Offering which Alice would like to get a quote for |
| `payinMethod` | [`SelectedPaymentMethod`](index.md#selectedpaymentmethod) | Selected payment method that Alice will use to send the listed payin currency to the PFI. |
| `payinSubunits` | `string` | Amount of _payin_ currency alice wants to spend in order to receive payout currency |
| `payoutMethod` | [`SelectedPaymentMethod`](index.md#selectedpaymentmethod) | Selected payment method that the PFI will use to send the listed base currency to Alice |

___

### RfqOptions

Ƭ **RfqOptions**: `Object`

Options passed to [DevTools.createRfq](classes/DevTools.md#createrfq)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `sender` | `PortableDid` | @web5/dids#PortableDid of the rfq sender. used to generate a random credential that fulfills the vcRequirements of the offering returned by [DevTools.createOffering](classes/DevTools.md#createoffering) |

___

### SelectedPaymentMethod

Ƭ **SelectedPaymentMethod**: `Object`

The payment methods selected by Alice in the RFQ

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | `string` | Type of payment method e.g. BTC_ADDRESS, DEBIT_CARD, MOMO_MPESA |
| `paymentDetails` | `Record`<`string`, `any`\> \| `string` | An object containing the properties defined in the respective Offering's requiredPaymentDetails json schema |

___

### SendMessageOptions

Ƭ **SendMessageOptions**<`T`\>: `Object`

options passed to [TbdexHttpClient.sendMessage](classes/TbdexHttpClient.md#sendmessage) method

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](index.md#messagekind) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`Message`](classes/Message.md)<`T`\> \| [`MessageModel`](index.md#messagemodel)<`T`\> | the message you want to send |

___

### SignOptions

Ƭ **SignOptions**: `Object`

Options passed to [Crypto.sign](classes/Crypto.md#sign)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `detached` | `boolean` | Indicates whether the payload is detached from the JWS. If `true`, the payload is not included in the resulting JWS. |
| `kid` | `string` | A unique identifier for the key used to sign in the form of a DID URL. |
| `payload` | `Uint8Array` | The payload to be signed. |
| `privateKeyJwk` | `Web5PrivateKeyJwk` | The private key in JWK (JSON Web Key) format used for signing. |

___

### SubmitCallback

Ƭ **SubmitCallback**<`T`\>: (`ctx`: [`RequestContext`](index.md#requestcontext), `message`: [`MessageKindClasses`](index.md#messagekindclasses)[`T`]) => `any`

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
| `message` | [`MessageKindClasses`](index.md#messagekindclasses)[`T`] |

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

___

### VerifyOptions

Ƭ **VerifyOptions**: `Object`

Options passed to [Crypto.verify](classes/Crypto.md#verify)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `detachedPayload?` | `Uint8Array` | The payload that was signed. required only if the signature is a detached JWS |
| `signature` | `string` | - |

## Variables

### DidResolver

• `Const` **DidResolver**: `Web5DidResolver`

Can be used to resolve did:ion and did:key DIDs

## Functions

### deferenceDidUrl

▸ **deferenceDidUrl**(`didUrl`): `Promise`<[`DidResource`](index.md#didresource)\>

Dereferences a DID URL according to [specification](https://www.w3.org/TR/did-core/#did-url-dereferencing).
See also: [DID URL Syntax](https://www.w3.org/TR/did-core/#did-url-syntax)

**Note**: Support is limited to did#fragment within [Verification Method](https://www.w3.org/TR/did-core/#verification-methods)
and [Service](https://www.w3.org/TR/did-core/#services) only

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `didUrl` | `string` | the did url to dereference |

#### Returns

`Promise`<[`DidResource`](index.md#didresource)\>

the dereferenced resource

**`Throws`**

if DID URL cannot be parsed

**`Throws`**

if DID cannot be resolved

___

### isVerificationMethod

▸ **isVerificationMethod**(`didResource`): didResource is VerificationMethod

type guard for @web5/dids#VerificationMethod

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `didResource` | [`DidResource`](index.md#didresource) | the resource to check |

#### Returns

didResource is VerificationMethod

true if the didResource is a `VerificationMethod`

___

### resolveDid

▸ **resolveDid**(`did`): `Promise`<`DidDocument`\>

Resolves the DID provided

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | the DID to resolve |

#### Returns

`Promise`<`DidDocument`\>

@web5/dids#DidDocument
