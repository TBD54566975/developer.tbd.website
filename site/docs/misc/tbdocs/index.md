tbdocs-action

# tbdocs-action

## Table of contents

### Interfaces

- [DocsReport](interfaces/DocsReport.md)
- [ReportMessage](interfaces/ReportMessage.md)

### Type Aliases

- [DocsGeneratorType](index.md#docsgeneratortype)
- [DocsReporterType](index.md#docsreportertype)
- [MessageCategory](index.md#messagecategory)
- [MessageLevel](index.md#messagelevel)

### Functions

- [generateDocs](index.md#generatedocs)
- [run](index.md#run)
- [runDocsReport](index.md#rundocsreport)

## Type Aliases

### DocsGeneratorType

Ƭ **DocsGeneratorType**: ``"typedoc-markdown"``

___

### DocsReporterType

Ƭ **DocsReporterType**: ``"api-extractor"``

___

### MessageCategory

Ƭ **MessageCategory**: ``"compiler"`` \| ``"docs"`` \| ``"extractor"`` \| ``"unknown"``

___

### MessageLevel

Ƭ **MessageLevel**: ``"error"`` \| ``"warning"`` \| ``"info"`` \| ``"verbose"`` \| ``"none"``

## Functions

### generateDocs

▸ **generateDocs**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### run

▸ **run**(): `Promise`<`void`\>

The main function for the action.

#### Returns

`Promise`<`void`\>

`Promise<void>` Resolves when the action is complete.

___

### runDocsReport

▸ **runDocsReport**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
