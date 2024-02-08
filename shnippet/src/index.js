const fs = require("fs");
const path = require("path");

class SnippetExtractor {
  constructor(config) {
    this.config = {
      outputDirectoryStructure: "organized",
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
      let snippetContent = content
        .substring(startTagClose + 1, endIndex)
        .trim();

      // Normalize indentation
      snippetContent = this.normalizeIndentation(snippetContent);

      if (snippetName) {
        snippets[snippetName] = snippetContent;
      }

      endIndex += this.config.snippetTags.end.length; // Ensure we move past the end tag
    }

    return snippets;
  }

  normalizeIndentation(snippetContent) {
    const lines = snippetContent.split("\n");
    const minIndent = lines.reduce((min, line) => {
      if (line.trim()) {
        const leadingSpaces = line.match(/^(\s*)/)[1].length;
        return Math.min(min, leadingSpaces);
      }
      return min;
    }, Infinity);

    return lines.map((line) => line.substring(minIndent)).join("\n");
  }

  processDirectory(directory, relativePath = "") {
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.processDirectory(fullPath, path.join(relativePath, item));
      } else if (
        stat.isFile() &&
        this.config.fileExtensions.includes(path.extname(item))
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const fileSnippets = this.extractSnippetsFromFile(content);
        this.writeSnippetsToFile(fileSnippets, fullPath, relativePath);
      }
    }
  }

  writeSnippetsToFile(snippets, fullPath, relativePath) {
    for (const [snippetName, snippetContent] of Object.entries(snippets)) {
      // Determine output path based on configuration
      const outputPath = this.determineOutputPath(
        snippetName,
        fullPath,
        relativePath
      );
      fs.writeFileSync(
        outputPath,
        `export default ${JSON.stringify(snippetContent)};`
      );
    }
  }

  determineOutputPath(snippetName, fullPath, relativePath) {
    const extension = path.extname(fullPath);
    const language = this.getLanguageFromExtension(extension);
    let outputPath;

    switch (this.config.outputDirectoryStructure) {
      case "flat":
        outputPath = path.join(
          this.config.outputDirectory,
          `${snippetName}.snippet${extension}`
        );
        break;
      case "match":
        outputPath = path.join(
          this.config.outputDirectory,
          relativePath,
          `${snippetName}.snippet${extension}`
        );
        break;
      case "byLanguage":
        outputPath = path.join(
          this.config.outputDirectory,
          language,
          `${snippetName}.snippet${extension}`
        );
        break;
      case "organized":
      default:
        outputPath = path.join(
          this.config.outputDirectory,
          language,
          snippetName,
          `index${extension}`
        );
        break;
    }

    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    return outputPath;
  }

  getLanguageFromExtension(extension) {
    const extensionToLanguageMap = {
      ".js": "js",
      ".ts": "typescript",
      ".kt": "kt",
      ".swift": "swift",
      ".gradle": "gradle",
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
