# Class: CryptoError

The methods of KeyManager and KeyManagementSystem interfaces return
errors by rejecting the returned promise with a predefined exception
defined in ECMAScript [ECMA-262] or DOMException.

The following predefined exceptions are used: TypeError.

The following DOMException types from [DOM4] are used:
  DataError: Data provided to an operation does not meet requirements
  InvalidAccessError: The requested operation is not valid for the provided key
  NotSupportedError: The algorithm is not supported
  OperationError: The operation failed for an operation-specific reason
  SyntaxError: A required parameter was missing or out-of-range

Reference: https://www.w3.org/TR/WebCryptoAPI/#SubtleCrypto-Exceptions
           Section 14.4. Exceptions

## Hierarchy

- `Error`

  ↳ **`CryptoError`**

  ↳↳ [`DataError`](DataError.md)

  ↳↳ [`InvalidAccessError`](InvalidAccessError.md)

  ↳↳ [`NotSupportedError`](NotSupportedError.md)

  ↳↳ [`OperationError`](OperationError.md)

  ↳↳ [`SyntaxError`](SyntaxError.md)

## Table of contents

### Constructors

- [constructor](CryptoError.md#constructor)

### Properties

- [message](CryptoError.md#message)
- [name](CryptoError.md#name)
- [stack](CryptoError.md#stack)
- [prepareStackTrace](CryptoError.md#preparestacktrace)
- [stackTraceLimit](CryptoError.md#stacktracelimit)

### Methods

- [captureStackTrace](CryptoError.md#capturestacktrace)

## Constructors

### constructor

• **new CryptoError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

Error.constructor

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1073

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
