---
id: "web5_dids.utils"
title: "Namespace: utils"
sidebar_label: "@web5/dids.utils"
custom_edit_url: null
---

[@web5/dids](../modules/web5_dids.md).utils

## Interfaces

- [ParsedDid](../interfaces/web5_dids.utils.ParsedDid.md)

## Variables

### DID\_REGEX

• `Const` **DID\_REGEX**: `RegExp`

#### Defined in

[utils.ts:17](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/utils.ts#L17)

## Functions

### getServices

▸ **getServices**(`options`): [`DidService`](../modules/web5_dids.md#didservice)[]

Retrieves services from a given DID document based on provided options.
If no `id` or `type` filters are provided, all defined services are returned.

Note: The DID document must adhere to the W3C DID specification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | An object containing input parameters for retrieving services. |
| `options.didDocument` | [`DidDocument`](../modules/web5_dids.md#diddocument) | The DID document from which services are retrieved. |
| `options.id?` | `string` | Optional. A string representing the specific service ID to match. If provided, only the service with this ID will be returned. |
| `options.type?` | `string` | Optional. A string representing the specific service type to match. If provided, only the service(s) of this type will be returned. |

#### Returns

[`DidService`](../modules/web5_dids.md#didservice)[]

An array of services. If no matching service is found, an empty array is returned.

**`Example`**

```ts
const didDoc = { ... }; // W3C DID document
const services = getServices({ didDocument: didDoc, type: 'DecentralizedWebNode' });
```

#### Defined in

[utils.ts:37](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/utils.ts#L37)

___

### getVerificationMethodIds

▸ **getVerificationMethodIds**(`options`): `string` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.didDocument` | [`DidDocument`](../modules/web5_dids.md#diddocument) |
| `options.publicKeyJwk?` | [`PublicKeyJwk`](../modules/web5_crypto.md#publickeyjwk) |
| `options.publicKeyMultibase?` | `string` |

#### Returns

`string` \| `undefined`

#### Defined in

[utils.ts:51](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/utils.ts#L51)

___

### getVerificationMethodTypes

▸ **getVerificationMethodTypes**(`options`): `string`[]

Retrieves DID verification method types from a given DID document.

Note: The DID document must adhere to the W3C DID specification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | An object containing input parameters for retrieving types. |
| `options.didDocument` | `Record`<`string`, `any`\> | The DID document from which types are retrieved. |

#### Returns

`string`[]

An array of types. If no types were found, an empty array is returned.

#### Defined in

[utils.ts:85](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/utils.ts#L85)

___

### isDwnServiceEndpoint

▸ **isDwnServiceEndpoint**(`endpoint`): endpoint is DwnServiceEndpoint

Type guard function to check if the given endpoint is a DwnServiceEndpoint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `string` \| [`DidServiceEndpoint`](../interfaces/web5_dids.DidServiceEndpoint.md) \| [`DidServiceEndpoint`](../interfaces/web5_dids.DidServiceEndpoint.md)[] |

#### Returns

endpoint is DwnServiceEndpoint

True if the endpoint is a DwnServiceEndpoint, false otherwise.

#### Defined in

[utils.ts:112](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/utils.ts#L112)

___

### parseDid

▸ **parseDid**(`«destructured»`): [`ParsedDid`](../interfaces/web5_dids.utils.ParsedDid.md) \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `didUrl` | `string` |

#### Returns

[`ParsedDid`](../interfaces/web5_dids.utils.ParsedDid.md) \| `undefined`

#### Defined in

[utils.ts:120](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/utils.ts#L120)
