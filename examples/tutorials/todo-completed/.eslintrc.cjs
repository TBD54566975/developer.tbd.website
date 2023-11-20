module.exports = {
  parserOptions: {
    ecmaVersion: 2022,
  },
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-strongly-recommended'],
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
    'vue/max-attributes-per-line': [
      'error',
      {
        multiline: {
          max: 4,
        },
        singleline: {
          max: 4,
        },
      },
    ],
    'vue/static-class-names-order': 'error',
    indent: ['error', 2],
  },
};
