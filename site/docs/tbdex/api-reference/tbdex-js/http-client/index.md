---
title: '@tbdex/http-client'
---

A client that can be used to interface with tbDEX PFIs over an HTTP transport

[Link to GitHub Repo](https://github.com/TBD54566975/tbdex-js/tree/main/packages/http-client)

## Classes

- [TbdexHttpClient](classes/TbdexHttpClient.md)

## Type Aliases

### DataResponse

Ƭ **DataResponse**<`T`\>: [`HttpResponse`](index.md#httpresponse) & { `data`: `T` ; `errors?`: `never`  }

HTTP Response with data

#### Type parameters

| Name |
| :------ |
| `T` |

___

### ErrorDetail

Ƭ **ErrorDetail**: `Object`

Error received from the PFI server response

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `code?` | `string` | An application-specific error code, expressed as a string value. |
| `detail` | `string` | A human-readable explanation specific to this occurrence of the problem. |
| `id?` | `string` | A unique identifier for this particular occurrence of the problem. |
| `meta?` | `Record`<`string`, `any`\> | A meta object containing non-standard meta-information about the error. |
| `source?` | { `header?`: `string` ; `parameter?`: `string` ; `pointer?`: `string`  } | An object containing references to the source of the error. |
| `source.header?` | `string` | A string indicating the name of a single request header which caused the error. |
| `source.parameter?` | `string` | A string indicating which URI query parameter caused the error. |
| `source.pointer?` | `string` | A JSON Pointer to the value in the request document that caused the error. |
| `status?` | `string` | The HTTP status code applicable to this problem, expressed as a string value. |
| `title?` | `string` | A short, human-readable summary of the problem. |

___

### ErrorResponse

Ƭ **ErrorResponse**: [`HttpResponse`](index.md#httpresponse) & { `data?`: `never` ; `errors`: [`ErrorDetail`](index.md#errordetail)[]  }

HTTP Response with errors

___

### GetExchangeOptions

Ƭ **GetExchangeOptions**: `Object`

options passed to [TbdexHttpClient.getExchange](classes/TbdexHttpClient.md#getexchange) method

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `exchangeId` | `string` | the exchange you want to fetch |
| `kid` | `string` | - |
| `pfiDid` | `string` | the DID of the PFI from whom you want to get offerings |
| `privateKeyJwk` | `Web5PrivateKeyJwk` | the private key used to sign the bearer token |

___

### GetExchangesOptions

Ƭ **GetExchangesOptions**: `Object`

options passed to [TbdexHttpClient.getExchanges](classes/TbdexHttpClient.md#getexchanges) method

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | { `exchangeId`: `string` \| `string`[]  } | - |
| `filter.exchangeId` | `string` \| `string`[] | - |
| `kid` | `string` | - |
| `pfiDid` | `string` | the DID of the PFI from whom you want to get offerings |
| `privateKeyJwk` | `Web5PrivateKeyJwk` | - |

___

### GetOfferingsOptions

Ƭ **GetOfferingsOptions**: `Object`

options passed to [TbdexHttpClient.getOfferings](classes/TbdexHttpClient.md#getofferings) method

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | { `id?`: `ResourceMetadata`<`any`\>[``"id"``] ; `payinCurrency?`: `OfferingData`[``"payinCurrency"``][``"currencyCode"``] ; `payoutCurrency?`: `OfferingData`[``"payoutCurrency"``][``"currencyCode"``]  } | - |
| `filter.id?` | `ResourceMetadata`<`any`\>[``"id"``] | - |
| `filter.payinCurrency?` | `OfferingData`[``"payinCurrency"``][``"currencyCode"``] | ISO 3166 currency code string |
| `filter.payoutCurrency?` | `OfferingData`[``"payoutCurrency"``][``"currencyCode"``] | ISO 3166 currency code string |
| `pfiDid` | `string` | the DID of the PFI from whom you want to get offerings |

___

### HttpResponse

Ƭ **HttpResponse**: `Object`

HTTP Response

#### Type declaration

| Name | Type |
| :------ | :------ |
| `headers` | `Headers` |
| `status` | `number` |

___

### SendMessageOptions

Ƭ **SendMessageOptions**<`T`\>: `Object`

options passed to [TbdexHttpClient.sendMessage](classes/TbdexHttpClient.md#sendmessage) method

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `MessageKind` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Message`<`T`\> \| `MessageModel`<`T`\> | the message you want to send |
