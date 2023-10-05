An Offering is used by the PFI to describe a currency pair they have to offer
including the requirements, conditions, and constraints in
order to fulfill that offer.

## Hierarchy

- [`Resource`](Resource.md)<``"offering"``\>

  ↳ **`Offering`**

## Constructors

### constructor

• **new Offering**(`jsonResource`)

Constructor is primarily for intended for internal use. For a better developer experience,
consumers should use concrete classes to programmatically create resources (e.g. Offering class) and
[Resource.parse](Resource.md#parse) to parse stringified resources.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonResource` | [`NewResource`](../index.md#newresource)<``"offering"``\> | the resource as a json object |

#### Inherited from

[Resource](Resource.md).[constructor](Resource.md#constructor)

## Properties

### factory

▪ `Static` **factory**: <T\>(`jsonResource`: [`ResourceModel`](../index.md#resourcemodel)<`T`\>) => [`Offering`](Offering.md)

#### Type declaration

▸ <`T`\>(`jsonResource`): [`Offering`](Offering.md)

used by [Resource.parse](Resource.md#parse) to return an instance of resource kind's class. This abstraction is needed
because importing the Resource Kind classes (e.g. Offering) creates a circular dependency
due to each concrete Resource Kind class extending Resource. Library consumers dont have to worry about setting this

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"offering"`` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `jsonResource` | [`ResourceModel`](../index.md#resourcemodel)<`T`\> |

##### Returns

[`Offering`](Offering.md)

#### Inherited from

[Resource](Resource.md).[factory](Resource.md#factory)

## Accessors

### createdAt

• `get` **createdAt**(): `string`

#### Returns

`string`

#### Inherited from

Resource.createdAt

___

### data

• `get` **data**(): [`ResourceKindModel`](../index.md#resourcekindmodel)<`T`\>

#### Returns

[`ResourceKindModel`](../index.md#resourcekindmodel)<`T`\>

#### Inherited from

Resource.data

___

### description

• `get` **description**(): `string`

Brief description of what is being offered.

#### Returns

`string`

___

### from

• `get` **from**(): `string`

#### Returns

`string`

#### Inherited from

Resource.from

___

### id

• `get` **id**(): `string`

the resource's id

#### Returns

`string`

#### Inherited from

Resource.id

___

### kind

• `get` **kind**(): `T`

#### Returns

`T`

#### Inherited from

Resource.kind

___

### metadata

• `get` **metadata**(): [`ResourceMetadata`](../index.md#resourcemetadata)<`T`\>

#### Returns

[`ResourceMetadata`](../index.md#resourcemetadata)<`T`\>

#### Inherited from

Resource.metadata

___

### payinCurrency

• `get` **payinCurrency**(): [`CurrencyDetails`](../index.md#currencydetails)

Details about the currency that the PFI is buying in exchange for payoutCurrency.

#### Returns

[`CurrencyDetails`](../index.md#currencydetails)

___

### payinMethods

• `get` **payinMethods**(): [`PaymentMethod`](../index.md#paymentmethod)[]

A list of accepted payment methods that Alice can use to send payinCurrency to a PFI

#### Returns

[`PaymentMethod`](../index.md#paymentmethod)[]

___

### payoutCurrency

• `get` **payoutCurrency**(): [`CurrencyDetails`](../index.md#currencydetails)

Details about the currency that the PFI is buying in exchange for payinCurrency.

#### Returns

[`CurrencyDetails`](../index.md#currencydetails)

___

### payoutMethods

• `get` **payoutMethods**(): [`PaymentMethod`](../index.md#paymentmethod)[]

A list of accepted payment methods that Alice can use to receive payoutCurrency from a PFI

#### Returns

[`PaymentMethod`](../index.md#paymentmethod)[]

___

### payoutUnitsPerPayinUnit

• `get` **payoutUnitsPerPayinUnit**(): `string`

Number of payout currency units for one payin currency unit (i.e 290000 USD for 1 BTC)

#### Returns

`string`

___

### requiredClaims

• `get` **requiredClaims**(): `PresentationDefinitionV2`

Articulates the claim(s) required when submitting an RFQ for this offering.

#### Returns

`PresentationDefinitionV2`

___

### signature

• `get` **signature**(): `string`

the resource's cryptographic signature

#### Returns

`string`

#### Inherited from

Resource.signature

___

### updatedAt

• `get` **updatedAt**(): `string`

#### Returns

`string`

#### Inherited from

Resource.updatedAt

## Methods

### isOffering

▸ **isOffering**(): this is Resource<"offering"\>

offering type guard

#### Returns

this is Resource<"offering"\>

#### Inherited from

[Resource](Resource.md).[isOffering](Resource.md#isoffering)

___

### sign

▸ **sign**(`privateKeyJwk`, `kid`): `Promise`<`void`\>

signs the message as a jws with detached content and sets the signature property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKeyJwk` | `PrivateKeyJwk` | the key to sign with |
| `kid` | `string` | the kid to include in the jws header. used by the verifier to select the appropriate verificationMethod when dereferencing the signer's DID |

#### Returns

`Promise`<`void`\>

#### Inherited from

[Resource](Resource.md).[sign](Resource.md#sign)

___

### toJSON

▸ **toJSON**(): [`ResourceModel`](../index.md#resourcemodel)<``"offering"``\>

returns the message as a json object. Automatically used by JSON.stringify method.

#### Returns

[`ResourceModel`](../index.md#resourcemodel)<``"offering"``\>

#### Inherited from

[Resource](Resource.md).[toJSON](Resource.md#tojson)

___

### verify

▸ **verify**(): `Promise`<`string`\>

validates the resource and verifies the cryptographic signature

#### Returns

`Promise`<`string`\>

**`Throws`**

if the resource is invalid

**`Throws`**

see [Crypto.verify](Crypto.md#verify)

#### Inherited from

[Resource](Resource.md).[verify](Resource.md#verify)

___

### create

▸ `Static` **create**(`opts`): [`Offering`](Offering.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`CreateOfferingOptions`](../index.md#createofferingoptions) |

#### Returns

[`Offering`](Offering.md)

___

### generateId

▸ `Static` **generateId**(`resourceKind`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resourceKind` | ``"offering"`` |

#### Returns

`string`

#### Inherited from

[Resource](Resource.md).[generateId](Resource.md#generateid)

___

### parse

▸ `Static` **parse**<`T`\>(`resource`): `Promise`<[`Offering`](Offering.md)\>

parses the json resource into a Resource instance. performs format validation and an integrity check on the signature

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"offering"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | `string` \| [`ResourceModel`](../index.md#resourcemodel)<`T`\> |

#### Returns

`Promise`<[`Offering`](Offering.md)\>

#### Inherited from

[Resource](Resource.md).[parse](Resource.md#parse)

___

### validate

▸ `Static` **validate**(`jsonResource`): `void`

validates the resource provided against the appropriate json schemas.
2-phased validation: First validates the resource structure and then
validates `data` based on the value of `metadata.kind`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonResource` | `any` | the resource to validate |

#### Returns

`void`

**`Throws`**

if validation fails

#### Inherited from

[Resource](Resource.md).[validate](Resource.md#validate)

___

### verify

▸ `Static` **verify**<`T`\>(`resource`): `Promise`<`string`\>

validates the resource and verifies the cryptographic signature

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"offering"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`ResourceModel`](../index.md#resourcemodel)<`T`\> \| [`Resource`](Resource.md)<`T`\> |

#### Returns

`Promise`<`string`\>

**`Throws`**

if the message is invalid

**`Throws`**

see [Crypto.verify](Crypto.md#verify)

#### Inherited from

[Resource](Resource.md).[verify](Resource.md#verify-1)
