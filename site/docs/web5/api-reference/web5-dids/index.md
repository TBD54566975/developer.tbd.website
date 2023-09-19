# @web5/dids - v0.2.0

## Table of contents

### Namespaces

- [utils](modules/utils.md)

### Classes

- [DidIonMethod](classes/DidIonMethod.md)
- [DidKeyMethod](classes/DidKeyMethod.md)
- [DidResolver](classes/DidResolver.md)
- [DidResolverCacheLevel](classes/DidResolverCacheLevel.md)

### Interfaces

- [DidMethod](interfaces/DidMethod.md)
- [DidMethodApi](interfaces/DidMethodApi.md)
- [DidMethodOperator](interfaces/DidMethodOperator.md)
- [DidMethodResolver](interfaces/DidMethodResolver.md)
- [DidResolutionOptions](interfaces/DidResolutionOptions.md)
- [DidServiceEndpoint](interfaces/DidServiceEndpoint.md)
- [DwnServiceEndpoint](interfaces/DwnServiceEndpoint.md)
- [IonCreateRequestModel](interfaces/IonCreateRequestModel.md)
- [PortableDid](interfaces/PortableDid.md)

### Type Aliases

- [DidDocument](index.md#diddocument)
- [DidDocumentMetadata](index.md#diddocumentmetadata)
- [DidIonAnchorOptions](index.md#didionanchoroptions)
- [DidIonCreateOptions](index.md#didioncreateoptions)
- [DidIonKeySet](index.md#didionkeyset)
- [DidKeyCreateDocumentOptions](index.md#didkeycreatedocumentoptions)
- [DidKeyCreateOptions](index.md#didkeycreateoptions)
- [DidKeyDeriveEncryptionKeyResult](index.md#didkeyderiveencryptionkeyresult)
- [DidKeyIdentifier](index.md#didkeyidentifier)
- [DidKeyKeySet](index.md#didkeykeyset)
- [DidKeySet](index.md#didkeyset)
- [DidKeySetVerificationMethodKey](index.md#didkeysetverificationmethodkey)
- [DidMetadata](index.md#didmetadata)
- [DidResolutionMetadata](index.md#didresolutionmetadata)
- [DidResolutionResult](index.md#didresolutionresult)
- [DidResolverCache](index.md#didresolvercache)
- [DidResolverCacheOptions](index.md#didresolvercacheoptions)
- [DidResolverOptions](index.md#didresolveroptions)
- [DidService](index.md#didservice)
- [DidVerificationMethodType](index.md#didverificationmethodtype)
- [VerificationMethod](index.md#verificationmethod)
- [VerificationRelationship](index.md#verificationrelationship)

### Variables

- [DidResolverCacheNoop](index.md#didresolvercachenoop)

## Type Aliases

### DidDocument

Ƭ **DidDocument**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@context?` | ``"https://www.w3.org/ns/did/v1"`` \| `string` \| `string`[] |
| `alsoKnownAs?` | `string`[] |
| `assertionMethod?` | [`VerificationMethod`](index.md#verificationmethod)[] \| `string`[] |
| `authentication?` | [`VerificationMethod`](index.md#verificationmethod)[] \| `string`[] |
| `capabilityDelegation?` | [`VerificationMethod`](index.md#verificationmethod)[] \| `string`[] |
| `capabilityInvocation?` | [`VerificationMethod`](index.md#verificationmethod)[] \| `string`[] |
| `controller?` | `string` \| `string`[] |
| `id` | `string` |
| `keyAgreement?` | [`VerificationMethod`](index.md#verificationmethod)[] \| `string`[] |
| `service?` | [`DidService`](index.md#didservice)[] |
| `verificationMethod?` | [`VerificationMethod`](index.md#verificationmethod)[] |

#### Defined in

[types.ts:7](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L7)

___

### DidDocumentMetadata

Ƭ **DidDocumentMetadata**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `canonicalId?` | `string` |
| `created?` | `string` |
| `deactivated?` | `boolean` |
| `equivalentId?` | `string` |
| `nextUpdate?` | `string` |
| `nextVersionId?` | `string` |
| `updated?` | `string` |
| `versionId?` | `string` |

#### Defined in

[types.ts:21](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L21)

___

### DidIonAnchorOptions

Ƭ **DidIonAnchorOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `challengeEnabled?` | `boolean` |
| `challengeEndpoint?` | `string` |
| `keySet` | [`DidIonKeySet`](index.md#didionkeyset) |
| `operationsEndpoint?` | `string` |
| `services` | [`DidService`](index.md#didservice)[] |

#### Defined in

[did-ion.ts:14](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L14)

___

### DidIonCreateOptions

Ƭ **DidIonCreateOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `anchor?` | `boolean` |
| `keyAlgorithm?` | typeof `SupportedCryptoAlgorithms`[`number`] |
| `keySet?` | [`DidIonKeySet`](index.md#didionkeyset) |
| `services?` | [`DidService`](index.md#didservice)[] |

#### Defined in

[did-ion.ts:22](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L22)

___

### DidIonKeySet

Ƭ **DidIonKeySet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `recoveryKey?` | `JwkKeyPair` |
| `updateKey?` | `JwkKeyPair` |
| `verificationMethodKeys?` | [`DidKeySetVerificationMethodKey`](index.md#didkeysetverificationmethodkey)[] |

#### Defined in

[did-ion.ts:29](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L29)

___

### DidKeyCreateDocumentOptions

Ƭ **DidKeyCreateDocumentOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultContext?` | `string` |
| `did` | `string` |
| `enableEncryptionKeyDerivation?` | `boolean` |
| `enableExperimentalPublicKeyTypes?` | `boolean` |
| `publicKeyFormat?` | [`DidVerificationMethodType`](index.md#didverificationmethodtype) |

#### Defined in

[did-key.ts:55](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L55)

___

### DidKeyCreateOptions

Ƭ **DidKeyCreateOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enableEncryptionKeyDerivation?` | `boolean` |
| `keyAlgorithm?` | typeof `SupportedCryptoAlgorithms`[`number`] |
| `keySet?` | [`DidKeyKeySet`](index.md#didkeykeyset) |
| `publicKeyFormat?` | [`DidVerificationMethodType`](index.md#didverificationmethodtype) |

#### Defined in

[did-key.ts:48](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L48)

___

### DidKeyDeriveEncryptionKeyResult

Ƭ **DidKeyDeriveEncryptionKeyResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `Uint8Array` |
| `multicodecCode` | `number` |

#### Defined in

[did-key.ts:63](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L63)

___

### DidKeyIdentifier

Ƭ **DidKeyIdentifier**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fragment` | `string` |
| `method` | `string` |
| `multibaseValue` | `string` |
| `scheme` | `string` |
| `version` | `string` |

#### Defined in

[did-key.ts:68](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L68)

___

### DidKeyKeySet

Ƭ **DidKeyKeySet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `verificationMethodKeys?` | [`DidKeySetVerificationMethodKey`](index.md#didkeysetverificationmethodkey)[] |

#### Defined in

[did-key.ts:76](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L76)

___

### DidKeySet

Ƭ **DidKeySet**: [`DidKeyKeySet`](index.md#didkeykeyset) \| [`DidIonKeySet`](index.md#didionkeyset)

#### Defined in

[types.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L46)

___

### DidKeySetVerificationMethodKey

Ƭ **DidKeySetVerificationMethodKey**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyManagerId?` | `string` | Unique identifier for the key in the KeyManager store. |
| `privateKeyJwk?` | `PrivateKeyJwk` | - |
| `publicKeyJwk?` | `PublicKeyJwk` | - |
| `relationships` | [`VerificationRelationship`](index.md#verificationrelationship)[] | - |

#### Defined in

[types.ts:48](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L48)

___

### DidMetadata

Ƭ **DidMetadata**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[types.ts:56](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L56)

___

### DidResolutionMetadata

Ƭ **DidResolutionMetadata**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contentType?` | `string` |
| `error?` | ``"internalError"`` \| ``"invalidDid"`` \| ``"methodNotSupported"`` \| ``"notFound"`` \| ``"representationNotSupported"`` \| `string` |

#### Defined in

[types.ts:120](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L120)

___

### DidResolutionResult

Ƭ **DidResolutionResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@context?` | ``"https://w3id.org/did-resolution/v1"`` \| `string` \| `string`[] |
| `didDocument?` | [`DidDocument`](index.md#diddocument) |
| `didDocumentMetadata` | [`DidDocumentMetadata`](index.md#diddocumentmetadata) |
| `didResolutionMetadata` | [`DidResolutionMetadata`](index.md#didresolutionmetadata) |

#### Defined in

[types.ts:173](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L173)

___

### DidResolverCache

Ƭ **DidResolverCache**: `KeyValueStore`<`string`, [`DidResolutionResult`](index.md#didresolutionresult) \| `void`\>

implement this interface to provide your own cache for did resolution results. can be plugged in through Web5 API

#### Defined in

[types.ts:183](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L183)

___

### DidResolverCacheOptions

Ƭ **DidResolverCacheOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `location?` | `string` |
| `ttl?` | `string` |

#### Defined in

[resolver-cache-level.ts:6](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-level.ts#L6)

___

### DidResolverOptions

Ƭ **DidResolverOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cache?` | [`DidResolverCache`](index.md#didresolvercache) |
| `didResolvers` | [`DidMethodResolver`](interfaces/DidMethodResolver.md)[] |

#### Defined in

[did-resolver.ts:11](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-resolver.ts#L11)

___

### DidService

Ƭ **DidService**: `Object`

Services are used in DID documents to express ways of communicating with the DID subject or associated entities.
A service can be any type of service the DID subject wants to advertise.

**`See`**

[https://www.w3.org/TR/did-core/#services](https://www.w3.org/TR/did-core/#services)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description?` | `string` |
| `id` | `string` |
| `serviceEndpoint` | `string` \| [`DidServiceEndpoint`](interfaces/DidServiceEndpoint.md) \| [`DidServiceEndpoint`](interfaces/DidServiceEndpoint.md)[] |
| `type` | `string` |

#### Defined in

[types.ts:98](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L98)

___

### DidVerificationMethodType

Ƭ **DidVerificationMethodType**: keyof typeof `VERIFICATION_METHOD_TYPES`

#### Defined in

[did-key.ts:35](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L35)

___

### VerificationMethod

Ƭ **VerificationMethod**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `controller` | `string` |
| `id` | `string` |
| `publicKeyJwk?` | `PublicKeyJwk` |
| `publicKeyMultibase?` | `string` |
| `type` | `string` |

#### Defined in

[types.ts:229](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L229)

___

### VerificationRelationship

Ƭ **VerificationRelationship**: ``"assertionMethod"`` \| ``"authentication"`` \| ``"keyAgreement"`` \| ``"capabilityDelegation"`` \| ``"capabilityInvocation"``

#### Defined in

[types.ts:243](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L243)

## Variables

### DidResolverCacheNoop

• `Const` **DidResolverCacheNoop**: [`DidResolverCache`](index.md#didresolvercache)

no-op cache that is used as the default cache for did-resolver.
The motivation behind using a no-op cache as the default stems from
the desire to maximize the potential for this library to be used
in as many JS runtimes as possible

#### Defined in

[resolver-cache-noop.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-noop.ts#L9)
