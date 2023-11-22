function findPackageJsonFiles() {
  const directories = ['site', 'examples', 'apps'];

  directories.forEach((directory) => {
    // Exclude node_modules directories in the glob pattern
    const directoryPath = path.join(
      __dirname,
      directory,
      '**',
      '!node_modules',
      '**',
      'package.json'
    );
    const packageJsonFiles = glob.sync(directoryPath, {
      ignore: '**/node_modules/**',
    });

    packageJsonFiles.forEach((packageJsonPath) => {
      checkVersionRanges(packageJsonPath);
    });
  });

  checkVersionRanges(path.join(__dirname, 'package.json'));
}
