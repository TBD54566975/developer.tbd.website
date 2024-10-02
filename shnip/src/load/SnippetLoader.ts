interface SnippetLoaderConfig {
  snippetOutputDirectory: string; // This would be the public path where snippets are served
  version?: string;
}

const snippetCache: Record<string, string> = {};

// Fetches the snippet as a static asset from the server
export async function getSnippet(
  snippetName: string,
  language: string = "javascript",
  config: SnippetLoaderConfig
): Promise<string> {
  const version = config.version || "v1";
  const cacheKey = `${snippetName}-${language}-${version}`;

  // Check if the snippet is already cached
  if (snippetCache[cacheKey]) {
    return snippetCache[cacheKey];
  }

  // Construct the path to the snippet as a URL
  const snippetUrl = `${config.snippetOutputDirectory}/${version}/${language}/${snippetName}.snippet.js`;

  try {
    // Fetch the snippet from the server (static asset)
    const response = await fetch(snippetUrl);

    if (!response.ok) {
      throw new Error(`Failed to load snippet: ${snippetUrl}`);
    }

    // Get the content of the snippet
    const snippetContent = await response.text();

    // Cache the snippet content
    snippetCache[cacheKey] = snippetContent;

    return snippetContent;
  } catch (error) {
    throw new Error(
      `Snippet not found: ${snippetName} for language: ${language}`
    );
  }
}
