import React from 'react';
import LanguageSwitchBlock from '@site/src/components/language/LanguageSwitchBlock';
import LanguageTabBar from '@site/src/components/language/LanguageTabBar';
import CodeSnippet from '@site/src/components/CodeSnippet';
import CodeBlock from '@theme/CodeBlock';

const Shnip = ({ snippets, inlineSnippets }) => {
  return (
    <>
      <LanguageTabBar />
      <LanguageSwitchBlock>
        {snippets.map(({ functionName, language }) => (
          <div key={`ref-${functionName}`} language={language}>
            <CodeSnippet functionName={functionName} />
          </div>
        ))}

        {inlineSnippets &&
          inlineSnippets.map(({ code, language }) => (
            <div key={`inline-${language}`} language={language}>
              <CodeBlock language={language}>{code.trim()}</CodeBlock>
            </div>
          ))}
      </LanguageSwitchBlock>
    </>
  );
};

export default Shnip;
