const fs = require("fs");
const path = require("path");

function extractFunctionBody(content, startIndex) {
  let braceCount = 1;
  let i = startIndex;

  while (braceCount !== 0 && i < content.length) {
    if (content[i] === "{") {
      braceCount++;
    } else if (content[i] === "}") {
      braceCount--;
    }
    i++;
  }

  return content.substring(startIndex, i - 1).trim();
}

function extractFunctionsFromContent(content) {
  // Regular expression to match exported async functions
  const functionRegex = /export\s+async\s+function\s+(\w+)\s*\([^)]*\)\s*{/g;

  const functions = {};

  let match;
  while ((match = functionRegex.exec(content)) !== null) {
    const funcName = match[1];
    const funcBody = extractFunctionBody(
      content,
      match.index + match[0].length
    );

    // Remove return statements, even those spanning multiple lines
    const cleanedBody = funcBody.replace(/return[^;]*;/gs, "").trim();

    if (cleanedBody) {
      functions[funcName] = cleanedBody;
    }
  }

  return functions;
}

function processDirectory(directory) {
  const results = {};

  const items = fs.readdirSync(directory);
  items.forEach((item) => {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      Object.assign(results, processDirectory(fullPath));
    } else if (stat.isFile() && path.extname(fullPath) === ".js") {
      const content = fs.readFileSync(fullPath, "utf-8");
      const fileFunctions = extractFunctionsFromContent(content);
      Object.assign(results, fileFunctions);
    }
  });

  return results;
}

const rootDirectory = "./site/code-snippets";
const allFunctions = processDirectory(rootDirectory);

fs.writeFileSync(
  "./site/src/util/code-snippets-map.json",
  JSON.stringify(allFunctions, null, 2)
);
