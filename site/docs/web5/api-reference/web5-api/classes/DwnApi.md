# Class: DwnApi

TODO: Document class.

## Table of contents

### Constructors

- [constructor](DwnApi.md#constructor)

### Accessors

- [protocols](DwnApi.md#protocols)
- [records](DwnApi.md#records)

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

## Accessors

### protocols

• `get` **protocols**(): `Object`

TODO: Document namespace.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `configure` | (`request`: [`ProtocolsConfigureRequest`](../index.md#protocolsconfigurerequest)) => `Promise`<[`ProtocolsConfigureResponse`](../index.md#protocolsconfigureresponse)\> |
| `query` | (`request`: [`ProtocolsQueryRequest`](../index.md#protocolsqueryrequest)) => `Promise`<[`ProtocolsQueryResponse`](../index.md#protocolsqueryresponse)\> |

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
| `create` | (`request`: [`RecordsWriteRequest`](../index.md#recordswriterequest)) => `Promise`<[`RecordsWriteResponse`](../index.md#recordswriteresponse)\> |
| `createFrom` | (`request`: [`RecordsCreateFromRequest`](../index.md#recordscreatefromrequest)) => `Promise`<[`RecordsWriteResponse`](../index.md#recordswriteresponse)\> |
| `delete` | (`request`: [`RecordsDeleteRequest`](../index.md#recordsdeleterequest)) => `Promise`<[`RecordsDeleteResponse`](../index.md#recordsdeleteresponse)\> |
| `query` | (`request`: [`RecordsQueryRequest`](../index.md#recordsqueryrequest)) => `Promise`<[`RecordsQueryResponse`](../index.md#recordsqueryresponse)\> |
| `read` | (`request`: [`RecordsReadRequest`](../index.md#recordsreadrequest)) => `Promise`<[`RecordsReadResponse`](../index.md#recordsreadresponse)\> |
| `write` | (`request`: [`RecordsWriteRequest`](../index.md#recordswriterequest)) => `Promise`<[`RecordsWriteResponse`](../index.md#recordswriteresponse)\> |

#### Defined in

[dwn-api.ts:173](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L173)
