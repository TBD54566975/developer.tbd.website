const fs = require("fs");
const path = require("path");

class SnippetExtractor {
  constructor(config) {
    this.config = {
      outputDirectoryStructure: "byLanguage",
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

      snippetContent = snippetContent.replace(/\/\/\s*$/, "").trim();

      if (snippetName) {
        snippets[snippetName] = snippetContent;
      }

      endIndex += this.config.snippetTags.end.length; // Ensure we move past the end tag
    }

    return snippets;
  }

  normalizeIndentation(snippetContent) {
    const lines = snippetContent.split("\n");

    return lines
      .map((line) => {
        // Check if the line has at least 4 spaces of indentation to remove
        if (line.startsWith("    ")) {
          // 4 spaces
          return line.substring(4); // Remove the first 4 spaces
        }
        return line; // Return the line unchanged if it doesn't start with 4 spaces
      })
      .join("\n");
  }

  shouldExcludeFile(content) {
    // Check if the file content includes any of the strings in the exclude array
    for (const excludeString of this.config.exclude) {
      if (content.includes(excludeString)) {
        return true; // Exclude this file
      }
    }
    return false; // Do not exclude this file
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

        if (
          this.config.outputDirectoryStructure === "match" &&
          this.shouldExcludeFile(content)
        ) {
          console.log(
            `Excluding file due to matching exclude pattern in "match" case: ${fullPath}`
          );
          continue;
        }

        // Proceed with extracting and writing snippets if not excluded
        const fileSnippets = this.extractSnippetsFromFile(content);
        this.writeSnippetsToFile(fileSnippets, fullPath, relativePath);
      }
    }
  }

  writeSnippetsToFile(snippets, fullPath, relativePath) {
    for (const [snippetName, snippetContent] of Object.entries(snippets)) {
      let outputPath;

      switch (this.config.outputDirectoryStructure) {
        case "match":
          // For "match", save the snippet in its original form without converting to a JS module
          outputPath = path.join(
            this.config.outputDirectory,
            relativePath,
            `${snippetName}.snippet${path.extname(fullPath)}`
          );
          if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          }
          fs.writeFileSync(outputPath, snippetContent);
          break;
        case "flat":
        case "byLanguage":
        case "organized":
        default:
          // Handle other cases as before
          outputPath = this.determineOutputPath(
            snippetName,
            fullPath,
            relativePath
          );
          // Ensure the output directory exists
          if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          }
          // For configurations other than "match", wrap the content in a JS module
          fs.writeFileSync(
            outputPath,
            `export default ${JSON.stringify(snippetContent)};`
          );
          break;
      }
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
          `${snippetName}.snippet.js`
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
      ".bash": "bash",
      ".xml": "xml",
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
