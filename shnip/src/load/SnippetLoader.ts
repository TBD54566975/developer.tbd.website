// Import necessary modules
import path from "path";
import { promises as fsPromises } from "fs";

interface SnippetLoaderConfig {
  snippetOutputDirectory: string;
  version?: string;
}

const snippetCache: Record<string, string> = {};

// Function to get a snippet
async function getSnippet(
  snippetName: string,
  language: string = "javascript",
  config: SnippetLoaderConfig
): Promise<string> {
  const version = config.version || "v1";
  const cacheKey = `${snippetName}-${language}-${version}`;

  // Check cache first
  if (snippetCache[cacheKey]) {
    return snippetCache[cacheKey];
  }

  // Construct the snippet path
  const snippetPath = path.join(
    config.snippetOutputDirectory,
    version,
    language,
    `${snippetName}.snippet.js`
  );

  // Check if file exists
  try {
    await fsPromises.access(snippetPath);
  } catch (error) {
    throw new Error(
      `Snippet not found: ${snippetName} for language: ${language}`
    );
  }

  // Read the file content
  const snippetContent = await fsPromises.readFile(snippetPath, "utf8");

  // Store the snippet in cache
  snippetCache[cacheKey] = snippetContent;

  return snippetContent;
}

export { getSnippet, SnippetLoaderConfig };
