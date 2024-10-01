// src/load/SnippetLoader.ts
import path from "path";
import { promises as fsPromises } from "fs";
var snippetCache = {};
async function getSnippet(snippetName, language = "javascript", config) {
  const version = config.version || "v1";
  const cacheKey = `${snippetName}-${language}-${version}`;
  if (snippetCache[cacheKey]) {
    return snippetCache[cacheKey];
  }
  const snippetPath = path.join(
    config.snippetOutputDirectory,
    version,
    language,
    `${snippetName}.snippet.js`
  );
  try {
    await fsPromises.access(snippetPath);
  } catch (error) {
    throw new Error(
      `Snippet not found: ${snippetName} for language: ${language}`
    );
  }
  const snippetContent = await fsPromises.readFile(snippetPath, "utf8");
  snippetCache[cacheKey] = snippetContent;
  return snippetContent;
}
export {
  getSnippet
};
