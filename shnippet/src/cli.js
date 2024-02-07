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
    console.log(`Cleared: ${outputDirectory}`);
  } else {
    console.log(`Output directory does not exist: ${outputDirectory}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  const configPath = findConfigFile();
  const configDir = path.dirname(configPath);
  const config = require(configPath);

  config.rootDirectory = path.resolve(configDir, config.rootDirectory);
  config.outputDirectory = path.resolve(configDir, config.outputDirectory);

  if (args.includes("clear")) {
    clearOutputDirectory(config.outputDirectory);
  } else {
    const extractor = new SnippetExtractor(config);
    extractor.extractSnippets();
  }
}

main();
