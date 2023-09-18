---
id: "web5_api.Protocol"
title: "Class: Protocol"
sidebar_label: "@web5/api.Protocol"
custom_edit_url: null
---

[@web5/api](../modules/web5_api.md).Protocol

## Constructors

### constructor

• **new Protocol**(`agent`, `protocolsConfigureMessage`, `metadata`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `agent` | `Web5Agent` |
| `protocolsConfigureMessage` | `ProtocolsConfigureMessage` |
| `metadata` | `ProtocolMetadata` |

#### Defined in

[protocol.ts:20](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/protocol.ts#L20)

## Properties

### \_agent

• `Private` **\_agent**: `Web5Agent`

#### Defined in

[protocol.ts:12](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/protocol.ts#L12)

___

### \_metadata

• `Private` **\_metadata**: `ProtocolMetadata`

#### Defined in

[protocol.ts:13](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/protocol.ts#L13)

___

### \_protocolsConfigureMessage

• `Private` **\_protocolsConfigureMessage**: `ProtocolsConfigureMessage`

#### Defined in

[protocol.ts:14](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/protocol.ts#L14)

## Accessors

### definition

• `get` **definition**(): `ProtocolDefinition`

#### Returns

`ProtocolDefinition`

#### Defined in

[protocol.ts:16](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/protocol.ts#L16)

## Methods

### send

▸ **send**(`target`): `Promise`<{ `status`: `Status` = reply.status }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |

#### Returns

`Promise`<{ `status`: `Status` = reply.status }\>

#### Defined in

[protocol.ts:30](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/protocol.ts#L30)

___

### toJSON

▸ **toJSON**(): `ProtocolsConfigureMessage`

#### Returns

`ProtocolsConfigureMessage`

#### Defined in

[protocol.ts:26](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/api/src/protocol.ts#L26)
