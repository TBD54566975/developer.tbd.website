# Interface: IonCreateRequestModel

Data model representing a public key in the DID Document.

## Table of contents

### Properties

- [delta](IonCreateRequestModel.md#delta)
- [suffixData](IonCreateRequestModel.md#suffixdata)
- [type](IonCreateRequestModel.md#type)

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
