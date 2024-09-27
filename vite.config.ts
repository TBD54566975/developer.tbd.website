import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 40000,
    hookTimeout: 40000,
    teardownTimeout: 40000,
    exclude: [
      ...configDefaults.exclude,
      "apps/**",
      "**/*.spec.{js,ts,jsx,tsx}",
      "site-new/**",
    ],
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
    setupFiles: [
      "./site/testsuites/testsuite-javascript/__tests__/setup-web5.js",
    ],
  },
});
