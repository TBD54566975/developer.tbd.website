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
        {snippets.map(({ name, language }) => (
          <div key={`ref-${language}`} language={language}>
            <CodeSnippet
              functionName={name}
              language={language.toLowerCase()}
            />
          </div>
        ))}

        {inlineSnippets &&
          inlineSnippets.map(({ code, language }) => (
            <div key={`inline-${language}`} language={language}>
              <CodeBlock language={language.toLowerCase()}>
                {code.trim()}
              </CodeBlock>
            </div>
          ))}
      </LanguageSwitchBlock>
    </>
  );
};

export default Shnip;
