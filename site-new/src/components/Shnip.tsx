import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import useSnippetLoader, { languageFolders } from "../hooks/useSnippetLoader";

import JsIcon from "@site/static/img/js-icon";
import KotlinIcon from "@site/static/img/KotlinIcon";

interface ShnipProps {
  snippetName: string;
  languages: string[];
}

const languageIconMap: Record<string, React.ElementType> = {
  javascript: JsIcon,
  kotlin: KotlinIcon,
};

const Shnip: React.FC<ShnipProps> = ({ snippetName, languages }) => {
  const { snippetMap, error } = useSnippetLoader({ snippetName, languages });
  const [activeTab, setActiveTab] = useState(languages[0]);

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
                activeTab === lang
                  ? "rounded-none border-b-2 border-l-0 border-r-0 border-t-0 border-tbd-yellow"
                  : "border-b-2 border-transparent text-white"
              } flex items-center rounded bg-transparent px-4 py-2`}
              onClick={() => setActiveTab(lang)}
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
        {snippetMap[languageFolders[activeTab]] ? (
          <CodeBlock language={activeTab}>
            {snippetMap[languageFolders[activeTab]]}
          </CodeBlock>
        ) : (
          <div>No snippet found for {activeTab}</div>
        )}
      </div>
    </div>
  );
};

export default Shnip;
