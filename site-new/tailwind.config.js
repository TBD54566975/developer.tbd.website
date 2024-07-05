const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html}"],
  theme: {
    colors: {
      "tbd-yellow": "#FFEC19",
      "tbd-yellow-2": "#F5D800",
      "tbd-purple": "#9A1AFF",
      "tbd-blue": "#1AF1FF",
      "dark-grey": "#141414",
      white: "#FFF",
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
        jakarta: ['"Plus Jakarta Sans"', ...fontFamily.sans],
        mono: ['"Fira Code"', ...fontFamily.mono],
        spaceGrotesk: ["SpaceGrotesk", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
      },
      screens: {
        sm: "0px",
        lg: "997px",
      },
    },
  },
  plugins: [],
};
