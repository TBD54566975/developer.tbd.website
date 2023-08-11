const fs = require("fs");

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

function extractFunctionsFromFile(filename) {
  const content = fs.readFileSync(filename, "utf-8");

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

const filename = "./code-snippets.js";
const functions = extractFunctionsFromFile(filename);

fs.writeFileSync("code-snippets-map.json", JSON.stringify(functions, null, 2));
