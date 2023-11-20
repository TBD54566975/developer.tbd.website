const fs = require('fs');
const path = require('path');
const glob = require('glob');

function checkVersionRanges(packageJsonPath) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  console.log(`Checking ${packageJsonPath}`);

  ['dependencies', 'devDependencies', 'peerDependencies'].forEach((depType) => {
    if (packageJson[depType]) {
      Object.entries(packageJson[depType]).forEach(([dep, version]) => {
        if (version.includes('^') || version.includes('~')) {
          throw new Error(
            `Version range found in ${depType} for ${dep}: ${version}`
          );
        }
      });
    }
  });
}

function findPackageJsonFiles() {
  const directories = ['site', 'examples', 'apps'];

  directories.forEach((directory) => {
    const directoryPath = path.join(__dirname, directory, '**', 'package.json');
    const packageJsonFiles = glob.sync(directoryPath);

    packageJsonFiles.forEach((packageJsonPath) => {
      checkVersionRanges(packageJsonPath);
    });
  });

  checkVersionRanges(path.join(__dirname, 'package.json'));
}

findPackageJsonFiles();

console.log('All dependencies are pinned to specific versions.');
