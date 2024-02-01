import React from 'react';
import LanguageSwitchBlock from '@site/src/components/language/LanguageSwitchBlock';
import LanguageTabBar from '@site/src/components/language/LanguageTabBar';
import CodeSnippet from '@site/src/components/CodeSnippet';
import CodeBlock from '@theme/CodeBlock';

const Shnip = ({ snippets, inlineSnippets }) => {
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
          snippets.map(({ snippetContent, language, title }) => (
            <div key={`ref-${language}`} language={language}>
              <CodeSnippet
                snippet={snippetContent}
                language={language.toLowerCase()}
                title={title}
              />
            </div>
          ))}

        {inlineSnippets &&
          inlineSnippets.map(
            ({ code, language, codeLanguage, title, breakLineAt }) => (
              <div key={`inline-${language}`} language={language}>
                <CodeBlock
                  // parse as specified language such as bash OR parse as language from tab
                  language={(codeLanguage || language).toLowerCase()}
                  title={title}
                >
                  {addLineBreaks(code, breakLineAt)}
                </CodeBlock>
              </div>
            ),
          )}
      </LanguageSwitchBlock>
    </>
  );
};
export default Shnip;