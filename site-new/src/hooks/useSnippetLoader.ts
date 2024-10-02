import { useEffect, useState } from "react";

export const languageFolders = {
  javascript: "js",
  kotlin: "kt",
  swift: "swift",
  bash: "bash",
  gradle: "gradle",
  xml: "xml",
  pom: "pom",
};

interface SnippetLoaderConfig {
  snippetName: string;
  languages: string[];
}

const useSnippetLoader = ({ snippetName, languages }: SnippetLoaderConfig) => {
  const [snippetMap, setSnippetMap] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // gather all snippet files in the snippets directory
      const context = require.context(
        "../../snippets/1.0.0",
        true,
        /\.snippet\.js$/,
      );
      const foundSnippets: Record<string, string> = {};

      // gather paths to snippets based on snippetName and languages
      context.keys().forEach((key: string) => {
        const baseSnippetName = key
          .split("/")
          .pop()
          ?.replace(/\.\w+$/, "");

        if (baseSnippetName && baseSnippetName.includes(snippetName)) {
          const folder = key.split("/")[1];

          if (languages.some((lang) => languageFolders[lang] === folder)) {
            foundSnippets[folder] = context(key).default;
          }
        }
      });

      setSnippetMap(foundSnippets);

      if (Object.keys(foundSnippets).length === 0) {
        setError(`No snippets found for "${snippetName}".`);
      } else {
        setError(null);
      }
    } catch (err) {
      console.error("Error loading snippets:", err);
      setError(`Failed to load snippets for "${snippetName}".`);
    }
  }, [snippetName, languages]);

  return { snippetMap, error };
};

export default useSnippetLoader;
