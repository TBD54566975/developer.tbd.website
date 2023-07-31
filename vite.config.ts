import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      name: 'chrome',
      enabled: true,
      headless: true
    }
  }
})