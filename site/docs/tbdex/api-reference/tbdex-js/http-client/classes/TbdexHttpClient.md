HTTP client for interacting with TBDex PFIs

## Constructors

### constructor

• **new TbdexHttpClient**()

## Methods

### discoverPFIs

▸ `Static` **discoverPFIs**(): `Promise`<`any`\>

Discover PFIs that are anchored via did:ion. These have a type of "PFI" and an id of PFI.
You can then query the endpoints for offerings.

#### Returns

`Promise`<`any`\>

___

### generateRequestToken

▸ `Static` **generateRequestToken**(`privateKeyJwk`, `kid`): `Promise`<`string`\>

generates a jws to be used to authenticate GET requests

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKeyJwk` | `PrivateKeyJwk` | the key to sign with |
| `kid` | `string` | the kid to include in the jws header. used by the verifier to select the appropriate verificationMethod when dereferencing the signer's DID |

#### Returns

`Promise`<`string`\>

___

### getExchange

▸ `Static` **getExchange**(`opts`): `Promise`<[`ErrorResponse`](../index.md#errorresponse) \| [`DataResponse`](../index.md#dataresponse)<`MessageKindClass`[]\>\>

get a specific exchange from the pfi provided

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`GetExchangeOptions`](../index.md#getexchangeoptions) |

#### Returns

`Promise`<[`ErrorResponse`](../index.md#errorresponse) \| [`DataResponse`](../index.md#dataresponse)<`MessageKindClass`[]\>\>

___

### getExchanges

▸ `Static` **getExchanges**(`opts`): `Promise`<[`ErrorResponse`](../index.md#errorresponse) \| [`DataResponse`](../index.md#dataresponse)<`MessageKindClass`[][]\>\>

returns all exchanges created by requester

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`GetExchangesOptions`](../index.md#getexchangesoptions) |

#### Returns

`Promise`<[`ErrorResponse`](../index.md#errorresponse) \| [`DataResponse`](../index.md#dataresponse)<`MessageKindClass`[][]\>\>

___

### getOfferings

▸ `Static` **getOfferings**(`opts`): `Promise`<[`ErrorResponse`](../index.md#errorresponse) \| [`DataResponse`](../index.md#dataresponse)<`Offering`[]\>\>

gets offerings from the pfi provided

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`GetOfferingsOptions`](../index.md#getofferingsoptions) |

#### Returns

`Promise`<[`ErrorResponse`](../index.md#errorresponse) \| [`DataResponse`](../index.md#dataresponse)<`Offering`[]\>\>

___

### getPfiServiceEndpoint

▸ `Static` **getPfiServiceEndpoint**(`did`): `Promise`<`string` \| `DidServiceEndpoint` \| `DidServiceEndpoint`[]\>

returns the PFI service entry from the DID Doc of the DID provided

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `did` | `string` | the pfi's DID |

#### Returns

`Promise`<`string` \| `DidServiceEndpoint` \| `DidServiceEndpoint`[]\>

___

### sendMessage

▸ `Static` **sendMessage**<`T`\>(`opts`): `Promise`<[`HttpResponse`](../index.md#httpresponse) \| [`ErrorResponse`](../index.md#errorresponse)\>

sends the message provided to the intended recipient

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `MessageKind` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`SendMessageOptions`](../index.md#sendmessageoptions)<`T`\> | options |

#### Returns

`Promise`<[`HttpResponse`](../index.md#httpresponse) \| [`ErrorResponse`](../index.md#errorresponse)\>

**`Throws`**

if message verification fails

**`Throws`**

if recipient DID resolution fails

**`Throws`**

if recipient DID does not have a PFI service entry

___

### verify

▸ `Static` **verify**(`requestToken`): `Promise`<`string`\>

validates the bearer token and verifies the cryptographic signature

#### Parameters

| Name | Type |
| :------ | :------ |
| `requestToken` | `string` |

#### Returns

`Promise`<`string`\>

**`Throws`**

if the token is invalid

**`Throws`**

see @tbdex/protocol#Crypto.verify
