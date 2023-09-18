---
id: "web5_crypto.CryptoError"
title: "Class: CryptoError"
sidebar_label: "@web5/crypto.CryptoError"
custom_edit_url: null
---

[@web5/crypto](../modules/web5_crypto.md).CryptoError

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

  ↳↳ [`DataError`](web5_crypto.DataError.md)

  ↳↳ [`InvalidAccessError`](web5_crypto.InvalidAccessError.md)

  ↳↳ [`NotSupportedError`](web5_crypto.NotSupportedError.md)

  ↳↳ [`OperationError`](web5_crypto.OperationError.md)

  ↳↳ [`SyntaxError`](web5_crypto.SyntaxError.md)

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

developer.tbd.website/node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1073

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

developer.tbd.website/node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

developer.tbd.website/node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

developer.tbd.website/node_modules/.pnpm/typescript@5.1.6/node_modules/typescript/lib/lib.es5.d.ts:1069

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

web5-js/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

web5-js/node_modules/@types/node/globals.d.ts:13

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

web5-js/node_modules/@types/node/globals.d.ts:4
