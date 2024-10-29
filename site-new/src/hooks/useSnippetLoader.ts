import { useEffect, useState, useMemo } from "react";

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

  // Memoize the languages array to prevent unnecessary re-renders
  const memoizedLanguages = useMemo(() => languages, [languages]);

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

          if (
            memoizedLanguages.some((lang) => languageFolders[lang] === folder)
          ) {
            foundSnippets[folder] = context(key).default;
          }
        }
      });

      // Update the state only if snippetMap has changed
      if (JSON.stringify(snippetMap) !== JSON.stringify(foundSnippets)) {
        setSnippetMap(foundSnippets);
      }

      // Handle errors or missing snippets, but only update if error is new
      if (Object.keys(foundSnippets).length === 0) {
        if (error !== `No snippets found for "${snippetName}".`) {
          setError(`No snippets found for "${snippetName}".`);
        }
      } else if (error !== null) {
        setError(null); // Clear error if snippets are found
      }
    } catch (err) {
      console.error("Error loading snippets:", err);
      if (error !== `Failed to load snippets for "${snippetName}".`) {
        setError(`Failed to load snippets for "${snippetName}".`);
      }
    }
  }, [snippetName, memoizedLanguages, snippetMap, error]);

  return { snippetMap, error };
};

export default useSnippetLoader;
