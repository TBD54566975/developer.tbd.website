# Class: Protocol

## Table of contents

### Constructors

- [constructor](Protocol.md#constructor)

### Accessors

- [definition](Protocol.md#definition)

### Methods

- [send](Protocol.md#send)
- [toJSON](Protocol.md#tojson)

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
