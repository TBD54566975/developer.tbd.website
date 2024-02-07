import React from 'react';
import LanguageSwitchBlock from '@site/src/components/language/LanguageSwitchBlock';
import LanguageTabBar from '@site/src/components/language/LanguageTabBar';
import CodeSnippet from '@site/src/components/CodeSnippet';
import CodeBlock from '@theme/CodeBlock';
import ReactMarkdown from 'react-markdown';

const Shnip = ({ snippets, inlineSnippets }) => {
  // support line breaks for inline code snippets
  const addLineBreaks = (code, breakLines) => {
    if (!breakLines || breakLines.length === 0) {
      return code;
    }

    const lines = code.split('\n');
    breakLines.forEach((lineNumber) => {
      if (lineNumber < lines.length) {
        lines[lineNumber] += '\n';
      }
    });

    return lines.join('\n');
  };

  return (
    <>
      <LanguageTabBar />
      <LanguageSwitchBlock>
        {snippets &&
          snippets.map(
            ({ snippetContent, language, title, content }, index) => (
              <div key={`snippet-${language}-${index}`} language={language}>
                {content && <ReactMarkdown>{content}</ReactMarkdown>}
                <CodeSnippet
                  snippet={snippetContent}
                  language={language.toLowerCase()}
                  title={title}
                />
              </div>
            ),
          )}

        {inlineSnippets &&
          inlineSnippets.map(
            ({ content, code, language, codeLanguage, breakLineAt, title }, index) => (
              <div key={`inline-${language}-${index}`} language={language}>
                {content && <ReactMarkdown>{content}</ReactMarkdown>}
                {code && <CodeBlock
                  language={(codeLanguage || language).toLowerCase()}
                  title={title}
                >
                  {addLineBreaks(code, breakLineAt)}
                </CodeBlock>}
              </div>
            ),
          )}
      </LanguageSwitchBlock>
    </>
  );
};
export default Shnip;