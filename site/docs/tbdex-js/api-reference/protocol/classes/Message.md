[@tbdex/protocol](../index.md) / Message

# Class: Message<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](../index.md#messagekind) |

## Hierarchy

- **`Message`**

  ↳ [`Rfq`](Rfq.md)

  ↳ [`Quote`](Quote.md)

  ↳ [`Order`](Order.md)

  ↳ [`OrderStatus`](OrderStatus.md)

  ↳ [`Close`](Close.md)

## Table of contents

### Constructors

- [constructor](Message.md#constructor)

### Properties

- [\_data](Message.md#_data)
- [\_metadata](Message.md#_metadata)
- [\_signature](Message.md#_signature)
- [factory](Message.md#factory)

### Accessors

- [createdAt](Message.md#createdat)
- [data](Message.md#data)
- [exchangeId](Message.md#exchangeid)
- [from](Message.md#from)
- [id](Message.md#id)
- [kind](Message.md#kind)
- [metadata](Message.md#metadata)
- [signature](Message.md#signature)
- [to](Message.md#to)

### Methods

- [isClose](Message.md#isclose)
- [isOrder](Message.md#isorder)
- [isOrderStatus](Message.md#isorderstatus)
- [isQuote](Message.md#isquote)
- [isRfq](Message.md#isrfq)
- [sign](Message.md#sign)
- [toJSON](Message.md#tojson)
- [verify](Message.md#verify)
- [fromJson](Message.md#fromjson)
- [generateId](Message.md#generateid)
- [parse](Message.md#parse)
- [validate](Message.md#validate)
- [verify](Message.md#verify-1)

## Constructors

### constructor

• **new Message**<`T`\>(`jsonMessage`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](../index.md#messagekind) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonMessage` | [`NewMessage`](../index.md#newmessage)<`T`\> |

## Properties

### \_data

• `Private` **\_data**: [`MessageKindModel`](../index.md#messagekindmodel)<`T`\>

___

### \_metadata

• `Private` **\_metadata**: [`MessageMetadata`](../index.md#messagemetadata)<`T`\>

___

### \_signature

• `Private` **\_signature**: `string`

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

## Accessors

### createdAt

• `get` **createdAt**(): `string`

Message creation time. Expressed as ISO8601

#### Returns

`string`

___

### data

• `get` **data**(): [`MessageKindModel`](../index.md#messagekindmodel)<`T`\>

the message kind's content

#### Returns

[`MessageKindModel`](../index.md#messagekindmodel)<`T`\>

___

### exchangeId

• `get` **exchangeId**(): `string`

ID for an "exchange" of messages between Alice <-> PFI. Uses the id of the RFQ that initiated the exchange

#### Returns

`string`

___

### from

• `get` **from**(): `string`

The sender's DID

#### Returns

`string`

___

### id

• `get` **id**(): `string`

the message id

#### Returns

`string`

___

### kind

• `get` **kind**(): `T`

the message kind (e.g. rfq, quote)

#### Returns

`T`

___

### metadata

• `get` **metadata**(): [`MessageMetadata`](../index.md#messagemetadata)<`T`\>

The metadata object contains fields about the message and is present in every tbdex message.

#### Returns

[`MessageMetadata`](../index.md#messagemetadata)<`T`\>

___

### signature

• `get` **signature**(): `string`

the message's cryptographic signature

#### Returns

`string`

___

### to

• `get` **to**(): `string`

the recipient's DID

#### Returns

`string`

## Methods

### isClose

▸ **isClose**(): this is Close

Close type guard

#### Returns

this is Close

___

### isOrder

▸ **isOrder**(): this is Order

Order type guard

#### Returns

this is Order

___

### isOrderStatus

▸ **isOrderStatus**(): this is OrderStatus

OrderStatus type guard

#### Returns

this is OrderStatus

___

### isQuote

▸ **isQuote**(): this is Quote

Quote type guard

#### Returns

this is Quote

___

### isRfq

▸ **isRfq**(): this is Rfq

Rfq type guard

#### Returns

this is Rfq

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

___

### toJSON

▸ **toJSON**(): [`MessageModel`](../index.md#messagemodel)<`T`\>

returns the message as a json object. Automatically used by JSON.stringify method.

#### Returns

[`MessageModel`](../index.md#messagemodel)<`T`\>

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

___

### generateId

▸ `Static` **generateId**(`messageKind`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageKind` | [`MessageKind`](../index.md#messagekind) |

#### Returns

`string`

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
