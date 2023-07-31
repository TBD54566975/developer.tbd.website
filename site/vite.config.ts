/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
        enabled: true,
        name: 'webdriverio',
    }
  },
})