---
id: "web5_dids.IonCreateRequestModel"
title: "Interface: IonCreateRequestModel"
sidebar_label: "@web5/dids.IonCreateRequestModel"
custom_edit_url: null
---

[@web5/dids](../modules/web5_dids.md).IonCreateRequestModel

Data model representing a public key in the DID Document.

## Properties

### delta

• **delta**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `patches` | { `action`: `string` ; `document`: `default`  }[] |
| `updateCommitment` | `string` |

#### Defined in

[did-ion.ts:51](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L51)

___

### suffixData

• **suffixData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deltaHash` | `string` |
| `recoveryCommitment` | `string` |

#### Defined in

[did-ion.ts:47](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L47)

___

### type

• **type**: `OperationType`

#### Defined in

[did-ion.ts:46](https://github.com/TBD54566975/web5-js/blob/ff920f5/packages/dids/src/did-ion.ts#L46)
