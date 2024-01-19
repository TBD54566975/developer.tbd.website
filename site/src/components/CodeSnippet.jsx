import React from 'react';
import codeSnippets from '../../src/util/code-snippets-map.json'; // Import for old system
import CodeBlock from '@theme/CodeBlock';

const CodeSnippet = ({
  functionName,
  importString,
  snippet,
  language = 'javascript',
}) => {
  let finalSnippet;

  // Check if using old system
  if (functionName) {
    const oldSnippet = codeSnippets[functionName];
    if (!oldSnippet) {
      return <p>Error: Code snippet not found for {functionName}.</p>;
    }
    finalSnippet = importString
      ? `${importString}\n\n${oldSnippet}`
      : oldSnippet;
  } else {
    // Using new system
    if (!snippet) {
      return <p>Error: Code snippet not found.</p>;
    }
    finalSnippet = snippet;
  }

  return <CodeBlock language={language}>{finalSnippet}</CodeBlock>;
};

export default CodeSnippet;
