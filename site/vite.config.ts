import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
    '/examples/*',
    '/site/*',
    {
      test: {
        globals: true
      }
    }
])