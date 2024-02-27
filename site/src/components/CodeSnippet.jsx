import React, { useState, useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';
import codeSnippets from '../../src/util/code-snippets-map.json'; // Import for old system

// Define the language map for the new system
const languageExtensionMap = {
  javascript: 'js',
  kotlin: 'kt',
  swift: 'swift',
  bash: 'bash',
  dart: 'dart',
  go: 'go',
  gradle: 'gradle',
  xml: 'xml',
};

const CodeSnippet = ({
  functionName, // old system
  snippetName, // new system
  importString,
  snippet, // Direct snippet content for the old system
  language = 'javascript',
  title,
}) => {
  const [newSnippetContent, setNewSnippetContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // PLEASE LEAVE THE BELOW CODE HERE, WILL BE LOOKING INTO THIS IN THE FUTURE - Nick
    // const cache = {};

    // function importAll(r) {
    //   r.keys().forEach((key) => (cache[key] = r(key)));
    // }

    // importAll(require.context('../../snippets', true, /\.js$/));

    if (snippetName) {
      setError('');

      // Dynamically determine the directory based on the language
      const languageDir = languageExtensionMap[language] || language;

      try {
        // Use require.context to dynamically load the snippet for the new system
        const context = require.context(
          '../../snippets/',
          true,
          /\.snippet\.js$/,
        );
        const snippetPath = `./${languageDir}/${snippetName}.snippet.js`;
        const snippetModule = context(snippetPath);
        setNewSnippetContent(snippetModule.default);
      } catch (err) {
        console.error(
          `Failed to load snippet: ${snippetName} for language: ${language}`,
          err,
        );
        setError(
          `Code snippet "${snippetName}" not found for language "${language}".`,
        );
      }
    }
  }, [snippetName, language]);

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
  } else if (newSnippetContent) {
    // Using new system
    finalSnippet = newSnippetContent;
  } else if (!snippetName && !snippet) {
    // No valid snippet found
    return null;
  }

  return (
    <CodeBlock title={title} language={language}>
      {finalSnippet || snippet}
    </CodeBlock>
  );
};

export default CodeSnippet;
