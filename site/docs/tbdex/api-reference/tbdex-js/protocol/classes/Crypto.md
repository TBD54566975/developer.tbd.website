Cryptographic utility functions, such as hashing, signing, and verifying

## Constructors

### constructor

• **new Crypto**()

## Properties

### crvToAlgMap

▪ `Static` **crvToAlgMap**: `Object`

map of named curves to cryptographic algorithms. Necessary for JWS/JWK

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Ed25519` | `string` |
| `secp256k1` | `string` |

___

### signers

▪ `Static` **signers**: `Object`

supported cryptographic algorithms

#### Index signature

▪ [alg: `string`]: `SignerValue`<`Web5Crypto.EcdsaOptions` \| `Web5Crypto.EdDsaOptions`\>

## Methods

### hash

▸ `Static` **hash**(`payload`): `string`

hashes the payload provided in the following manner:
base64url(
 sha256(
   cbor(payload)
 )
)
TODO: add link to tbdex protocol hash section

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `any` | the payload to hash |

#### Returns

`string`

___

### sign

▸ `Static` **sign**(`opts`): `Promise`<`string`\>

signs the payload provided as a compact JWS

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`SignOptions`](../index.md#signoptions) | signing options |

#### Returns

`Promise`<`string`\>

___

### verify

▸ `Static` **verify**(`opts`): `Promise`<`string`\>

verifies the cryptographic integrity of the message or resource's signature

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`VerifyOptions`](../index.md#verifyoptions) | verification options |

#### Returns

`Promise`<`string`\>

**`Throws`**

if no signature present on the message or resource

**`Throws`**

if the signature is not a valid compact JWS

**`Throws`**

if the JWS' content is not detached

**`Throws`**

if the JWS header does not contain alg and kid

**`Throws`**

if DID in kid of JWS header does not match metadata.from

**`Throws`**

if signer's DID cannot be resolved

**`Throws`**

if signer's DID Document does not have the necessary verification method

**`Throws`**

if the verification method does not include a publicKeyJwk
