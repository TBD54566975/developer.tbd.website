const { fontFamily } = require("tailwindcss/defaultTheme");
const twBlock = require("./tw-block.plugin");
const twComponents = require("./tw-block-components.plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    "bg-tbd-teal",
    "bg-tbd-purple-tint-2",
    "bg-tbd-yellow",
    "bg-tbd-yellow-shade-1",
    "bg-tbd-red",
    "text-tbd-teal",
    "text-tbd-purple",
    "text-tbd-yellow",
    "text-tbd-info",
    "text-tbd-warn",
    "text-tbd-red",
    "border-tbd-info",
    "border-tbd-warn",
    "border-tbd-teal",
    "border-tbd-danger",
    "border-tbd-yellow",
    "data-[state=open]:text-tbd-teal",
    "data-[state=open]:text-tbd-purple",
    "data-[state=open]:text-tbd-yellow",
  ],
  mode: "jit",
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html,mdx,md}"],
  theme: {
    extend: {
      colors: {
        "tbd-yellow-tint-2": "#FFF870",
        "tbd-yellow-tint-1": "#FFF53D",
        "tbd-yellow": "#FFEC19",
        "tbd-yellow-shade-1": "#FAE100",
        "tbd-yellow-shade-2": "#F5D800",
        "tbd-teal-tint-1": "#70FAFF",
        "tbd-teal-tint-2": "#52F9FF",
        "tbd-teal": "#1AF1FF",
        "tbd-teal-shade-1": "#00E5FA",
        "tbd-teal-shade-2": "#00D8F0",
        "tbd-info": "#3BCE07",
        "tbd-warn": "#FF7A1A",
        "tbd-danger": "#FF401D",
        "tbd-red": "#FF401D",
        "tbd-purple-tint-2": "#BA6BFF",
        "tbd-purple-tint-1": "#A033FF",
        "tbd-purple": "#9A1AFF",
        "tbd-purple-shade-1": "#9500FF",
        "tbd-purple-shade-2": "#8F00F5",
        "tbd-gray-tint-2": "#2E2E2E",
        "tbd-gray-tint-1": "#262626",
        "tbd-gray": "#212121",
        "tbd-gray-shade-1": "#1A1A1A",
        "tbd-gray-shade-2": "#0F0F0F",
        "dark-grey": "#141414",
        white: "#FFF",
      },
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
        jakarta: ['"Plus Jakarta Sans"', ...fontFamily.sans],
        mono: ['"Fira Code"', ...fontFamily.mono],
        spaceGrotesk: ["SpaceGrotesk", "sans-serif"],
        basis: ["Basis", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
      },
      screens: {
        lg: "997px",
      },
      fontSize: {
        "1.2lg": ["1.625rem", { lineHeight: "1.869rem" }],
        "2.5xl": ["1.75rem", { lineHeight: "2.275rem" }],
        "4.5xl": ["2.625rem", { lineHeight: "3.019rem" }],
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "accordion-down": "accordion-down 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        fadeIn: "fadeIn 0.5s ease forwards",
        fadeOut: "fadeOut 0.5s ease forwards",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      space: {
        1.25: "0.313rem",
      },
      gridTemplateColumns: {
        12: "repeat(12, minmax(0, 1fr))",
        15: "repeat(15, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
      },
    },
  },
  plugins: [twBlock, twComponents],
};
