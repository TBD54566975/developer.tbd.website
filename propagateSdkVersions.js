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

const updatePomXmlProperties = async (filePath, sdkVersions) => {
  try {
    const pomContent = await fs.promises.readFile(filePath, 'utf8');
    const parsedPomContent = await parseString(pomContent, { explicitArray: false, mergeAttrs: true });

    let updated = false;

    // Update versions in <properties>
    Object.keys(sdkVersions.maven).forEach(sdk => {
      const propertyKey = `version.${sdk}`;
      if (parsedPomContent.project.properties && parsedPomContent.project.properties.hasOwnProperty(propertyKey)) {
        parsedPomContent.project.properties[propertyKey] = sdkVersions.maven[sdk];
        updated = true;
      }
    });

    if (updated) {
      const builder = new xml2js.Builder();
      let updatedPomContent = builder.buildObject(parsedPomContent);

      // Correctly handle namespace attributes without introducing duplicates
      updatedPomContent = updatedPomContent.replace('<project>', '<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">');

      // Remove any duplicate namespace declarations that might have been added
      updatedPomContent = updatedPomContent.replace(/<xmlns>.*<\/xmlns>\s*<xmlns:xsi>.*<\/xmlns:xsi>\s*<xsi:schemaLocation>.*<\/xsi:schemaLocation>/, '');

      await fs.promises.writeFile(filePath, updatedPomContent);
      console.log(`Successfully updated properties in ${filePath}`);
    } else {
      console.log(`No properties were updated in ${filePath}`);
    }
  } catch (error) {
    console.error(`Failed to update properties in ${filePath}:`, error);
  }
};


// Function to recursively find and update pom.xml files, excluding node_modules
async function findAndUpdatePomProperties(dirPath, sdkVersions) {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (let dirent of entries) {
    if (dirent.name === 'node_modules') continue; // Skip node_modules directory

    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await findAndUpdatePomProperties(fullPath, sdkVersions); // Recursive call for directories
    } else if (dirent.name === 'pom.xml') {
      await updatePomXmlProperties(fullPath, sdkVersions); // Directly update properties in pom.xml files
    }
  }
}

// Function to update Package.swift dependencies
const updatePackageSwiftDependencies = async (dirPath, sdkVersions) => {
  const packageSwiftPath = path.join(dirPath, 'Package.swift');
  
  try {
    const packageSwiftContent = await fs.promises.readFile(packageSwiftPath, 'utf8');
    let updatedPackageSwiftContent = packageSwiftContent;

    Object.keys(sdkVersions.swift).forEach(dependency => {
      const { url, branch } = sdkVersions.swift[dependency];
      const regex = new RegExp(`\\.package\\(url: "${url}", branch: ".*?"\\)`, 'g');
      updatedPackageSwiftContent = updatedPackageSwiftContent.replace(regex, `.package(url: "${url}", branch: "${branch}")`);
    });

    await fs.promises.writeFile(packageSwiftPath, updatedPackageSwiftContent);
  } catch (error) {
    console.error(`Failed to update Package.swift in ${dirPath}:`, error);
  }
};


// Function to recursively find and update Package.swift files
async function findAndUpdatePackageSwift(dirPath, sdkVersions) {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (let dirent of entries) {
    if (dirent.name === 'node_modules') continue; // Skip node_modules directory

    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await findAndUpdatePackageSwift(fullPath, sdkVersions); // Recursive call for directories
    } else if (dirent.name === 'Package.swift') {
      await updatePackageSwiftDependencies(dirPath, sdkVersions); // Directly update dependencies in Package.swift files
    }
  }
}


// Main function to initiate the version propagation process
async function propagateVersions() {
  try {
    const sdkVersions = await getSdkVersions();

    for (const dirPath of directoriesToUpdate) {
      await updatePackageJsonDependencies(dirPath, sdkVersions);
      await findAndUpdatePomProperties(dirPath, sdkVersions);
      await findAndUpdatePackageSwift(dirPath, sdkVersions); // Add this line to update Swift dependencies
    }
  } catch (error) {
    console.error('Failed to propagate versions:', error);
  }
}

propagateVersions();