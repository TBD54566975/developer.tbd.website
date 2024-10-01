import { SnippetExtractor } from "../index.js";
import fs from "fs";
import path from "path";
import { rimraf } from "rimraf";
import { fileURLToPath } from "url";
import { config as rawConfig } from "../../config/shnip.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "../../../");
const config = {
  ...rawConfig,
  rootDirectory: path.resolve(projectRoot, rawConfig.rootDirectory),
  snippetOutputDirectory: path.resolve(
    projectRoot,
    rawConfig.snippetOutputDirectory
  ),
};

function clearOutputDirectory(snippetOutputDirectory: string) {
  if (fs.existsSync(snippetOutputDirectory)) {
    rimraf.sync(snippetOutputDirectory);
  } else {
    console.log(`Output directory does not exist: ${snippetOutputDirectory}`);
  }
}

async function main() {
  const args = process.argv.slice(2);

  // Resolve the root and snippet output directories from the config
  config.rootDirectory = path.resolve(__dirname, "../", config.rootDirectory);
  config.snippetOutputDirectory = path.resolve(
    __dirname,
    "../",
    config.snippetOutputDirectory
  );

  console.log("Config:", config);

  // Check for "clear" argument to clear the output directory
  if (args.includes("clear")) {
    clearOutputDirectory(config.snippetOutputDirectory);
    return;
  }

  const structureFlagIndex = args.indexOf("--structure");
  if (structureFlagIndex !== -1 && args.length > structureFlagIndex + 1) {
    const structureValue = args[structureFlagIndex + 1];
    const validStructures = ["flat", "match", "organized", "byLanguage"];
    if (validStructures.includes(structureValue)) {
      config.outputDirectoryStructure = structureValue;
    } else {
      console.error(
        `Invalid output directory structure: '${structureValue}'. Valid options are: ${validStructures.join(
          ", "
        )}`
      );
      process.exit(1);
    }
  } else if (structureFlagIndex !== -1) {
    console.error(
      "The --structure flag requires a value. Valid options are: flat, match, organized, byLanguage"
    );
    process.exit(1);
  }

  // Use SnippetExtractor with the config
  const extractor = new SnippetExtractor(config);
  extractor.extractSnippets();
}

main();
