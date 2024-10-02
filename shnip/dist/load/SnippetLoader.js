// src/load/SnippetLoader.ts
var snippetCache = {};
async function getSnippet(snippetName, language = "javascript", config) {
  const version = config.version || "v1";
  const cacheKey = `${snippetName}-${language}-${version}`;
  if (snippetCache[cacheKey]) {
    return snippetCache[cacheKey];
  }
  const snippetUrl = `${config.snippetOutputDirectory}/${version}/${language}/${snippetName}.snippet.js`;
  try {
    const response = await fetch(snippetUrl);
    if (!response.ok) {
      throw new Error(`Failed to load snippet: ${snippetUrl}`);
    }
    const snippetContent = await response.text();
    snippetCache[cacheKey] = snippetContent;
    return snippetContent;
  } catch (error) {
    throw new Error(
      `Snippet not found: ${snippetName} for language: ${language}`
    );
  }
}
export {
  getSnippet
};
