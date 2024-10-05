import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/**/*.ts"],
    outdir: "dist",
    bundle: true,
    platform: "node",
    target: "es2020",
    format: "esm",
  })
  .catch(() => process.exit(1));
