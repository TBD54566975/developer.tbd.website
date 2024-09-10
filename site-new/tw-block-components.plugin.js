// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents }) => {
  addComponents({
    ".eyebrow": {
      "@apply font-basis text-[0.625rem] leading-[0.75rem] lg:text-[0.75rem] lg:leading-[0.9rem]":
        {},
    },
  });
});
