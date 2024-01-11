#!/usr/bin/env node

const SnippetExtractor = require('./index');
const fs = require('fs');
const path = require('path');

function findConfigFile() {
  const configFileName = 'shnippet.config.json';
  const configPath = path.join(__dirname, '..', '..', configFileName);

  if (!fs.existsSync(configPath)) {
    console.error(`Configuration file not found: ${configPath}`);
    process.exit(1);
  }

  return configPath;
}

function main() {
  const configPath = findConfigFile();
  const configDir = path.dirname(configPath);
  const config = require(configPath);

  config.rootDirectory = path.resolve(configDir, config.rootDirectory);
  config.outputDirectory = path.resolve(configDir, config.outputDirectory);

  const extractor = new SnippetExtractor(config);
  extractor.extractSnippets();
}

main();
