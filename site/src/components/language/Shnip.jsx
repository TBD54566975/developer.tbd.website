import React from 'react';
import LanguageSwitchBlock from '@site/src/components/language/LanguageSwitchBlock';
import LanguageTabBar from '@site/src/components/language/LanguageTabBar';
import CodeSnippet from '@site/src/components/CodeSnippet';
import CodeBlock from '@theme/CodeBlock';
import ReactMarkdown from 'react-markdown';
import BreadcrumbTab from '@site/src/components/BreadcrumbTab';

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
            ({ snippetContent, language, title, content, nestedSnippets, codeLanguage }, index) => (
              <div key={`snippet-${language}-${index}`} language={language}>
                {content && <div style={{ paddingTop: '29px' }}><ReactMarkdown>{content}</ReactMarkdown></div>}

                {/* Render Breadcrumbs if there are nestedSnippets */}
                {nestedSnippets &&
                  <BreadcrumbTab snippetMappings={
                      nestedSnippets.reduce((acc, current) => {
                        const key = Object.keys(current)[0]; // Get the key of the current object ('Gradle', 'Maven')
                        acc[key] = current[key]; // Assign the value of the current object to the accumulated object
                        return acc;
                      }, {})
                    }
                  />
                }
                {/* Render the CodeSnippet component if there are no nestedSnippets */}
                {!nestedSnippets &&
                  <CodeSnippet
                    snippet={snippetContent}
                    language={codeLanguage.toLowerCase() || language.toLowerCase()}
                    title={title}
                  />
                }
              </div>
            ),
          )}

        {inlineSnippets &&
          inlineSnippets.map(
            ({ content, code, language, codeLanguage, breakLineAt, title }, index) => (
              <div key={`inline-${language}-${index}`} language={language}>
                {content && <div style={{ paddingTop: '20px' }}><ReactMarkdown>{content}</ReactMarkdown></div>}
                {code && <CodeBlock
                  language={(codeLanguage.toLowerCase() || language).toLowerCase()}
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