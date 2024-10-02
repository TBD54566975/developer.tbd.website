// src/extract/SnippetExtractor.ts
var fs;
var path;
var SnippetExtractor = class {
  constructor(config) {
    this.prependBlocks = {};
    if (typeof window !== "undefined") {
      throw new Error(
        "SnippetExtractor can only be used in a Node.js environment"
      );
    }
    this.config = {
      ...config,
      outputDirectoryStructure: config.outputDirectoryStructure || "byLanguage"
    };
    this.projectRoot = process.cwd();
  }
  gatherSnippetNames(content) {
    const { start, end } = this.config.snippetTags;
    let startIndex = 0, endIndex = 0;
    while ((startIndex = content.indexOf(start, startIndex)) !== -1) {
      endIndex = content.indexOf(end, startIndex);
      if (endIndex === -1) break;
      const snippetNameLine = content.substring(startIndex + start.length, content.indexOf("\n", startIndex)).trim();
      startIndex = endIndex + end.length;
    }
  }
  gatherImports(content) {
    const { prependStart, prependEnd } = this.config.snippetTags;
    let startIndex = 0, endIndex = 0;
    while ((startIndex = content.indexOf(prependStart, startIndex)) !== -1) {
      const endOfStartTag = content.indexOf("\n", startIndex);
      const snippetNamesLine = content.substring(startIndex + prependStart.length, endOfStartTag).trim();
      const snippetNames = snippetNamesLine.split(/\s+/);
      endIndex = content.indexOf(prependEnd, endOfStartTag);
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
      startIndex = endIndex + prependEnd.length;
    }
  }
  extractSnippetsFromFile(content, filePath) {
    const snippets = {};
    const { start, end } = this.config.snippetTags;
    let startIndex = 0, endIndex = 0;
    const fileExtension = path.extname(filePath);
    while ((startIndex = content.indexOf(start, endIndex)) !== -1) {
      const startTagClose = content.indexOf("\n", startIndex);
      if (startTagClose === -1) {
        console.log("Snippet start tag not followed by newline. Skipping...");
        break;
      }
      endIndex = content.indexOf(end, startTagClose);
      if (endIndex === -1) {
        console.log("No closing tag found for a snippet. Skipping...");
        break;
      }
      const snippetName = content.substring(startIndex + start.length, startTagClose).trim();
      let snippetContent = content.substring(startTagClose + 1, endIndex);
      snippetContent = this.normalizeIndentation(snippetContent, fileExtension);
      if (this.prependBlocks[snippetName]) {
        const importsToPrepend = this.prependBlocks[snippetName].map((block) => block.trimEnd().replace(/\/\/\s*$/, "")).join("\n");
        const finalImports = importsToPrepend.length > 0 ? `${importsToPrepend}
` : "";
        snippetContent = `${finalImports}${snippetContent}`;
      }
      if (snippetName) {
        snippets[snippetName] = snippetContent;
      }
      endIndex += end.length;
    }
    return snippets;
  }
  normalizeIndentation(snippetContent, fileExtension) {
    const lines = snippetContent.split("\n");
    const firstLineIndentation = lines[0].match(/^(\s*)/)?.[0].length || 0;
    const normalizedLines = lines.map((line) => {
      const currentIndentation = line.match(/^(\s*)/)?.[0].length || 0;
      if (currentIndentation >= firstLineIndentation) {
        return line.substring(firstLineIndentation);
      }
      return line;
    });
    const commentChar = fileExtension === ".bash" ? "#" : "//";
    return normalizedLines.map((line) => line.replace(new RegExp(`\\s*${commentChar}\\s*$`), "")).join("\n");
  }
  shouldExcludeFile(content) {
    if (this.config.outputDirectoryStructure === "match") {
      return this.config.exclude.some(
        (excludeString) => content.includes(excludeString)
      );
    }
    return false;
  }
  processDirectory(directory, relativePath = "") {
    const absoluteDir = path.resolve(this.projectRoot, directory);
    const items = fs.readdirSync(absoluteDir);
    items.forEach((item) => {
      const fullPath = path.join(absoluteDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        this.processDirectory(
          path.join(directory, item),
          path.join(relativePath, item)
        );
      } else if (this.config.fileExtensions.includes(path.extname(item))) {
        const content = fs.readFileSync(fullPath, "utf-8");
        this.prependBlocks = {};
        this.gatherSnippetNames(content);
        this.gatherImports(content);
        if (!this.shouldExcludeFile(content)) {
          const fileSnippets = this.extractSnippetsFromFile(content, fullPath);
          this.writeSnippetsToFile(fileSnippets, fullPath, relativePath);
        }
      }
    });
  }
  writeSnippetsToFile(snippets, fullPath, relativePath) {
    for (const [snippetName, snippetContent] of Object.entries(snippets)) {
      let outputPath;
      switch (this.config.outputDirectoryStructure) {
        case "match":
          outputPath = path.join(
            this.config.snippetOutputDirectory,
            relativePath,
            `${snippetName}.snippet${path.extname(fullPath)}`
          );
          break;
        case "byLanguage":
        default:
          outputPath = this.determineOutputPath(snippetName, fullPath);
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
  }
  determineOutputPath(snippetName, fullPath) {
    const extension = path.extname(fullPath);
    const language = this.getLanguageFromExtension(extension);
    const version = this.config.version || "v1";
    return path.join(
      this.config.snippetOutputDirectory,
      version,
      language,
      `${snippetName}.snippet.js`
    );
  }
  getLanguageFromExtension(extension) {
    const extensionToLanguageMap = {
      ".js": "js",
      ".ts": "typescript",
      ".kt": "kt",
      ".swift": "swift",
      ".gradle": "gradle",
      ".bash": "bash",
      ".xml": "xml"
    };
    return extensionToLanguageMap[extension] || "other";
  }
  extractSnippets() {
    const absoluteOutputDir = path.resolve(
      this.projectRoot,
      this.config.snippetOutputDirectory
    );
    if (!fs.existsSync(absoluteOutputDir)) {
      fs.mkdirSync(absoluteOutputDir, { recursive: true });
    }
    this.processDirectory(this.config.rootDirectory);
  }
};
var SnippetExtractor_default = SnippetExtractor;
export {
  SnippetExtractor,
  SnippetExtractor_default as default
};
