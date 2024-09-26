import fs from "fs";
import path from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";

// Setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sdkVersionsPath = path.resolve(__dirname, "sdk-versions.json");
const directoriesToUpdate = [
  __dirname,
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
  const packageJsonPath = path.join(dirPath, "package.json");
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(
        await fs.promises.readFile(packageJsonPath, "utf8")
      );
      let updated = false;
      for (const sdk in sdkVersions.js) {
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

  if (fs.lstatSync(dirPath).isDirectory()) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    for (const dirent of entries) {
      if (dirent.name === "node_modules") continue;
      const fullPath = path.join(dirPath, dirent.name);
      if (dirent.isDirectory()) {
        await updatePackageJsonDependencies(fullPath, sdkVersions);
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
    }
  } catch (error) {
    console.error(`Failed to update ${filePath}:`, error);
  }
};

const findAndUpdatePomFiles = async (dirPath, sdkVersions) => {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (const dirent of entries) {
    if (dirent.name === "node_modules") continue;

    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await findAndUpdatePomFiles(fullPath, sdkVersions);
    } else if (dirent.name === "pom.xml") {
      await updatePomXmlVersion(fullPath, sdkVersions);
    }
  }
};

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
const findAndUpdatePackageSwift = async (dirPath, sdkVersions) => {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (const dirent of entries) {
    if (dirent.name === "node_modules") continue;

    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await findAndUpdatePackageSwift(fullPath, sdkVersions);
    } else if (dirent.name === "Package.swift") {
      await updatePackageSwiftDependencies(dirPath, sdkVersions);
    }
  }
};

// Main function to initiate the version propagation process
const propagateVersions = async () => {
  try {
    const sdkVersions = await getSdkVersions();

    for (const dirPath of directoriesToUpdate) {
      await updatePackageJsonDependencies(dirPath, sdkVersions);
      await findAndUpdatePomFiles(dirPath, sdkVersions);
      await findAndUpdatePackageSwift(dirPath, sdkVersions);
    }
  } catch (error) {
    console.error("Failed to propagate versions:", error);
  }
};

propagateVersions();
