module.exports = {
  testEnvironment: "jest-environment-jsdom",
  // transform: {
  //   "^.+\\.js$":
  //     "node_modules/.pnpm/babel-jest@29.6.1_@babel+core@7.22.9/node_modules/babel-jest/build/index.js",
  // },
  roots: ["./site/__tests__/"],
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["./resolver.js"],
  transformIgnorePatterns: ["node_modules/(?!(@tbd54566975))/"],
  moduleNameMapper: {
    "^@ipld/dag-cbor$": "<rootDir>/node_modules/@ipld/dag-cbor/src/index.js",
    "^multiformats/cid$":
      "<rootDir>/node_modules/.pnpm/multiformats@12.0.1/node_modules/multiformats/src/cid.js",
    "^ipfs-unixfs-importer$":
      "<rootDir>/node_modules/.pnpm/ipfs-unixfs-importer@15.1.5/node_modules/ipfs-unixfs-importer/src/index.ts",
    "^it-first$":
      "<rootDir>/node_modules/.pnpm/it-first@3.0.2/node_modules/it-first/src/index.ts",
    "^it-parallel-batch$":
      "<rootDir>/node_modules/.pnpm/it-parallel-batch@3.0.1/node_modules/it-batch/src/index.ts",
  },
};
