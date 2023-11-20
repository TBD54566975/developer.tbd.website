import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
    test: {
        testTimeout: 40000,
        hookTimeout: 40000,
    }
})