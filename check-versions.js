const fs = require('fs');
const path = require('path');
const glob = require('glob');

function checkVersionRanges(packageJsonPath) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const packageName = packageJson.name || 'Unknown Package';

  console.log(`Checking ${packageName} at ${packageJsonPath}`);

  ['dependencies', 'devDependencies', 'peerDependencies'].forEach((depType) => {
    if (packageJson[depType]) {
      Object.entries(packageJson[depType]).forEach(([dep, version]) => {
        if (version.includes('^') || version.includes('~')) {
          throw new Error(
            `Version range found in ${depType} for ${dep} (${version}) in package: ${packageName}`
          );
        }
      });
    }
  });
}

function findPackageJsonFiles() {
  const directories = ['site', 'examples', 'apps'];

  directories.forEach((directory) => {
    // Use a more inclusive glob pattern that traverses all subdirectories
    const directoryPath = path.join(__dirname, directory, '**', 'package.json');
    const packageJsonFiles = glob.sync(directoryPath, {
      ignore: '**/node_modules/**', // Make sure to ignore node_modules
    });

    packageJsonFiles.forEach((packageJsonPath) => {
      checkVersionRanges(packageJsonPath);
    });
  });

  // Check the root package.json as well
  checkVersionRanges(path.join(__dirname, 'package.json'));
}

try {
  findPackageJsonFiles();
  console.log('All dependencies are pinned to specific versions.');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
