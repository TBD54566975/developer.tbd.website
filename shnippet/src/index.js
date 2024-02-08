const fs = require("fs");
const path = require("path");

class SnippetExtractor {
  constructor(config) {
    this.config = {
      outputDirectoryStructure: "organized", // Default to "organized" if not specified
      ...config,
    };
  }

  extractSnippetsFromFile(content) {
    const snippets = {};
    let startIndex = 0,
      endIndex = 0;

    while (
      (startIndex = content.indexOf(
        this.config.snippetTags.start,
        endIndex
      )) !== -1
    ) {
      const startTagClose = content.indexOf("\n", startIndex);
      if (startTagClose === -1) {
        console.log("Snippet start tag not followed by newline. Skipping...");
        break;
      }

      endIndex = content.indexOf(this.config.snippetTags.end, startTagClose);
      if (endIndex === -1) {
        console.log("No closing tag found for a snippet. Skipping...");
        break;
      }

      const snippetName = content
        .substring(
          startIndex + this.config.snippetTags.start.length,
          startTagClose
        )
        .trim();
      const endTagStart = content.lastIndexOf("\n", endIndex);
      let snippetContent = content.substring(startTagClose + 1, endTagStart);

      // Normalize indentation
      const lines = snippetContent.split("\n");
      const minIndent = lines.reduce((min, line) => {
        const currentIndent = line.match(/^\s*/)[0].length;
        return line.trim() ? Math.min(min, currentIndent) : min;
      }, Infinity);

      snippetContent = lines
        .map((line) => line.substring(minIndent))
        .join("\n");

      if (snippetName) {
        snippets[snippetName] = snippetContent;
      }

      endIndex = content.indexOf("\n", endIndex) + 1;
    }

    return snippets;
  }

  processDirectory(directory, relativePath = "") {
    const items = fs.readdirSync(directory);
    items.forEach((item) => {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.processDirectory(fullPath, path.join(relativePath, item));
      } else if (
        stat.isFile() &&
        this.config.fileExtensions.includes(path.extname(fullPath))
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const fileSnippets = this.extractSnippetsFromFile(content);

        for (const [snippetName, snippetContent] of Object.entries(
          fileSnippets
        )) {
          this.writeSnippetToFile(
            snippetName,
            snippetContent,
            fullPath,
            relativePath
          );
        }
      }
    });
  }

  writeSnippetToFile(snippetName, snippetContent, fullPath, relativePath) {
    const language = this.getLanguageFromExtension(path.extname(fullPath));
    let outputPath;

    switch (this.config.outputDirectoryStructure) {
      case "flat":
        outputPath = path.join(
          this.config.outputDirectory,
          `${snippetName}.snippet.js`
        );
        break;
      case "match":
        outputPath = path.join(
          this.config.outputDirectory,
          relativePath,
          `${snippetName}.snippet.js`
        );
        break;
      case "byLanguage":
        outputPath = path.join(
          this.config.outputDirectory,
          language,
          `${snippetName}.snippet.js`
        );
        break;
      case "organized":
      default:
        // Organized could mean organized by language or another criteria you define
        outputPath = path.join(
          this.config.outputDirectory,
          language,
          `${snippetName}.snippet.js`
        );
        break;
    }

    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    fs.writeFileSync(
      outputPath,
      `export default ${JSON.stringify(snippetContent)};`
    );
  }

  getLanguageFromExtension(extension) {
    const extensionToLanguageMap = {
      ".js": "js",
      ".ts": "ts",
      ".kt": "kt",
      ".swift": "swift",
      // Add other mappings as needed
    };

    return extensionToLanguageMap[extension] || "other";
  }

  extractSnippets() {
    if (!fs.existsSync(this.config.outputDirectory)) {
      fs.mkdirSync(this.config.outputDirectory, { recursive: true });
    }
    this.processDirectory(this.config.rootDirectory);
  }
}

module.exports = SnippetExtractor;
