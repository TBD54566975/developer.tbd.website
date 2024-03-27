const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const util = require('util');

// Setup
const sdkVersionsPath = path.resolve(__dirname, 'sdk-versions.json');
const directoriesToUpdate = [
  path.resolve(__dirname, './examples/tutorials'),
  path.resolve(__dirname, './site/testsuites'),
];

const parseString = util.promisify(xml2js.parseString);
const builder = new xml2js.Builder();

// Grab SDK versions from sdk-versions.json
const getSdkVersions = async () => {
  try {
    const content = await fs.promises.readFile(sdkVersionsPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading sdk-versions.json:', error);
    throw error; // Rethrow to handle it in propagateVersions
  }
};

// Update package.json dependencies
const updatePackageJsonDependencies = async (dirPath, sdkVersions) => {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (let dirent of entries) {
    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await updatePackageJsonDependencies(fullPath, sdkVersions); // Recursive call
    } else if (dirent.name === 'package.json') {
      try {
        const packageJson = JSON.parse(await fs.promises.readFile(fullPath, 'utf8'));
        let updated = false;
        for (let sdk in sdkVersions.js) {
          if (packageJson.dependencies && packageJson.dependencies[sdk]) {
            packageJson.dependencies[sdk] = sdkVersions.js[sdk];
            updated = true;
          }
          if (packageJson.devDependencies && packageJson.devDependencies[sdk]) {
            packageJson.devDependencies[sdk] = sdkVersions.js[sdk];
            updated = true;
          }
        }
        if (updated) {
          await fs.promises.writeFile(fullPath, JSON.stringify(packageJson, null, 2));
        }
      } catch (error) {
        console.error(`Error updating ${fullPath}:`, error);
      }
    }
  }
};

const updatePomXmlVersion = async (filePath, sdkVersions) => {
  try {
    const pomContent = await fs.promises.readFile(filePath, 'utf8');
    const parsedPomContent = await parseString(pomContent, { explicitArray: true, mergeAttrs: true });

    let updated = false;

    const updateDependencies = (dependencies) => {
      dependencies.forEach((dependency) => {
        const artifactId = dependency.artifactId;
        if (sdkVersions.jvm[artifactId]) {
          dependency.version = [sdkVersions.jvm[artifactId]];
          updated = true;
        }
      });
    };

    if (parsedPomContent.project.dependencies && parsedPomContent.project.dependencies[0].dependency) {
      updateDependencies(parsedPomContent.project.dependencies[0].dependency);
    }

    if (parsedPomContent.project.dependencyManagement && parsedPomContent.project.dependencyManagement[0].dependencies[0].dependency) {
      updateDependencies(parsedPomContent.project.dependencyManagement[0].dependencies[0].dependency);
    }

    if (updated) {
      let updatedPomContent = builder.buildObject(parsedPomContent);

      // Correctly handle namespace attributes without introducing duplicates
      updatedPomContent = updatedPomContent.replace('<project>', '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">');

      // Remove any duplicate namespace declarations that might have been added
      updatedPomContent = updatedPomContent.replace(/<xmlns>.*<\/xmlns>\s*<xmlns:xsi>.*<\/xmlns:xsi>\s*<xsi:schemaLocation>.*<\/xsi:schemaLocation>/, '');

      await fs.promises.writeFile(filePath, updatedPomContent);
      console.log(`Successfully updated dependencies in ${filePath}`);
    } else {
      console.log(`No dependencies were updated in ${filePath}`);
    }
  } catch (error) {
    console.error(`Failed to update ${filePath}:`, error);
  }
};



// Function to recursively find and update pom.xml files, excluding node_modules
async function findAndUpdatePomFiles(dirPath, sdkVersions) {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (let dirent of entries) {
    if (dirent.name === 'node_modules') continue; // Skip node_modules directory

    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await findAndUpdatePomFiles(fullPath, sdkVersions); // Recursive call for directories
    } else if (dirent.name === 'pom.xml') {
      await updatePomXmlVersion(fullPath, sdkVersions); // Directly update pom.xml files
    }
  }
}

// Main function to initiate the version propagation process
async function propagateVersions() {
  try {
    const sdkVersions = await getSdkVersions();

    for (const dirPath of directoriesToUpdate) {
      await updatePackageJsonDependencies(dirPath, sdkVersions);
      await findAndUpdatePomFiles(dirPath, sdkVersions);
    }
  } catch (error) {
    console.error('Failed to propagate versions:', error);
  }
}

propagateVersions();