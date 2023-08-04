import resolve from "@rollup/plugin-node-resolve";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

export default {
  input: "index.js",
  output: {
    dir: "public",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: true,
      preserveSymlinks: true,
    }),
    dynamicImportVars({
      include: ["**/*.js"],
    }),
  ],
};