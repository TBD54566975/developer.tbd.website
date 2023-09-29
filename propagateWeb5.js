const fs = require("fs");
const path = require("path");

const rootPackageJsonPath = path.resolve(__dirname, "package.json");
const tutorialsDir = path.resolve(__dirname, "./examples/tutorials");

const getApiVersion = () => {
  const rootPackageJsonContent = fs.readFileSync(rootPackageJsonPath, "utf8");
  const rootPackageJson = JSON.parse(rootPackageJsonContent);
  return rootPackageJson.dependencies["@web5/api"];
};

const updateTutorialsDependencies = (apiVersion) => {
  const updatePackageJson = (dirPath) => {
    const packageJsonPath = path.join(dirPath, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
      const packageJson = JSON.parse(packageJsonContent);
      packageJson.dependencies = packageJson.dependencies || {};
      packageJson.dependencies["@web5/api"] = apiVersion;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
  };

  fs.readdirSync(tutorialsDir, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory()) {
      updatePackageJson(path.join(tutorialsDir, dirent.name));
    }
  });
};

const propagateDependency = () => {
  const apiVersion = getApiVersion();
  if (apiVersion) {
    updateTutorialsDependencies(apiVersion);
  } else {
    console.error(
      "Failed to get the version of @web5/api from the root package.json"
    );
  }
};

propagateDependency();
