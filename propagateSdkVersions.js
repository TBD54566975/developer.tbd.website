const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const util = require('util');

// Setup
const sdkVersionsPath = path.resolve(__dirname, 'sdk-versions.json');
const directoriesToUpdate = [
  path.resolve(__dirname, './examples/tutorials'), // Adjust path as necessary
  path.resolve(__dirname, './site/testsuites'), // Adjust path as necessary
];

const parseString = util.promisify(xml2js.parseString);
const builder = new xml2js.Builder();

// Grab SDK versions from sdk-versions.json
const getSdkVersions = () => {
  try {
    const content = fs.readFileSync(sdkVersionsPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading sdk-versions.json:', error);
    return null;
  }
};

// recursively run through package.json files
const updatePackageJsonDependencies = (dirPath, sdkVersions) => {
  fs.readdirSync(dirPath, { withFileTypes: true }).forEach((dirent) => {
    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      updatePackageJsonDependencies(fullPath, sdkVersions); // Recursive call
    } else if (dirent.name === 'package.json') {
      try {
        const packageJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        let updated = false;
        Object.keys(sdkVersions).forEach((sdk) => {
          if (packageJson.dependencies && packageJson.dependencies[sdk]) {
            packageJson.dependencies[sdk] = sdkVersions[sdk];
            updated = true;
          }
          if (packageJson.devDependencies && packageJson.devDependencies[sdk]) {
            packageJson.devDependencies[sdk] = sdkVersions[sdk];
            updated = true;
          }
        });
        if (updated) {
          fs.writeFileSync(fullPath, JSON.stringify(packageJson, null, 2));
          console.log(`Updated ${fullPath}`);
        }
      } catch (error) {
        console.error(`Error updating ${fullPath}:`, error);
      }
    }
  });
};

const updatePomXmlVersion = async (filePath, sdkVersions) => {
  try {
    const pomContent = fs.readFileSync(filePath, 'utf8');
    const parsedPomContent = await parseString(pomContent, {
      explicitArray: true,
      preserveChildrenOrder: true,
      mergeAttrs: true,
    });

    let updated = false;

    // Function to update versions in a list of dependencies
    const updateDependencies = (dependencies) => {
      dependencies.forEach((dependency) => {
        const artifactId = dependency.artifactId[0];
        const sdkVersionKey = `maven-${artifactId}`;

        if (sdkVersions[sdkVersionKey]) {
          dependency.version[0] = sdkVersions[sdkVersionKey];
          updated = true;
          console.log(
            `Updated ${artifactId} version to: ${sdkVersions[sdkVersionKey]} in ${filePath}`
          );
        }
      });
    };

    // Update direct dependencies
    if (
      parsedPomContent.project.dependencies &&
      parsedPomContent.project.dependencies[0].dependency
    ) {
      updateDependencies(parsedPomContent.project.dependencies[0].dependency);
    }

    // Update managed dependencies
    if (
      parsedPomContent.project.dependencyManagement &&
      parsedPomContent.project.dependencyManagement[0].dependencies[0]
        .dependency
    ) {
      updateDependencies(
        parsedPomContent.project.dependencyManagement[0].dependencies[0]
          .dependency
      );
    }

    if (updated) {
      const updatedPomContent = builder.buildObject(parsedPomContent);
      fs.writeFileSync(filePath, updatedPomContent);
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
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
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
  const sdkVersions = getSdkVersions();

  if (sdkVersions) {
    for (const dirPath of directoriesToUpdate) {
      updatePackageJsonDependencies(dirPath, sdkVersions);
      await findAndUpdatePomFiles(dirPath, sdkVersions);
    }
  } else {
    console.error('Failed to get SDK versions from sdk-versions.json');
  }
}

propagateVersions().catch(console.error);
