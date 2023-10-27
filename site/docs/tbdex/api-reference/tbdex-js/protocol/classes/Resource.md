tbDEX Resources are published by PFIs for anyone to consume and generally used as a part of the discovery process.
They are not part of the message exchange, i.e Alice cannot reply to a Resource.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ResourceKind`](../index.md#resourcekind) |

## Hierarchy

- **`Resource`**

  ↳ [`Offering`](Offering.md)

## Constructors

### constructor

• **new Resource**<`T`\>(`jsonResource`)

Constructor is primarily for intended for internal use. For a better developer experience,
consumers should use concrete classes to programmatically create resources (e.g. Offering class) and
[Resource.parse](Resource.md#parse) to parse stringified resources.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"offering"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonResource` | [`NewResource`](../index.md#newresource)<`T`\> | the resource as a json object |

## Properties

### \_data

• `Private` **\_data**: [`ResourceKindModel`](../index.md#resourcekindmodel)<`T`\>

___

### \_metadata

• `Private` **\_metadata**: [`ResourceMetadata`](../index.md#resourcemetadata)<`T`\>

___

### \_signature

• `Private` **\_signature**: `string`

___

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

## Accessors

### createdAt

• `get` **createdAt**(): `string`

Resource creation time. Expressed as ISO8601

#### Returns

`string`

___

### data

• `get` **data**(): [`ResourceKindModel`](../index.md#resourcekindmodel)<`T`\>

the actual resource kind's content data

#### Returns

[`ResourceKindModel`](../index.md#resourcekindmodel)<`T`\>

___

### from

• `get` **from**(): `string`

The sender's DID

#### Returns

`string`

___

### id

• `get` **id**(): `string`

the resource's id

#### Returns

`string`

___

### kind

• `get` **kind**(): `T`

the resource kind (e.g. offering)

#### Returns

`T`

___

### metadata

• `get` **metadata**(): [`ResourceMetadata`](../index.md#resourcemetadata)<`T`\>

The metadata object contains fields about the resource and is present in every tbdex resource.

#### Returns

[`ResourceMetadata`](../index.md#resourcemetadata)<`T`\>

___

### signature

• `get` **signature**(): `string`

the resource's cryptographic signature

#### Returns

`string`

___

### updatedAt

• `get` **updatedAt**(): `string`

Resource last updated time. Expressed as ISO8601

#### Returns

`string`

## Methods

### isOffering

▸ **isOffering**(): this is Resource<"offering"\>

offering type guard

#### Returns

this is Resource<"offering"\>

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

___

### toJSON

▸ **toJSON**(): [`ResourceModel`](../index.md#resourcemodel)<`T`\>

returns the message as a json object. Automatically used by `JSON.stringify` method.

#### Returns

[`ResourceModel`](../index.md#resourcemodel)<`T`\>

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

___

### generateId

▸ `Static` **generateId**(`resourceKind`): `string`

Generates a unique id with the resource kind's prefix

#### Parameters

| Name | Type |
| :------ | :------ |
| `resourceKind` | ``"offering"`` |

#### Returns

`string`

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

`Error` if validation fails

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
