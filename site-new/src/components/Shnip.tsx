import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import useSnippetLoader, { languageFolders } from "../hooks/useSnippetLoader";

interface ShnipProps {
  snippetName: string;
  languages: string[];
}

const Shnip: React.FC<ShnipProps> = ({ snippetName, languages }) => {
  const { snippetMap, error } = useSnippetLoader({ snippetName, languages });
  const [activeTab, setActiveTab] = useState(languages[0]); // Default to the first language

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="tabs space-x-4">
        {languages.map((lang) => (
          <button
            key={lang}
            className={`tab-button ${
              activeTab === lang
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            } rounded px-4 py-2`}
            onClick={() => setActiveTab(lang)}
          >
            {lang}
          </button>
        ))}
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
