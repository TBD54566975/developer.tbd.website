import React from 'react';
import codeSnippets from '../../../code-snippets-map.json';
import CodeBlock from '@theme/CodeBlock';

const CodeSnippet = ({ functionName }) => {
  const snippet = codeSnippets[functionName];

  if (!snippet) {
    return <p>Error: Code snippet not found for {functionName}.</p>;
  }

  return <CodeBlock language="js">{snippet}</CodeBlock>;
};

export default CodeSnippet;
