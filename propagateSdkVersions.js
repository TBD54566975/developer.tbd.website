const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const util = require("util");

// Setup
const sdkVersionsPath = path.resolve(__dirname, "sdk-versions.json");
const directoriesToUpdate = [
  __dirname,
  path.resolve(__dirname, "./examples/tutorials"),
  path.resolve(__dirname, "./site/testsuites"),
];

// Grab SDK versions from sdk-versions.json
const getSdkVersions = async () => {
  try {
    const content = await fs.promises.readFile(sdkVersionsPath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading sdk-versions.json:", error);
    throw error; // Rethrow to handle it in propagateVersions
  }
};

// Update package.json dependencies
const updatePackageJsonDependencies = async (dirPath, sdkVersions) => {
  // Check and update the root or any directory level package.json first
  const packageJsonPath = path.join(dirPath, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(
        await fs.promises.readFile(packageJsonPath, "utf8")
      );
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
        await fs.promises.writeFile(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2)
        );
        console.log(`Updated ${packageJsonPath}`);
      }
    } catch (error) {
      console.error(`Error updating ${packageJsonPath}:`, error);
    }
  }

  // Continue with the original directory processing
  if (fs.lstatSync(dirPath).isDirectory()) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (let dirent of entries) {
      if (dirent.name === "node_modules") continue; // Skip node_modules directory
      const fullPath = path.join(dirPath, dirent.name);
      if (dirent.isDirectory()) {
        await updatePackageJsonDependencies(fullPath, sdkVersions); // Recursive call for subdirectories
      }
    }
  }
};

const updatePomXmlVersion = async (filePath, sdkVersions) => {
  try {
    const pomContent = await fs.promises.readFile(filePath, "utf8");
    let updatedPomContent = pomContent;

    Object.entries(sdkVersions.jvm).forEach(([artifactId, version]) => {
      const versionTagRegex = new RegExp(
        `(<version.xyz.block.${artifactId}>)(.*?)(<\/version.xyz.block.${artifactId}>)`,
        "g"
      );
      if (versionTagRegex.test(pomContent)) {
        console.log(
          `Found matches for ${artifactId}, updating to version ${version}.`
        );
      } else {
        console.log(`No matches found for ${artifactId}.`);
      }
      updatedPomContent = updatedPomContent.replace(
        versionTagRegex,
        `$1${version}$3`
      );
    });

    if (updatedPomContent !== pomContent) {
      await fs.promises.writeFile(filePath, updatedPomContent);
    } else {
    }
  } catch (error) {
    console.error(`Failed to update ${filePath}:`, error);
  }
};

// Function to recursively find and update pom.xml files, excluding node_modules
async function findAndUpdatePomFiles(dirPath, sdkVersions) {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (let dirent of entries) {
    if (dirent.name === "node_modules") continue; // Skip node_modules directory

    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await findAndUpdatePomFiles(fullPath, sdkVersions); // Recursive call for directories
    } else if (dirent.name === "pom.xml") {
      await updatePomXmlVersion(fullPath, sdkVersions); // Directly update pom.xml files
    }
  }
}

// Function to update Package.swift dependencies
const updatePackageSwiftDependencies = async (dirPath, sdkVersions) => {
  const packageSwiftPath = path.join(dirPath, "Package.swift");

  try {
    const packageSwiftContent = await fs.promises.readFile(
      packageSwiftPath,
      "utf8"
    );
    let updatedPackageSwiftContent = packageSwiftContent;

    Object.keys(sdkVersions.swift).forEach((dependency) => {
      const { url, branch } = sdkVersions.swift[dependency];
      const regex = new RegExp(
        `\\.package\\(url: "${url}", branch: ".*?"\\)`,
        "g"
      );
      updatedPackageSwiftContent = updatedPackageSwiftContent.replace(
        regex,
        `.package(url: "${url}", branch: "${branch}")`
      );
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
    if (dirent.name === "node_modules") continue; // Skip node_modules directory

    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await findAndUpdatePackageSwift(fullPath, sdkVersions); // Recursive call for directories
    } else if (dirent.name === "Package.swift") {
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
      await findAndUpdatePomFiles(dirPath, sdkVersions);
      await findAndUpdatePackageSwift(dirPath, sdkVersions); // Add this line to update Swift dependencies
    }
  } catch (error) {
    console.error("Failed to propagate versions:", error);
  }
}

propagateVersions();
