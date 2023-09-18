---
id: "web5_api"
title: "Module: @web5/api"
sidebar_label: "@web5/api"
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [utils](../namespaces/web5_api.utils.md)

## Classes

- [DidApi](../classes/web5_api.DidApi.md)
- [DwnApi](../classes/web5_api.DwnApi.md)
- [Protocol](../classes/web5_api.Protocol.md)
- [Record](../classes/web5_api.Record.md)
- [VcApi](../classes/web5_api.VcApi.md)
- [Web5](../classes/web5_api.Web5.md)

## Type Aliases

### ProtocolsConfigureMessage

Ƭ **ProtocolsConfigureMessage**: `ProtocolsConfigure`[``"message"``]

#### Defined in

[protocol.ts:5](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/protocol.ts#L5)

___

### ProtocolsConfigureRequest

Ƭ **ProtocolsConfigureRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message` | `Omit`<`ProtocolsConfigureOptions`, ``"authorizationSignatureInput"``\> |

#### Defined in

[dwn-api.ts:23](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L23)

___

### ProtocolsConfigureResponse

Ƭ **ProtocolsConfigureResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `protocol?` | [`Protocol`](../classes/web5_api.Protocol.md) |
| `status` | `UnionMessageReply`[``"status"``] |

#### Defined in

[dwn-api.ts:27](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L27)

___

### ProtocolsQueryReplyEntry

Ƭ **ProtocolsQueryReplyEntry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `descriptor` | `ProtocolsConfigureDescriptor` |

#### Defined in

[dwn-api.ts:32](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L32)

___

### ProtocolsQueryRequest

Ƭ **ProtocolsQueryRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from?` | `string` |
| `message` | `Omit`<`ProtocolsQueryOptions`, ``"authorizationSignatureInput"``\> |

#### Defined in

[dwn-api.ts:36](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L36)

___

### ProtocolsQueryResponse

Ƭ **ProtocolsQueryResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `protocols` | [`Protocol`](../classes/web5_api.Protocol.md)[] |
| `status` | `UnionMessageReply`[``"status"``] |

#### Defined in

[dwn-api.ts:41](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L41)

___

### RecordModel

Ƭ **RecordModel**: `RecordsWriteDescriptor` & `Omit`<`RecordsWriteMessage`, ``"descriptor"`` \| ``"recordId"``\> & { `author`: `string` ; `recordId?`: `string` ; `target`: `string`  }

#### Defined in

[record.ts:18](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L18)

___

### RecordOptions

Ƭ **RecordOptions**: `RecordsWriteMessage` & { `author`: `string` ; `data?`: `Readable` \| `ReadableStream` ; `encodedData?`: `string` \| `Blob` ; `target`: `string`  }

#### Defined in

[record.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L11)

___

### RecordUpdateOptions

Ƭ **RecordUpdateOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data?` | `unknown` |
| `dataCid?` | `RecordsWriteDescriptor`[``"dataCid"``] |
| `dataSize?` | `RecordsWriteDescriptor`[``"dataSize"``] |
| `dateModified?` | `RecordsWriteDescriptor`[``"messageTimestamp"``] |
| `datePublished?` | `RecordsWriteDescriptor`[``"datePublished"``] |
| `published?` | `RecordsWriteDescriptor`[``"published"``] |

#### Defined in

[record.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/record.ts#L26)

___

### RecordsCreateFromRequest

Ƭ **RecordsCreateFromRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `author` | `string` |
| `data` | `unknown` |
| `message?` | `Omit`<`RecordsWriteOptions`, ``"authorizationSignatureInput"``\> |
| `record` | [`Record`](../classes/web5_api.Record.md) |

#### Defined in

[dwn-api.ts:50](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L50)

___

### RecordsCreateRequest

Ƭ **RecordsCreateRequest**: [`RecordsWriteRequest`](web5_api.md#recordswriterequest)

#### Defined in

[dwn-api.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L46)

___

### RecordsCreateResponse

Ƭ **RecordsCreateResponse**: [`RecordsWriteResponse`](web5_api.md#recordswriteresponse)

#### Defined in

[dwn-api.ts:48](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L48)

___

### RecordsDeleteRequest

Ƭ **RecordsDeleteRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from?` | `string` |
| `message` | `Omit`<`RecordsDeleteOptions`, ``"authorizationSignatureInput"``\> |

#### Defined in

[dwn-api.ts:57](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L57)

___

### RecordsDeleteResponse

Ƭ **RecordsDeleteResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `status` | `UnionMessageReply`[``"status"``] |

#### Defined in

[dwn-api.ts:62](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L62)

___

### RecordsQueryRequest

Ƭ **RecordsQueryRequest**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `from?` | `string` | The from property indicates the DID to query from and return results. |
| `message` | `Omit`<`RecordsQueryOptions`, ``"authorizationSignatureInput"``\> | - |

#### Defined in

[dwn-api.ts:66](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L66)

___

### RecordsQueryResponse

Ƭ **RecordsQueryResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `records?` | [`Record`](../classes/web5_api.Record.md)[] |
| `status` | `UnionMessageReply`[``"status"``] |

#### Defined in

[dwn-api.ts:72](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L72)

___

### RecordsReadRequest

Ƭ **RecordsReadRequest**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `from?` | `string` | The from property indicates the DID to read from and return results fro. |
| `message` | `Omit`<`RecordsReadOptions`, ``"authorizationSignatureInput"``\> | - |

#### Defined in

[dwn-api.ts:77](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L77)

___

### RecordsReadResponse

Ƭ **RecordsReadResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `record` | [`Record`](../classes/web5_api.Record.md) |
| `status` | `UnionMessageReply`[``"status"``] |

#### Defined in

[dwn-api.ts:83](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L83)

___

### RecordsWriteRequest

Ƭ **RecordsWriteRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `unknown` |
| `message?` | `Omit`<`Partial`<`RecordsWriteOptions`\>, ``"authorizationSignatureInput"``\> |
| `store?` | `boolean` |

#### Defined in

[dwn-api.ts:88](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L88)

___

### RecordsWriteResponse

Ƭ **RecordsWriteResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `record?` | [`Record`](../classes/web5_api.Record.md) |
| `status` | `UnionMessageReply`[``"status"``] |

#### Defined in

[dwn-api.ts:94](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/dwn-api.ts#L94)

___

### TechPreviewOptions

Ƭ **TechPreviewOptions**: `Object`

Override defaults configured during the technical preview phase.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dwnEndpoints?` | `string`[] |

#### Defined in

[web5.ts:15](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L15)

___

### Web5ConnectOptions

Ƭ **Web5ConnectOptions**: `Object`

Optional overrides that can be provided when calling [Web5.connect](../classes/web5_api.Web5.md#connect).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `agent?` | `Web5Agent` | Provide a Web5Agent implementation. Defaults to creating a local Web5UserAgent if one isn't provided |
| `appData?` | `AppDataStore` | Provide an instance of a AppDataStore implementation. Defaults to a LevelDB-backed store with an insecure, static unlock passphrase if one isn't provided. To allow the app user to enter a secure passphrase of their choosing, provide an initialized AppDataStore instance. |
| `connectedDid?` | `string` | - |
| `sync?` | `string` | Enable synchronization of DWN records between local and remote DWNs. Sync defaults to running every 2 minutes and can be set to any value accepted by `ms()`. To disable sync set to 'off'. |
| `techPreview?` | [`TechPreviewOptions`](web5_api.md#techpreviewoptions) | Override defaults configured during the technical preview phase. See [TechPreviewOptions](web5_api.md#techpreviewoptions) for available options. |

#### Defined in

[web5.ts:23](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/web5.ts#L23)
