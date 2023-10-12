Sent by the PFI in response to an RFQ. Includes a locked-in price that the PFI is willing to honor until
the quote expires

## Hierarchy

- [`Message`](Message.md)<``"quote"``\>

  ↳ **`Quote`**

## Constructors

### constructor

• **new Quote**(`jsonMessage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonMessage` | [`NewMessage`](../index.md#newmessage)<``"quote"``\> |

#### Inherited from

[Message](Message.md).[constructor](Message.md#constructor)

## Properties

### validNext

• `Readonly` **validNext**: `Set`<[`MessageKind`](../index.md#messagekind)\>

___

### factory

▪ `Static` **factory**: <T\>(`jsonMessage`: [`MessageModel`](../index.md#messagemodel)<`T`\>) => [`MessageKindClass`](../index.md#messagekindclass)

#### Type declaration

▸ <`T`\>(`jsonMessage`): [`MessageKindClass`](../index.md#messagekindclass)

used by [Message.parse](Message.md#parse) to return an instance of message kind's class. This abstraction is needed
because importing the Message Kind classes (e.g. Rfq, Quote) creates a circular dependency
due to each concrete MessageKind class extending Message

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](../index.md#messagekind) |

##### Parameters

| Name | Type |
| :------ | :------ |
| `jsonMessage` | [`MessageModel`](../index.md#messagemodel)<`T`\> |

##### Returns

[`MessageKindClass`](../index.md#messagekindclass)

#### Inherited from

[Message](Message.md).[factory](Message.md#factory)

## Accessors

### createdAt

• `get` **createdAt**(): `string`

Message creation time. Expressed as ISO8601

#### Returns

`string`

#### Inherited from

Message.createdAt

___

### data

• `get` **data**(): [`MessageKindModel`](../index.md#messagekindmodel)<`T`\>

the message kind's content

#### Returns

[`MessageKindModel`](../index.md#messagekindmodel)<`T`\>

#### Inherited from

Message.data

___

### exchangeId

• `get` **exchangeId**(): `string`

ID for an "exchange" of messages between Alice <-> PFI. Uses the id of the RFQ that initiated the exchange

#### Returns

`string`

#### Inherited from

Message.exchangeId

___

### expiresAt

• `get` **expiresAt**(): `string`

When this quote expires. Expressed as ISO8601

#### Returns

`string`

___

### from

• `get` **from**(): `string`

The sender's DID

#### Returns

`string`

#### Inherited from

Message.from

___

### id

• `get` **id**(): `string`

the message id

#### Returns

`string`

#### Inherited from

Message.id

___

### kind

• `get` **kind**(): `T`

the message kind (e.g. rfq, quote)

#### Returns

`T`

#### Inherited from

Message.kind

___

### metadata

• `get` **metadata**(): [`MessageMetadata`](../index.md#messagemetadata)<`T`\>

The metadata object contains fields about the message and is present in every tbdex message.

#### Returns

[`MessageMetadata`](../index.md#messagemetadata)<`T`\>

#### Inherited from

Message.metadata

___

### payin

• `get` **payin**(): [`QuoteDetails`](../index.md#quotedetails)

the amount of payin currency that the PFI will receive

#### Returns

[`QuoteDetails`](../index.md#quotedetails)

___

### paymentInstructions

• `get` **paymentInstructions**(): [`PaymentInstructions`](../index.md#paymentinstructions)

Object that describes how to pay the PFI, and how to get paid by the PFI (e.g. BTC address, payment link)

#### Returns

[`PaymentInstructions`](../index.md#paymentinstructions)

___

### payout

• `get` **payout**(): [`QuoteDetails`](../index.md#quotedetails)

the amount of payout currency that Alice will receive

#### Returns

[`QuoteDetails`](../index.md#quotedetails)

___

### signature

• `get` **signature**(): `string`

the message's cryptographic signature

#### Returns

`string`

#### Inherited from

Message.signature

___

### to

• `get` **to**(): `string`

the recipient's DID

#### Returns

`string`

#### Inherited from

Message.to

## Methods

### isClose

▸ **isClose**(): this is Close

Close type guard

#### Returns

this is Close

#### Inherited from

[Message](Message.md).[isClose](Message.md#isclose)

___

### isOrder

▸ **isOrder**(): this is Order

Order type guard

#### Returns

this is Order

#### Inherited from

[Message](Message.md).[isOrder](Message.md#isorder)

___

### isOrderStatus

▸ **isOrderStatus**(): this is OrderStatus

OrderStatus type guard

#### Returns

this is OrderStatus

#### Inherited from

[Message](Message.md).[isOrderStatus](Message.md#isorderstatus)

___

### isQuote

▸ **isQuote**(): this is Quote

Quote type guard

#### Returns

this is Quote

#### Inherited from

[Message](Message.md).[isQuote](Message.md#isquote)

___

### isRfq

▸ **isRfq**(): this is Rfq

Rfq type guard

#### Returns

this is Rfq

#### Inherited from

[Message](Message.md).[isRfq](Message.md#isrfq)

___

### sign

▸ **sign**(`privateKeyJwk`, `kid`): `Promise`<`void`\>

signs the message as a jws with detached content and sets the signature property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKeyJwk` | `PrivateKeyJwk` | the key to sign with |
| `kid` | `string` | the verification method id to include in the jws header. used by the verifier to select the appropriate verificationMethod when dereferencing the signer's DID |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Message](Message.md).[sign](Message.md#sign)

___

### toJSON

▸ **toJSON**(): [`MessageModel`](../index.md#messagemodel)<``"quote"``\>

returns the message as a json object. Automatically used by JSON.stringify method.

#### Returns

[`MessageModel`](../index.md#messagemodel)<``"quote"``\>

#### Inherited from

[Message](Message.md).[toJSON](Message.md#tojson)

___

### verify

▸ **verify**(): `Promise`<`string`\>

validates the message and verifies the cryptographic signature

#### Returns

`Promise`<`string`\>

**`Throws`**

if the message is invalid

**`Throws`**

see [Crypto.verify](Crypto.md#verify)

#### Inherited from

[Message](Message.md).[verify](Message.md#verify)

___

### create

▸ `Static` **create**(`opts`): [`Quote`](Quote.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`CreateQuoteOptions`](../index.md#createquoteoptions) |

#### Returns

[`Quote`](Quote.md)

___

### fromJson

▸ `Static` **fromJson**<`T`\>(`jsonMessage`): [`MessageKindClass`](../index.md#messagekindclass)

returns an instance of the appropriate MessageKind class based on the value of `jsonMessage.metadata.kind`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](../index.md#messagekind) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonMessage` | [`MessageModel`](../index.md#messagemodel)<`T`\> |

#### Returns

[`MessageKindClass`](../index.md#messagekindclass)

#### Inherited from

[Message](Message.md).[fromJson](Message.md#fromjson)

___

### generateId

▸ `Static` **generateId**(`messageKind`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageKind` | [`MessageKind`](../index.md#messagekind) |

#### Returns

`string`

#### Inherited from

[Message](Message.md).[generateId](Message.md#generateid)

___

### parse

▸ `Static` **parse**<`T`\>(`message`): `Promise`<[`MessageKindClass`](../index.md#messagekindclass)\>

parses the json message into a message instance. performs format validation and an integrity check on the signature

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](../index.md#messagekind) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` \| [`MessageModel`](../index.md#messagemodel)<`T`\> | the message to parse. can either be an object or a string |

#### Returns

`Promise`<[`MessageKindClass`](../index.md#messagekindclass)\>

#### Inherited from

[Message](Message.md).[parse](Message.md#parse)

___

### validate

▸ `Static` **validate**(`jsonMessage`): `void`

validates the message provided against the appropriate json schemas.
2-phased validation: First validates the message structure and then
validates `data` based on the value of `metadata.kind`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonMessage` | `any` | the message to validate |

#### Returns

`void`

**`Throws`**

if validation fails

#### Inherited from

[Message](Message.md).[validate](Message.md#validate)

___

### verify

▸ `Static` **verify**<`T`\>(`message`): `Promise`<`string`\>

validates the message and verifies the cryptographic signature

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](../index.md#messagekind) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`MessageModel`](../index.md#messagemodel)<`T`\> \| [`Message`](Message.md)<`T`\> |

#### Returns

`Promise`<`string`\>

**`Throws`**

if the message is invalid

**`Throws`**

see [Crypto.verify](Crypto.md#verify)

#### Inherited from

[Message](Message.md).[verify](Message.md#verify-1)
