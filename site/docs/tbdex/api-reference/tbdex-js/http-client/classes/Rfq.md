Message sent by Alice to PFI to requesting for a quote (RFQ)

## Hierarchy

- [`Message`](Message.md)<``"rfq"``\>

  ↳ **`Rfq`**

## Constructors

### constructor

• **new Rfq**(`jsonMessage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonMessage` | [`NewMessage`](../index.md#newmessage)<``"rfq"``\> |

#### Inherited from

[Message](Message.md).[constructor](Message.md#constructor)

## Properties

### \_private

• **\_private**: `Record`<`string`, `any`\>

private data (PII or PCI)

___

### validNext

• `Readonly` **validNext**: `Set`<[`MessageKind`](../index.md#messagekind)\>

a set of valid Message kinds that can come after an rfq

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

### claims

• `get` **claims**(): `string`[]

Array of claims that satisfy the respective offering's requiredClaims

#### Returns

`string`[]

___

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

ID for an "exchange" of messages between Alice - PFI. Uses the id of the RFQ that initiated the exchange

#### Returns

`string`

#### Inherited from

Message.exchangeId

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

### offeringId

• `get` **offeringId**(): `string`

Offering which Alice would like to get a quote for

#### Returns

`string`

___

### payinMethod

• `get` **payinMethod**(): [`SelectedPaymentMethod`](../index.md#selectedpaymentmethod)

Selected payment method that Alice will use to send the listed payin currency to the PFI.

#### Returns

[`SelectedPaymentMethod`](../index.md#selectedpaymentmethod)

___

### payinSubunits

• `get` **payinSubunits**(): `string`

Amount of payin currency you want to spend in order to receive payout currency

#### Returns

`string`

___

### payoutMethod

• `get` **payoutMethod**(): [`SelectedPaymentMethod`](../index.md#selectedpaymentmethod)

Selected payment method that the PFI will use to send the listed payout currency to Alice

#### Returns

[`SelectedPaymentMethod`](../index.md#selectedpaymentmethod)

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

▸ **toJSON**(): [`MessageModel`](../index.md#messagemodel)<``"rfq"``\>

Converts this rfq message to a json object

#### Returns

[`MessageModel`](../index.md#messagemodel)<``"rfq"``\>

#### Overrides

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

### verifyClaims

▸ **verifyClaims**(`offering`): `Promise`<`void`\>

checks the claims provided in this rfq against an offering's requirements

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offering` | [`Offering`](Offering.md) \| [`ResourceModel`](../index.md#resourcemodel)<``"offering"``\> | the offering to check against |

#### Returns

`Promise`<`void`\>

**`Throws`**

if rfq's claims do not fulfill the offering's requirements

___

### verifyOfferingRequirements

▸ **verifyOfferingRequirements**(`offering`): `Promise`<`void`\>

evaluates this rfq against the provided offering

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offering` | [`Offering`](Offering.md) \| [`ResourceModel`](../index.md#resourcemodel)<``"offering"``\> | the offering to evaluate this rfq against |

#### Returns

`Promise`<`void`\>

**`Throws`**

if [Rfq.offeringId](Rfq.md#offeringid) doesn't match the provided offering's id

___

### create

▸ `Static` **create**(`opts`): [`Rfq`](Rfq.md)

Creates an rfq with the given options

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`CreateRfqOptions`](../index.md#createrfqoptions) | options to create an rfq |

#### Returns

[`Rfq`](Rfq.md)

[Rfq](Rfq.md)

___

### fromJson

▸ `Static` **fromJson**<`T`\>(`jsonMessage`): [`MessageKindClass`](../index.md#messagekindclass)

returns an instance of the appropriate MessageKind class based on the value of `jsonMessage.metadata.kind`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MessageKind`](../index.md#messagekind) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonMessage` | [`MessageModel`](../index.md#messagemodel)<`T`\> | the message to parse |

#### Returns

[`MessageKindClass`](../index.md#messagekindclass)

#### Inherited from

[Message](Message.md).[fromJson](Message.md#fromjson)

___

### generateId

▸ `Static` **generateId**(`messageKind`): `string`

Generates a unique id with the message kind's prefix

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

[Message](Message.md)

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

`Error` if validation fails

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
