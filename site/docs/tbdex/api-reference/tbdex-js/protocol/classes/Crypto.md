Cryptographic utility functions, such as hashing, signing, and verifying

## Constructors

### constructor

• **new Crypto**()

## Properties

### algorithms

▪ `Static` **algorithms**: `Object`

supported cryptographic algorithms. keys are `${alg}:${crv}`.

#### Index signature

▪ [alg: `string`]: `SignerValue`<`Web5Crypto.EcdsaOptions` \| `Web5Crypto.EdDsaOptions`\>

## Methods

### digest

▸ `Static` **digest**(`payload`): `Uint8Array`

Computes a digest of the payload by:
* JSON serializing the payload as per [RFC-8785: JSON Canonicalization Scheme](https://www.rfc-editor.org/rfc/rfc8785)
* sha256 hashing the serialized payload

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `any` |

#### Returns

`Uint8Array`

The SHA-256 hash of the canonicalized payload, represented as a byte array.

___

### sign

▸ `Static` **sign**(`opts`): `Promise`<`string`\>

Signs the provided payload and produces a compact JSON Web Signature (JWS).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`SignOptions`](../index.md#signoptions) | The options required for signing. |

#### Returns

`Promise`<`string`\>

A promise that resolves to the generated compact JWS.

**`Throws`**

Will throw an error if the specified algorithm is not supported.

___

### verify

▸ `Static` **verify**(`opts`): `Promise`<`string`\>

Verifies the integrity of a message or resource's signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`VerifyOptions`](../index.md#verifyoptions) | The options required for verification. |

#### Returns

`Promise`<`string`\>

A promise that resolves to the DID of the signer if verification is successful.

**`Throws`**

Various errors related to invalid input or failed verification.
