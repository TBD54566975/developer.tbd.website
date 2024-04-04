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
  const mavenDependencies =
    languageDependencies.find(({ language }) => language === 'maven')
      ?.dependencies || [];
  const gradleDependencies =
    languageDependencies.find(({ language }) => language === 'gradle')
      ?.dependencies || [];

  return (
    <>
      <LanguageTabBar />
      <LanguageSwitchBlock>
        {languageDependencies.map(({ language, dependencies }) => {
          if (language === 'maven' || language === 'gradle') {
            return (
              <div key={language} language={languageMap[language]}>
                <KotlinDependencies
                  mavenDependencies={mavenDependencies}
                  gradleDependencies={gradleDependencies}
                />
              </div>
            );
          } else {
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

function KotlinDependencies({ mavenDependencies, gradleDependencies }) {
  const kotlinDependencies = [
    <Dependency
      key="Gradle"
      language="gradle"
      dependencies={gradleDependencies}
    />,
    <Dependency
      key="Maven"
      language="maven"
      dependencies={mavenDependencies}
    />,
  ];
  return <BreadcrumbTab dependencies={kotlinDependencies} />;
}

export default Dependencies;
