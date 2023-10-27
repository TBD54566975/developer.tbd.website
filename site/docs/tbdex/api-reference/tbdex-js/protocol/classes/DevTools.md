Utility functions for testing purposes

## Constructors

### constructor

• **new DevTools**()

## Methods

### createCredential

▸ `Static` **createCredential**(`opts`): `Promise`<{ `credential`: { `@context`: `string`[] ; `credentialSubject`: { `id`: `string` = opts.subject } ; `id`: `string` ; `issuanceDate`: `string` ; `issuer`: `string` = opts.issuer.did; `type`: `string`[]  } ; `signedCredential`: `string`  }\>

creates a verifiable credential using the options provided. This method is intended for testing purposes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`CreateCredentialOptions`](../index.md#createcredentialoptions) | options used to create the credential |

#### Returns

`Promise`<{ `credential`: { `@context`: `string`[] ; `credentialSubject`: { `id`: `string` = opts.subject } ; `id`: `string` ; `issuanceDate`: `string` ; `issuer`: `string` = opts.issuer.did; `type`: `string`[]  } ; `signedCredential`: `string`  }\>

___

### createDid

▸ `Static` **createDid**(`didMethod?`): `Promise`<`PortableDid`\>

creates and returns a DID

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `didMethod` | [`DidMethodOptions`](../index.md#didmethodoptions) | `'key'` | the type of DID to create. defaults to did:key |

#### Returns

`Promise`<`PortableDid`\>

___

### createJwt

▸ `Static` **createJwt**(`opts`): `Promise`<`string`\>

Creates a JWT using the options provided.
It's signed with the issuer's first verification method private key JWK

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`CreateJwtOptions`](../index.md#createjwtoptions) | options used to create the JWT |

#### Returns

`Promise`<`string`\>

a compact JWT

___

### createOffering

▸ `Static` **createOffering**(): [`Offering`](Offering.md)

creates and returns an example offering. Useful for testing purposes

#### Returns

[`Offering`](Offering.md)

___

### createRfq

▸ `Static` **createRfq**(`opts`): `Promise`<[`Rfq`](Rfq.md)\>

creates and returns an example rfq for the offering returned by [DevTools.createOffering](DevTools.md#createoffering).
Useful for testing purposes.

**NOTE**: generates a random credential that fulfills the offering's required claims

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`RfqOptions`](../index.md#rfqoptions) |

#### Returns

`Promise`<[`Rfq`](Rfq.md)\>

___

### decodeJwt

▸ `Static` **decodeJwt**(`compactJwt`): `Object`

convenience method that can be used to decode a COMPACT JWT

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `compactJwt` | `any` | the JWT to decode |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `base64urlEncodedSignature` | `any` |
| `header` | `object` |
| `payload` | `object` |
