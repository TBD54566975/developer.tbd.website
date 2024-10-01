// src/helpers/getSnippet.ts
async function getSnippet(snippetName, language = "javascript") {
  try {
    const snippetUrl = `/snippets/${language}/${snippetName}.snippet.js`;
    const response = await fetch(snippetUrl);
    if (!response.ok) {
      throw new Error(
        `Snippet not found: ${snippetName} for language: ${language}`
      );
    }
    const snippetContent = await response.text();
    return snippetContent;
  } catch (error) {
    console.error("Error loading snippet:", error);
    throw error;
  }
}
export {
  getSnippet
};
