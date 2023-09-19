# Class: NotSupportedError

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

- [`CryptoError`](CryptoError.md)

  ↳ **`NotSupportedError`**

## Table of contents

### Constructors

- [constructor](NotSupportedError.md#constructor)

### Properties

- [message](NotSupportedError.md#message)
- [name](NotSupportedError.md#name)
- [stack](NotSupportedError.md#stack)
- [prepareStackTrace](NotSupportedError.md#preparestacktrace)
- [stackTraceLimit](NotSupportedError.md#stacktracelimit)

### Methods

- [captureStackTrace](NotSupportedError.md#capturestacktrace)

## Constructors

### constructor

• **new NotSupportedError**(`message?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Inherited from

[CryptoError](CryptoError.md).[constructor](CryptoError.md#constructor)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1073

## Properties

### message

• **message**: `string`

#### Inherited from

[CryptoError](CryptoError.md).[message](CryptoError.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

[CryptoError](CryptoError.md).[name](CryptoError.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[CryptoError](CryptoError.md).[stack](CryptoError.md#stack)

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

[CryptoError](CryptoError.md).[prepareStackTrace](CryptoError.md#preparestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[CryptoError](CryptoError.md).[stackTraceLimit](CryptoError.md#stacktracelimit)

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

[CryptoError](CryptoError.md).[captureStackTrace](CryptoError.md#capturestacktrace)

#### Defined in

node_modules/@types/node/globals.d.ts:4
