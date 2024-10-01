import React, { useState, useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import { getSnippet } from "shnip";

interface ShnipProps {
  snippetName: string;
  language?: string;
}

const Shnip: React.FC<ShnipProps> = ({
  snippetName,
  language = "javascript",
}) => {
  const [snippet, setSnippet] = useState<string | null>(null);

  useEffect(() => {
    async function loadSnippet() {
      try {
        const snippetContent = await getSnippet(snippetName, language);
        setSnippet(snippetContent);
      } catch (error) {
        console.error("Error loading snippet:", error);
      }
    }

    loadSnippet();
  }, [snippetName, language]);

  return (
    <div>
      <h2>{snippetName}</h2>
      {snippet && <CodeBlock language={"html"}>{snippet}</CodeBlock>}
    </div>
  );
};

export default Shnip;
