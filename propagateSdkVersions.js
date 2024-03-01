const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const util = require("util");

// Setup
const sdkVersionsPath = path.resolve(__dirname, "sdk-versions.json");
const directoriesToUpdate = [
  path.resolve(__dirname),
  path.resolve(__dirname, "./examples/tutorials"),
];

const parseString = util.promisify(xml2js.parseString);
const builder = new xml2js.Builder();

// Grab SDK versions from sdk-versions.json
const getSdkVersions = () => {
  try {
    const content = fs.readFileSync(sdkVersionsPath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading sdk-versions.json:", error);
    return null;
  }
};

// recursively run through package.json files
const updatePackageJsonDependencies = (dirPath, sdkVersions) => {
  fs.readdirSync(dirPath, { withFileTypes: true }).forEach((dirent) => {
    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      updatePackageJsonDependencies(fullPath, sdkVersions); // Recursive call
    } else if (dirent.name === "package.json") {
      try {
        const packageJson = JSON.parse(fs.readFileSync(fullPath, "utf8"));
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

// recursively run through pom.xml files
const updatePomXmlVersion = async (dirPath, sdkVersions) => {
  fs.readdirSync(dirPath, { withFileTypes: true }).forEach(async (dirent) => {
    const fullPath = path.join(dirPath, dirent.name);
    if (dirent.isDirectory()) {
      await updatePomXmlVersion(fullPath, sdkVersions); // Recursive call
    } else if (dirent.name === "pom.xml") {
      try {
        const pomContent = await parseString(fs.readFileSync(fullPath, "utf8"));
        const tbdexMavenVersion = sdkVersions["tbdex-maven"];
        if (pomContent.project.properties[0]["version.tbdex"]) {
          pomContent.project.properties[0]["version.tbdex"][0] =
            tbdexMavenVersion;
          const updatedPomContent = builder.buildObject(pomContent);
          fs.writeFileSync(fullPath, updatedPomContent);
          console.log(
            `Updated tbdex-maven version in ${fullPath} to: ${tbdexMavenVersion}`
          );
        }
      } catch (error) {
        console.error(`Failed to update ${fullPath}:`, error);
      }
    }
  });
};

const propagateVersions = async () => {
  const sdkVersions = getSdkVersions();
  if (sdkVersions) {
    for (const dirPath of directoriesToUpdate) {
      updatePackageJsonDependencies(dirPath, sdkVersions);
      await updatePomXmlVersion(dirPath, sdkVersions);
    }
  } else {
    console.error("Failed to get SDK versions from sdk-versions.json");
  }
};

propagateVersions();
