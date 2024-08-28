import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 40000,
    hookTimeout: 40000,
    teardownTimeout: 40000,
    include: ["./site/docs/**/*.{test,spec}.{js,ts,jsx,tsx}"], // Include all test files in site/docs and its subdirectories
    exclude: [...configDefaults.exclude, "apps/**"],
    //TODO: Investigate coverage options later for output files
    // coverage: {
    //   provider: 'istanbul',
    //   enabled: true,
    //   reporter: 'html'
    // },
    // browser: {
    //   name: "chrome",
    //   enabled: true,
    //   headless: true,
    // },
    setupFiles: ["./site/docs/test-utils/setup-web5.js"],
  },
});
