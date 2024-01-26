---
title: 'tbdocs-action'
---

## Interfaces

- [DocsReport](interfaces/DocsReport.md)
- [ReportMessage](interfaces/ReportMessage.md)

## Type Aliases

### DocsGeneratorType

Ƭ **DocsGeneratorType**: ``"typedoc-markdown"`` \| ``"typedoc-html"``

The name of the tool used to parse the code docs
and generate markdown files.

**Supported generators:**
- Typescript: `typedoc-markdown`

**Future to-do work:**
- Kotlin: dokka
- etc...

___

### DocsReporterType

Ƭ **DocsReporterType**: ``"api-extractor"``

The name of the tool used to analyze the code docs
and generate a report.

**Supported reporters:**
- Typescript: `api-extractor`

**Future to-do work:**
- Kotlin: detekt
- etc...

___

### MessageCategory

Ƭ **MessageCategory**: ``"compiler"`` \| ``"docs"`` \| ``"extractor"`` \| ``"unknown"``

The category of the report message.

___

### MessageLevel

Ƭ **MessageLevel**: ``"error"`` \| ``"warning"`` \| ``"info"`` \| ``"verbose"`` \| ``"none"``

The level of the report message.

## Functions

### generateDocs

▸ **generateDocs**(`entryPoint`): `Promise`<`string`\>

Generates the markdown files for the docs and open a PR to the target repo

#### Parameters

| Name | Type |
| :------ | :------ |
| `entryPoint` | `EntryPoint` |

#### Returns

`Promise`<`string`\>

___

### generateReportMarkdown

▸ **generateReportMarkdown**(`entryPoints`): `Promise`<`string`\>

Formats the docs reporter results into a markdown summary and writes it to the
.tbdocs/docs-report.md file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `entryPoints` | `EntryPoint`[] |

#### Returns

`Promise`<`string`\>

___

### groupDocs

▸ **groupDocs**(`entryPoints`): `Promise`<`void`\>

Groups all the generated docs into a single docs folder

#### Parameters

| Name | Type |
| :------ | :------ |
| `entryPoints` | `EntryPoint`[] |

#### Returns

`Promise`<`void`\>

___

### run

▸ **run**(): `Promise`<`void`\>

The main function for the action.

#### Returns

`Promise`<`void`\>

`Promise<void>` resolves when the action is complete.

___

### runDocsReport

▸ **runDocsReport**(`entryPoint`, `changedFiles?`, `ignoreMessages?`): `Promise`<[`DocsReport`](interfaces/DocsReport.md)\>

Runs the docs reporter to extract any docs errors/mistakes and processes
the results by annotating the code files and creating a PR comment.

#### Parameters

| Name | Type |
| :------ | :------ |
| `entryPoint` | `EntryPoint` |
| `changedFiles?` | `FilesDiffsMap` |
| `ignoreMessages?` | `string`[] |

#### Returns

`Promise`<[`DocsReport`](interfaces/DocsReport.md)\>
