// ../shnip.config.ts
var config = {
  rootDirectory: "./site-new/testsuites",
  snippetOutputDirectory: "./site-new/snippets",
  fileExtensions: [".js", ".ts", ".kt", ".gradle", ".xml", ".bash", ".swift"],
  exclude: [
    "pfiOverviewReadOfferingsJs",
    "pfiOverviewWriteJs",
    "pfiOverviewWriteOfferingsJs"
  ],
  snippetTags: {
    start: ":snippet-start:",
    end: ":snippet-end:",
    prependStart: ":prepend-start:",
    prependEnd: ":prepend-end:"
  },
  outputDirectoryStructure: "byLanguage",
  version: "1.0.0"
};

// src/helpers/getSnippet.ts
async function getSnippet(snippetName, language = "javascript") {
  try {
    const snippetUrl = `${config.snippetOutputDirectory}/${config.version}/${language}/${snippetName}.snippet.js`;
    const response = await fetch(snippetUrl);
    console.log("snippetUrl", snippetUrl);
    console.log("response", response);
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
