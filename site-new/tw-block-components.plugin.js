// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents }) => {
  addComponents({
    ".eyebrow": {
      "@apply font-basis text-[0.625rem] leading-[0.75rem] lg:text-[0.75rem] lg:leading-[0.9rem]":
        {},
    },
    ".unset": {
      all: "unset",
    },
    ".p": {
      "@apply text-sm leading-[1.225rem] lg:text-[1.375rem] lg:leading-[1.925rem]":
        {},
    },
    ".sidebar": {
      "@apply text-[1rem] leading-[1.4rem] lg:text-[1.125rem] lg:leading-[1.575rem] font-medium":
        {},
    },
  });
});
