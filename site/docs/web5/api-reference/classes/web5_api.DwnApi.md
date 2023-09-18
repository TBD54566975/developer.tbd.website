---
id: "web5_api.DwnApi"
title: "Class: DwnApi"
sidebar_label: "@web5/api.DwnApi"
custom_edit_url: null
---

[@web5/api](../modules/web5_api.md).DwnApi

TODO: Document class.

## Constructors

### constructor

• **new DwnApi**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.agent` | `Web5Agent` |
| `options.connectedDid` | `string` |

#### Defined in

[dwn-api.ts:106](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L106)

## Properties

### agent

• `Private` **agent**: `Web5Agent`

#### Defined in

[dwn-api.ts:103](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L103)

___

### connectedDid

• `Private` **connectedDid**: `string`

#### Defined in

[dwn-api.ts:104](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L104)

## Accessors

### protocols

• `get` **protocols**(): `Object`

TODO: Document namespace.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `configure` | (`request`: [`ProtocolsConfigureRequest`](../modules/web5_api.md#protocolsconfigurerequest)) => `Promise`<[`ProtocolsConfigureResponse`](../modules/web5_api.md#protocolsconfigureresponse)\> |
| `query` | (`request`: [`ProtocolsQueryRequest`](../modules/web5_api.md#protocolsqueryrequest)) => `Promise`<[`ProtocolsQueryResponse`](../modules/web5_api.md#protocolsqueryresponse)\> |

#### Defined in

[dwn-api.ts:114](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L114)

___

### records

• `get` **records**(): `Object`

TODO: Document namespace.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `create` | (`request`: [`RecordsWriteRequest`](../modules/web5_api.md#recordswriterequest)) => `Promise`<[`RecordsWriteResponse`](../modules/web5_api.md#recordswriteresponse)\> |
| `createFrom` | (`request`: [`RecordsCreateFromRequest`](../modules/web5_api.md#recordscreatefromrequest)) => `Promise`<[`RecordsWriteResponse`](../modules/web5_api.md#recordswriteresponse)\> |
| `delete` | (`request`: [`RecordsDeleteRequest`](../modules/web5_api.md#recordsdeleterequest)) => `Promise`<[`RecordsDeleteResponse`](../modules/web5_api.md#recordsdeleteresponse)\> |
| `query` | (`request`: [`RecordsQueryRequest`](../modules/web5_api.md#recordsqueryrequest)) => `Promise`<[`RecordsQueryResponse`](../modules/web5_api.md#recordsqueryresponse)\> |
| `read` | (`request`: [`RecordsReadRequest`](../modules/web5_api.md#recordsreadrequest)) => `Promise`<[`RecordsReadResponse`](../modules/web5_api.md#recordsreadresponse)\> |
| `write` | (`request`: [`RecordsWriteRequest`](../modules/web5_api.md#recordswriterequest)) => `Promise`<[`RecordsWriteResponse`](../modules/web5_api.md#recordswriteresponse)\> |

#### Defined in

[dwn-api.ts:173](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L173)
