import React from "react";
import CodeBlock from "@theme/CodeBlock";
import useSnippetLoader, { languageFolders } from "../hooks/useSnippetLoader";
import { useLanguage } from "@site/src/context/LanguageSwitcher";

import JsIcon from "@site/static/img/js-icon";
import KotlinIcon from "@site/static/img/KotlinIcon";
import SwiftIcon from "@site/static/img/SwiftIcon";

interface ShnipProps {
  snippetName: string;
  languages: string[];
}

const languageIconMap: Record<string, React.ElementType> = {
  javascript: JsIcon,
  kotlin: KotlinIcon,
  swift: SwiftIcon,
};

const Shnip: React.FC<ShnipProps> = ({ snippetName, languages }) => {
  const { selectedLanguage, setLanguage } = useLanguage();
  languages = languages.map((lang) => lang.toLowerCase());

  const { snippetMap, error } = useSnippetLoader({ snippetName, languages });

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="tabs space-x-4">
        {languages.map((lang) => {
          const Icon = languageIconMap[lang];
          return (
            <button
              key={lang}
              className={`tab-button text-lg font-medium text-white ${
                selectedLanguage === lang
                  ? "rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-tbd-yellow"
                  : "border-b-2 border-transparent text-white"
              } flex items-center rounded bg-transparent px-4 py-2`}
              onClick={() => setLanguage(lang)}
            >
              {Icon && (
                <Icon className="mr-2 h-5 w-5 fill-current text-tbd-yellow" />
              )}
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          );
        })}
      </div>

      <div className="snippet-content mt-4">
        {snippetMap[languageFolders[selectedLanguage]] ? (
          <CodeBlock language={selectedLanguage}>
            {snippetMap[languageFolders[selectedLanguage]]}
          </CodeBlock>
        ) : (
          <div>No snippet found for {selectedLanguage}</div>
        )}
      </div>
    </div>
  );
};

export default Shnip;
