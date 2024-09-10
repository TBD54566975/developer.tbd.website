// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import docusaurusEslint from "@docusaurus/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@docusaurus": docusaurusEslint,
    },
    // @ts-ignore
    rules: docusaurusEslint.configs.recommended.rules,
  },
  eslintConfigPrettier,
  {
    rules: {
      "no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      "@typescript-eslint/ban-ts-comment": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-require-imports": ["warn"],
    },
  },
  {
    ignores: ["tailwind.config.js"],
  },
  {
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
  },
);
