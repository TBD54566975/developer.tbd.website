const fs = require('fs');
const path = require('path');

function extractSnippetsFromFile(content) {
  const snippetStartTag = ':snippet-start:';
  const snippetEndTag = ':snippet-end:';
  const snippets = {};

  let startIndex = 0,
    endIndex = 0;
  while ((startIndex = content.indexOf(snippetStartTag, endIndex)) !== -1) {
    const startTagClose = content.indexOf('\n', startIndex);
    if (startTagClose === -1) {
      console.log('Snippet start tag not followed by newline. Skipping...');
      break;
    }

    endIndex = content.indexOf(snippetEndTag, startTagClose);
    if (endIndex === -1) {
      console.log('No closing tag found for a snippet. Skipping...');
      break;
    }

    const snippetName = content
      .substring(startIndex + snippetStartTag.length, startTagClose)
      .trim();
    const endTagStart = content.lastIndexOf('\n', endIndex);
    let snippetContent = content.substring(startTagClose + 1, endTagStart);

    // Trim leading whitespace from each line
    snippetContent = snippetContent
      .split('\n')
      .map((line) => line.trimStart())
      .join('\n')
      .trim();

    if (snippetName) {
      snippets[snippetName] = snippetContent;
    }

    // Move endIndex past the end tag to avoid including it in the next iteration
    endIndex = content.indexOf('\n', endIndex) + 1;
  }

  return snippets;
}

function processDirectory(directory, outputDirectory, baseDirectory) {
  const items = fs.readdirSync(directory);
  items.forEach((item) => {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath, outputDirectory, baseDirectory);
    } else if (stat.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const fileSnippets = extractSnippetsFromFile(content);
      const fileExtension = path.extname(fullPath);

      for (const [snippetName, snippetContent] of Object.entries(
        fileSnippets
      )) {
        const relativePath = path.relative(baseDirectory, directory);
        const snippetDir = path.join(outputDirectory, relativePath);
        if (!fs.existsSync(snippetDir)) {
          fs.mkdirSync(snippetDir, { recursive: true });
        }

        const outputFileName = `${snippetName}.snippet${fileExtension}`;
        const outputPath = path.join(snippetDir, outputFileName);
        console.log(`Writing snippet: ${outputPath}`);
        fs.writeFileSync(outputPath, snippetContent);
      }
    }
  });
}

const rootDirectory = './site/__tests__';
const outputDirectory = './site/snippets';
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}
processDirectory(rootDirectory, outputDirectory, rootDirectory);
