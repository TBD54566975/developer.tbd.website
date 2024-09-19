// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents }) => {
  addComponents({
    ".eyebrow": {
      "@apply font-basis text-[0.625rem] leading-[0.75rem] lg:text-[0.75rem] lg:leading-[0.9rem]":
        {},
    },
    ".unset": {
      "@apply p-0 m-0 bg-transparent border-0 text-inherit align-[inherit] border-none border-0 appearance-none":
        {},
    },
    ".p": {
      "@apply text-sm leading-[1.225rem] lg:text-[1.375rem] lg:leading-[1.925rem]":
        {},
    },
    ".publication": {
      "@apply text-xs leading-[1.05rem] lg:text-base lg:leading-[1.4rem] font-semibold":
        {},
    },
    ".sidebar": {
      "@apply text-[1rem] leading-[1.4rem] lg:text-[1.125rem] lg:leading-[1.575rem] font-medium":
        {},
    },
  });
});
