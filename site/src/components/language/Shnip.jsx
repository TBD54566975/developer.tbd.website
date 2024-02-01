import React from 'react';
import LanguageSwitchBlock from '@site/src/components/language/LanguageSwitchBlock';
import LanguageTabBar from '@site/src/components/language/LanguageTabBar';
import CodeSnippet from '@site/src/components/CodeSnippet';
import CodeBlock from '@theme/CodeBlock';
import ReactMarkdown from 'react-markdown';

const Shnip = ({ snippets, inlineSnippets, inlineContent }) => {
  // support line breaks for inline code snippets
const addLineBreaks = (code, breakLines) => {
  if (!breakLines || breakLines.length === 0) {
    return code.trim();
  }
  let lines = code.trim().split('\n');
  if (lines[0] === '') {
    lines.shift();
    breakLines = breakLines.map((line) => line - 1); 
  }
  breakLines.forEach((lineNumber) => {
    let adjustedLineNumber = lineNumber - 1;
    if (adjustedLineNumber >= 0 && adjustedLineNumber < lines.length) {
      lines[adjustedLineNumber] += '\n';
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
                {code &&
                  <CodeBlock
                    title={title}
                    language={(codeLanguage || language).toLowerCase()}
                  >
                  {addLineBreaks(code, breakLineAt)}
                </CodeBlock>}
              </div>
            ),
          )}

        {inlineContent &&
          inlineContent.map(({ content, language }, index) => (
            <div key={`content-${language}-${index}`} language={language}>
              {content}
            </div>
          ))}
      </LanguageSwitchBlock>
    </>
  );
};
export default Shnip;