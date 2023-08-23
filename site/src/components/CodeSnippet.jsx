import React from 'react';
import codeSnippets from '../../src/util/code-snippets-map.json';
import CodeBlock from '@theme/CodeBlock';

const CodeSnippet = ({ functionName, importString }) => {
  const snippet = codeSnippets[functionName];

  if (!snippet) {
    return <p>Error: Code snippet not found for {functionName}.</p>;
  }

  return (
    <CodeBlock language="js">
      {importString ? `${importString}\n\n${snippet}` : snippet}
    </CodeBlock>
  );
};

export default CodeSnippet;
