---
id: "web5_api.Record"
title: "Class: Record"
sidebar_label: "@web5/api.Record"
custom_edit_url: null
---

[@web5/api](../modules/web5_api.md).Record

TODO: Document class.

Note: The `messageTimestamp` of the most recent RecordsWrite message is
      logically equivalent to the date/time at which a Record was most
      recently modified.  Since this Record class implementation is
      intended to simplify the developer experience of working with
      logical records (and not individual DWN messages) the
      `messageTimestamp` is mapped to `dateModified`.

## Implements

- [`RecordModel`](../modules/web5_api.md#recordmodel)

## Constructors

### constructor

• **new Record**(`agent`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `agent` | `Web5Agent` |
| `options` | [`RecordOptions`](../modules/web5_api.md#recordoptions) |

#### Defined in

[record.ts:83](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L83)

## Properties

### \_agent

• `Private` **\_agent**: `Web5Agent`

#### Defined in

[record.ts:51](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L51)

___

### \_attestation

• `Private` `Optional` **\_attestation**: `GeneralJws`

#### Defined in

[record.ts:52](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L52)

___

### \_contextId

• `Private` `Optional` **\_contextId**: `string`

#### Defined in

[record.ts:53](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L53)

___

### \_descriptor

• `Private` **\_descriptor**: `RecordsWriteDescriptor`

#### Defined in

[record.ts:54](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L54)

___

### \_encodedData

• `Private` `Optional` **\_encodedData**: `string` \| `Blob`

#### Defined in

[record.ts:55](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L55)

___

### \_encryption

• `Private` `Optional` **\_encryption**: `EncryptionProperty`

#### Defined in

[record.ts:56](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L56)

___

### \_readableStream

• `Private` `Optional` **\_readableStream**: `Readable` \| `Promise`<`Readable`\>

#### Defined in

[record.ts:57](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L57)

___

### \_recordId

• `Private` **\_recordId**: `string`

#### Defined in

[record.ts:58](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L58)

___

### author

• **author**: `string`

#### Implementation of

RecordModel.author

#### Defined in

[record.ts:47](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L47)

___

### isDeleted

• **isDeleted**: `boolean` = `false`

#### Defined in

[record.ts:49](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L49)

___

### target

• **target**: `string`

#### Implementation of

RecordModel.target

#### Defined in

[record.ts:48](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L48)

## Accessors

### attestation

• `get` **attestation**(): `GeneralJws`

#### Returns

`GeneralJws`

#### Implementation of

RecordModel.attestation

#### Defined in

[record.ts:61](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L61)

___

### contextId

• `get` **contextId**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.contextId

#### Defined in

[record.ts:62](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L62)

___

### data

• `get` **data**(): `Object`

TODO: Document method.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `blob` | () => `Promise`<`Blob`\> |
| `catch` | (`callback`: `any`) => `any` |
| `json` | () => `Promise`<`any`\> |
| `stream` | () => `Promise`<`Readable`\> |
| `text` | () => `Promise`<`any`\> |
| `then` | (...`callbacks`: `any`[]) => `any` |

#### Defined in

[record.ts:112](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L112)

___

### dataCid

• `get` **dataCid**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.dataCid

#### Defined in

[record.ts:76](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L76)

___

### dataFormat

• `get` **dataFormat**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.dataFormat

#### Defined in

[record.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L63)

___

### dataSize

• `get` **dataSize**(): `number`

#### Returns

`number`

#### Implementation of

RecordModel.dataSize

#### Defined in

[record.ts:77](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L77)

___

### dateCreated

• `get` **dateCreated**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.dateCreated

#### Defined in

[record.ts:64](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L64)

___

### dateModified

• `get` **dateModified**(): `string`

#### Returns

`string`

#### Defined in

[record.ts:78](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L78)

___

### datePublished

• `get` **datePublished**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.datePublished

#### Defined in

[record.ts:79](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L79)

___

### encryption

• `get` **encryption**(): `EncryptionProperty`

#### Returns

`EncryptionProperty`

#### Implementation of

RecordModel.encryption

#### Defined in

[record.ts:65](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L65)

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Defined in

[record.ts:66](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L66)

___

### interface

• `get` **interface**(): `Records`

#### Returns

`Records`

#### Implementation of

RecordModel.interface

#### Defined in

[record.ts:67](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L67)

___

### messageTimestamp

• `get` **messageTimestamp**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.messageTimestamp

#### Defined in

[record.ts:80](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L80)

___

### method

• `get` **method**(): `Write`

#### Returns

`Write`

#### Implementation of

RecordModel.method

#### Defined in

[record.ts:68](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L68)

___

### parentId

• `get` **parentId**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.parentId

#### Defined in

[record.ts:69](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L69)

___

### protocol

• `get` **protocol**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.protocol

#### Defined in

[record.ts:70](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L70)

___

### protocolPath

• `get` **protocolPath**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.protocolPath

#### Defined in

[record.ts:71](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L71)

___

### published

• `get` **published**(): `boolean`

#### Returns

`boolean`

#### Implementation of

RecordModel.published

#### Defined in

[record.ts:81](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L81)

___

### recipient

• `get` **recipient**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.recipient

#### Defined in

[record.ts:72](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L72)

___

### schema

• `get` **schema**(): `string`

#### Returns

`string`

#### Implementation of

RecordModel.schema

#### Defined in

[record.ts:73](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L73)

## Methods

### delete

▸ **delete**(): `Promise`<[`RecordsDeleteResponse`](../modules/web5_api.md#recordsdeleteresponse)\>

TODO: Document method.

#### Returns

`Promise`<[`RecordsDeleteResponse`](../modules/web5_api.md#recordsdeleteresponse)\>

#### Defined in

[record.ts:177](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L177)

___

### send

▸ **send**(`target`): `Promise`<`any`\>

TODO: Document method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[record.ts:201](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L201)

___

### setDeletedStatus

▸ `Private` **setDeletedStatus**(`status`): `void`

TODO: Document method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `boolean` |

#### Returns

`void`

#### Defined in

[record.ts:342](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L342)

___

### toJSON

▸ **toJSON**(): [`RecordModel`](../modules/web5_api.md#recordmodel)

TODO: Document method.

Called by `JSON.stringify(...)` automatically.

#### Returns

[`RecordModel`](../modules/web5_api.md#recordmodel)

#### Defined in

[record.ts:220](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L220)

___

### toString

▸ **toString**(): `string`

TODO: Document method.

Called automatically in string concatenation, String() type conversion, and template literals.

#### Returns

`string`

#### Defined in

[record.ts:250](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L250)

___

### update

▸ **update**(`options?`): `Promise`<{ `status`: `Status`  }\>

TODO: Document method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RecordUpdateOptions`](../modules/web5_api.md#recordupdateoptions) |

#### Returns

`Promise`<{ `status`: `Status`  }\>

#### Defined in

[record.ts:268](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L268)

___

### isReadableWebStream

▸ `Private` `Static` **isReadableWebStream**(`stream`): `boolean`

TODO: Document method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `any` |

#### Returns

`boolean`

#### Defined in

[record.ts:349](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L349)

___

### verifyPermittedMutation

▸ `Private` `Static` **verifyPermittedMutation**(`propertiesToMutate`, `mutableDescriptorProperties`): `void`

TODO: Document method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertiesToMutate` | `Iterable`<`string`\> |
| `mutableDescriptorProperties` | `Set`<`string`\> |

#### Returns

`void`

#### Defined in

[record.ts:357](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L357)
