import React from 'react';
import Dependency from './Dependency';
import LanguageTabBar from './language/LanguageTabBar';
import LanguageSwitchBlock from './language/LanguageSwitchBlock';
import BreadcrumbTab from './BreadcrumbTab';

const languageMap = {
  kotlin: 'Kotlin',
  javascript: 'JavaScript',
  gradle: 'Kotlin',
  maven: 'Kotlin',
  swift: 'Swift',
};

function Dependencies({ languageDependencies }) {
  return (
    <>
      <LanguageTabBar />
      <LanguageSwitchBlock>
        {languageDependencies.map(({ language, dependencies }) => {
          if (language === 'maven' || language === 'gradle') {
            return (
              <div key={language} language={languageMap[language]}>
                <KotlinDependencies dependencies={dependencies} />
              </div>
            );
          } else {
            console.log('language', language)
            return (
              <div language={languageMap[language]}>
                <Dependency language={language} dependencies={dependencies} />
              </div>
            );
          }
        })}
      </LanguageSwitchBlock>
    </>
  );
}

function KotlinDependencies({ dependencies }) {

  const kotlinDependencies = [
    <Dependency key="Gradle" language="gradle" dependencies={dependencies} />,
    <Dependency key="Maven" language="maven" dependencies={dependencies} />,
  ];
  return <BreadcrumbTab dependencies={kotlinDependencies} />;
}

export default Dependencies;
