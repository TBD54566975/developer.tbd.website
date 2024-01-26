The report message.

## Properties

### category

• **category**: [`MessageCategory`](../index.md#messagecategory)

The category of the message.

___

### context

• `Optional` **context**: `string`

The context of the issue, such as the name of the exported symbol.

___

### level

• **level**: [`MessageLevel`](../index.md#messagelevel)

The level of the message. You should never ignore errors if
you want to keep your docs in good shape.

___

### messageId

• **messageId**: `string`

The ID of the issue

___

### sourceFileColumn

• `Optional` **sourceFileColumn**: `number`

The column number in the source file where the issue was found.

___

### sourceFileLine

• `Optional` **sourceFileLine**: `number`

The line number in the source file where the issue was found.

___

### sourceFilePath

• `Optional` **sourceFilePath**: `string`

The source file path where the issue was found.

___

### text

• **text**: `string`

The prettified text of the message.
