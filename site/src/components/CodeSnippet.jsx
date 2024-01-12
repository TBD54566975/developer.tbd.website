import React from 'react';
import CodeBlock from '@theme/CodeBlock';

const CodeSnippet = ({ snippet, language = 'javascript' }) => {
  console.log("snippet", snippet)
  if (!snippet) {
    return <p>Error: Code snippet not found.</p>;
  }

  return (
    <CodeBlock language={language}>
      {snippet}
    </CodeBlock>
  );
};

export default CodeSnippet;
