#!/usr/bin/env node

const SnippetExtractor = require("./index");
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

function findConfigFile() {
  const configFileName = "shnippet.config.json";
  const configPath = path.join(__dirname, "..", "..", configFileName);

  if (!fs.existsSync(configPath)) {
    console.error(`Configuration file not found: ${configPath}`);
    process.exit(1);
  }

  return configPath;
}

function clearOutputDirectory(outputDirectory) {
  if (fs.existsSync(outputDirectory)) {
    rimraf.sync(outputDirectory);
  } else {
    console.log(`Output directory does not exist: ${outputDirectory}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const configPath = findConfigFile();
  const configDir = path.dirname(configPath);
  let config = require(configPath);

  config.rootDirectory = path.resolve(configDir, config.rootDirectory);
  config.outputDirectory = path.resolve(configDir, config.outputDirectory);

  // Check for "clear" argument
  if (args.includes("clear")) {
    clearOutputDirectory(config.outputDirectory);
    return; // Exit after clearing the output directory
  }

  // Process --structure flag
  const structureFlagIndex = args.indexOf("--structure");
  if (structureFlagIndex !== -1 && args.length > structureFlagIndex + 1) {
    const structureValue = args[structureFlagIndex + 1];
    const validStructures = ["flat", "match", "organized", "byLanguage"];
    if (validStructures.includes(structureValue)) {
      console.log(`Setting output directory structure to '${structureValue}'`);
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

  const extractor = new SnippetExtractor(config);
  extractor.extractSnippets();
}

main();
