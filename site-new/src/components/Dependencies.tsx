import React from "react";
import Dependency from "@site/src/components/Dependency";
import {
  LanguageSwitcher,
  LanguageContent,
} from "@site/src/components/LanguageSwitcher";
import BreadcrumbTab from "@site/src/components/BreadCrumbTab";

interface DependencyItem {
  language: string;
  dependencies: string[];
}

interface DependenciesProps {
  languageDependencies: DependencyItem[];
}

const languageMap: Record<string, string> = {
  kotlin: "Kotlin",
  javascript: "JavaScript",
  gradle: "Kotlin",
  maven: "Kotlin",
  swift: "Swift",
};

const Dependencies: React.FC<DependenciesProps> = ({
  languageDependencies,
}) => {
  const mavenDependencies =
    languageDependencies.find(({ language }) => language === "maven")
      ?.dependencies || [];
  const gradleDependencies =
    languageDependencies.find(({ language }) => language === "gradle")
      ?.dependencies || [];

  // Gather all language display names for the switcher (unique values only)
  const languages = Array.from(
    new Set(languageDependencies.map(({ language }) => languageMap[language])),
  );

  return (
    <>
      <LanguageSwitcher languages={languages}>
        {languages.map((mappedLanguage) => {
          const lowerCaseLanguage = mappedLanguage.toLowerCase();

          if (lowerCaseLanguage === "kotlin") {
            return (
              <LanguageContent
                key={lowerCaseLanguage}
                language={lowerCaseLanguage}
              >
                <KotlinDependencies
                  mavenDependencies={mavenDependencies}
                  gradleDependencies={gradleDependencies}
                />
              </LanguageContent>
            );
          } else {
            const { dependencies } = languageDependencies.find(
              ({ language }) =>
                languageMap[language].toLowerCase() === lowerCaseLanguage,
            ) || { dependencies: [] };

            return (
              <LanguageContent
                key={lowerCaseLanguage}
                language={lowerCaseLanguage}
              >
                <Dependency
                  language={lowerCaseLanguage}
                  dependencies={dependencies}
                />
              </LanguageContent>
            );
          }
        })}
      </LanguageSwitcher>
    </>
  );
};

interface KotlinDependenciesProps {
  mavenDependencies: string[];
  gradleDependencies: string[];
}

const KotlinDependencies: React.FC<KotlinDependenciesProps> = ({
  mavenDependencies,
  gradleDependencies,
}) => {
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
};

export default Dependencies;
