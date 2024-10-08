// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents, matchUtilities }) => {
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
    ".chevron": {
      maskImage: 'url("/img/chevron.svg")',
      height: 16,
      width: 16,
    },
  });
  matchUtilities(
    {
      "text-highlight": (value) => ({
        [`@apply relative inline-block text-tbd-yellow before:absolute before:inset-x-[${value}] before:-bottom-4 before:top-[130%] before:h-8 before:overflow-visible before:bg-tbd-yellow before:bg-no-repeat before:content-[''] before:[-webkit-mask-image:url('/img/highlight-underline.svg')] before:[mask-image:url('/img/highlight-underline.svg')] before:[mask-repeat:no-repeat]`]:
          {},
      }),
    },
    {
      values: {
        full: 0,
        middle: "25%",
        small: "35%",
      },
    },
  );
});
