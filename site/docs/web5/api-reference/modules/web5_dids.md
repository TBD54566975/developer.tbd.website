---
id: "web5_dids"
title: "Module: @web5/dids"
sidebar_label: "@web5/dids"
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [utils](../namespaces/web5_dids.utils.md)

## Classes

- [DidIonMethod](../classes/web5_dids.DidIonMethod.md)
- [DidKeyMethod](../classes/web5_dids.DidKeyMethod.md)
- [DidResolver](../classes/web5_dids.DidResolver.md)
- [DidResolverCacheLevel](../classes/web5_dids.DidResolverCacheLevel.md)

## Interfaces

- [DidMethod](../interfaces/web5_dids.DidMethod.md)
- [DidMethodApi](../interfaces/web5_dids.DidMethodApi.md)
- [DidMethodOperator](../interfaces/web5_dids.DidMethodOperator.md)
- [DidMethodResolver](../interfaces/web5_dids.DidMethodResolver.md)
- [DidResolutionOptions](../interfaces/web5_dids.DidResolutionOptions.md)
- [DidServiceEndpoint](../interfaces/web5_dids.DidServiceEndpoint.md)
- [DwnServiceEndpoint](../interfaces/web5_dids.DwnServiceEndpoint.md)
- [IonCreateRequestModel](../interfaces/web5_dids.IonCreateRequestModel.md)
- [PortableDid](../interfaces/web5_dids.PortableDid.md)

## Type Aliases

### DidDocument

Ƭ **DidDocument**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@context?` | ``"https://www.w3.org/ns/did/v1"`` \| `string` \| `string`[] |
| `alsoKnownAs?` | `string`[] |
| `assertionMethod?` | [`VerificationMethod`](web5_dids.md#verificationmethod)[] \| `string`[] |
| `authentication?` | [`VerificationMethod`](web5_dids.md#verificationmethod)[] \| `string`[] |
| `capabilityDelegation?` | [`VerificationMethod`](web5_dids.md#verificationmethod)[] \| `string`[] |
| `capabilityInvocation?` | [`VerificationMethod`](web5_dids.md#verificationmethod)[] \| `string`[] |
| `controller?` | `string` \| `string`[] |
| `id` | `string` |
| `keyAgreement?` | [`VerificationMethod`](web5_dids.md#verificationmethod)[] \| `string`[] |
| `service?` | [`DidService`](web5_dids.md#didservice)[] |
| `verificationMethod?` | [`VerificationMethod`](web5_dids.md#verificationmethod)[] |

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
| `keySet` | [`DidIonKeySet`](web5_dids.md#didionkeyset) |
| `operationsEndpoint?` | `string` |
| `services` | [`DidService`](web5_dids.md#didservice)[] |

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
| `keySet?` | [`DidIonKeySet`](web5_dids.md#didionkeyset) |
| `services?` | [`DidService`](web5_dids.md#didservice)[] |

#### Defined in

[did-ion.ts:22](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L22)

___

### DidIonKeySet

Ƭ **DidIonKeySet**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `recoveryKey?` | [`JwkKeyPair`](web5_crypto.md#jwkkeypair) |
| `updateKey?` | [`JwkKeyPair`](web5_crypto.md#jwkkeypair) |
| `verificationMethodKeys?` | [`DidKeySetVerificationMethodKey`](web5_dids.md#didkeysetverificationmethodkey)[] |

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
| `publicKeyFormat?` | [`DidVerificationMethodType`](web5_dids.md#didverificationmethodtype) |

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
| `keySet?` | [`DidKeyKeySet`](web5_dids.md#didkeykeyset) |
| `publicKeyFormat?` | [`DidVerificationMethodType`](web5_dids.md#didverificationmethodtype) |

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
| `verificationMethodKeys?` | [`DidKeySetVerificationMethodKey`](web5_dids.md#didkeysetverificationmethodkey)[] |

#### Defined in

[did-key.ts:76](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-key.ts#L76)

___

### DidKeySet

Ƭ **DidKeySet**: [`DidKeyKeySet`](web5_dids.md#didkeykeyset) \| [`DidIonKeySet`](web5_dids.md#didionkeyset)

#### Defined in

[types.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L46)

___

### DidKeySetVerificationMethodKey

Ƭ **DidKeySetVerificationMethodKey**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyManagerId?` | `string` | Unique identifier for the key in the KeyManager store. |
| `privateKeyJwk?` | [`PrivateKeyJwk`](web5_crypto.md#privatekeyjwk) | - |
| `publicKeyJwk?` | [`PublicKeyJwk`](web5_crypto.md#publickeyjwk) | - |
| `relationships` | [`VerificationRelationship`](web5_dids.md#verificationrelationship)[] | - |

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
| `didDocument?` | [`DidDocument`](web5_dids.md#diddocument) |
| `didDocumentMetadata` | [`DidDocumentMetadata`](web5_dids.md#diddocumentmetadata) |
| `didResolutionMetadata` | [`DidResolutionMetadata`](web5_dids.md#didresolutionmetadata) |

#### Defined in

[types.ts:173](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/types.ts#L173)

___

### DidResolverCache

Ƭ **DidResolverCache**: `KeyValueStore`<`string`, [`DidResolutionResult`](web5_dids.md#didresolutionresult) \| `void`\>

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
| `cache?` | [`DidResolverCache`](web5_dids.md#didresolvercache) |
| `didResolvers` | [`DidMethodResolver`](../interfaces/web5_dids.DidMethodResolver.md)[] |

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
| `serviceEndpoint` | `string` \| [`DidServiceEndpoint`](../interfaces/web5_dids.DidServiceEndpoint.md) \| [`DidServiceEndpoint`](../interfaces/web5_dids.DidServiceEndpoint.md)[] |
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
| `publicKeyJwk?` | [`PublicKeyJwk`](web5_crypto.md#publickeyjwk) |
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

• `Const` **DidResolverCacheNoop**: [`DidResolverCache`](web5_dids.md#didresolvercache)

no-op cache that is used as the default cache for did-resolver.
The motivation behind using a no-op cache as the default stems from
the desire to maximize the potential for this library to be used
in as many JS runtimes as possible

#### Defined in

[resolver-cache-noop.ts:9](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/resolver-cache-noop.ts#L9)
