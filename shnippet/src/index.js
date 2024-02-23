const fs = require("fs");
const path = require("path");

class SnippetExtractor {
  constructor(config) {
    this.config = {
      outputDirectoryStructure: "byLanguage",
      ...config,
    };

    this.prependBlocks = {};
  }

  gatherImports(content) {
    const prependStartTag = this.config.snippetTags.prependStart;
    const prependEndTag = this.config.snippetTags.prependEnd;
    let startIndex = 0,
      endIndex = 0;

    while ((startIndex = content.indexOf(prependStartTag, startIndex)) !== -1) {
      const endOfStartTag = content.indexOf("\n", startIndex);
      const snippetNamesLine = content
        .substring(startIndex + prependStartTag.length, endOfStartTag)
        .trim();
      const snippetNames = snippetNamesLine.split(/\s+/); // Assuming space-separated names

      endIndex = content.indexOf(prependEndTag, endOfStartTag);
      if (endIndex === -1) {
        console.log("No matching :prepend-end: found for :prepend-start:");
        break;
      }

      const importBlock = content.substring(endOfStartTag + 1, endIndex).trim();

      snippetNames.forEach((name) => {
        if (!this.prependBlocks[name]) {
          this.prependBlocks[name] = [];
        }
        this.prependBlocks[name].push(importBlock);
      });

      startIndex = endIndex + prependEndTag.length;
    }
  }

  extractSnippetsFromFile(content, filePath) {
    const snippets = {};
    let startIndex = 0,
      endIndex = 0;
    const fileExtension = path.extname(filePath);

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

      // Normalize indentation and remove trailing comment characters
      snippetContent = this.normalizeIndentation(snippetContent, fileExtension);

      if (this.prependBlocks[snippetName]) {
        const importsToPrepend = this.prependBlocks[snippetName]
          .map((block) => block.trimEnd().replace(/\/\/\s*$/, ""))
          .join("");

        const finalImports =
          importsToPrepend.length > 0 ? `${importsToPrepend}\n` : "";

        snippetContent = `${finalImports}${snippetContent}`;
      }

      if (snippetName) {
        snippets[snippetName] = snippetContent;
      }

      endIndex += this.config.snippetTags.end.length; // Ensure we move past the end tag
    }

    return snippets;
  }

  normalizeIndentation(snippetContent, fileExtension) {
    const lines = snippetContent.split("\n");

    // Determine the comment character based on the file extension
    const commentChar = fileExtension === ".bash" ? "#" : "//";

    return lines
      .map((line) => {
        // Remove 4 spaces of indentation if present
        const newLine = line.startsWith("    ") ? line.substring(4) : line;
        // Remove trailing comment characters
        return newLine.replace(new RegExp(`\\s*${commentChar}\\s*$`), "");
      })
      .join("\n");
  }
  shouldExcludeFile(content) {
    // Check if the file content includes any of the strings in the exclude array (only for match)
    if (this.config.outputDirectoryStructure == "match") {
      for (const excludeString of this.config.exclude) {
        if (content.includes(excludeString)) {
          return true; // Exclude this file
        }
      }
      return false; // Do not exclude this file
    }
  }

  processDirectory(directory, relativePath = "") {
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.processDirectory(fullPath, path.join(relativePath, item));
      } else if (this.config.fileExtensions.includes(path.extname(item))) {
        const content = fs.readFileSync(fullPath, "utf-8");

        this.prependBlocks = {};

        // Gather imports/prepends for the current file
        this.gatherImports(content, fullPath);

        if (!this.shouldExcludeFile(content)) {
          const fileSnippets = this.extractSnippetsFromFile(content, fullPath);
          this.writeSnippetsToFile(fileSnippets, fullPath, relativePath);
        }
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
