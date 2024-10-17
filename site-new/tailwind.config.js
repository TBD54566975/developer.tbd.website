const { fontFamily } = require("tailwindcss/defaultTheme");
const twBlock = require("./tw-block.plugin");
const twComponents = require("./tw-block-components.plugin");
const plugin = require('tailwindcss/plugin')

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
    "border-tbd-purple",
    "data-[state=open]:text-tbd-teal",
    "data-[state=open]:text-tbd-purple",
    "data-[state=open]:text-tbd-yellow",
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
    "line-clamp-3",
    "line-clamp-2",
    "line-clamp-1",
  ],
  mode: "jit",
  corePlugins: {
    preflight: false,
    // container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html,mdx,md}"],
  theme: {
    extend: {
      colors: {
        "ifm-color-primary": "var(--ifm-color-primary)",
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
        "tbd-purple-tint-2": "#CB8FFF",
        "tbd-purple-tint-1": "#C786FF",
        "tbd-purple": "#C17AFF",
        "tbd-purple-shade-1": "#B968FF",
        "tbd-purple-shade-2": "#B455FF",
        "tbd-gray-tint-2": "#2E2E2E",
        "tbd-gray-tint-1": "#262626",
        "tbd-gray": "#212121",
        "tbd-gray-shade-1": "#1A1A1A",
        "tbd-gray-shade-2": "#0F0F0F",
        "dark-grey": "#141414",
      },
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
        mono: ['"Fira Code"', ...fontFamily.mono],
        spaceGrotesk: ["SpaceGrotesk", "sans-serif"],
        basis: ["Basis", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
      },
      border: {
        1: "1px",
        3: "3px",
      },
      screens: {
        lg: "997px",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "accordion-down": "accordion-down 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.87, 0, 0.13, 1)",
        fadeIn: "fadeIn 0.5s ease forwards",
        fadeOut: "fadeOut 0.5s ease forwards",
        caret: "blink 800ms infinite",
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
        blink: {
          "0%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
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
      // perhaps font utility sizes should align with the style sheet from figma https://www.figma.com/design/vzQz0IgCT37UxdEbgn1nPw/%F0%9F%8C%95-tbd-web---reviews?node-id=5820-40964&m=dev
      // fontSize: {
      //   xs: ['0.75rem', { 
      //     lineHeight: '1rem',
      //     fontWeight: '500',
      //   }],
      //   sm: ['0.875rem', {
      //     lineHeight: '1.25rem',
      //     fontWeight: '500',
      //   }],
      //   base: ['1rem', {
      //     lineHeight: '1.5rem',
      //     fontWeight: '500',
      //   }],
      //   lg: ['1.125rem', {
      //     lineHeight: '1.75rem',
      //     fontWeight: '500',
      //   }],
      //   xl: ['1.25rem', {
      //     lineHeight: '1.75rem',
      //     fontWeight: '500',
      //   }],
      //   '2xl': ['1.5rem', {
      //     lineHeight: '2rem',
      //     fontWeight: '500',
      //   }],
      //   '3xl': ['1.875rem', {
      //     lineHeight: '2.25rem',
      //     fontWeight: '500',
      //   }],
      //   '4xl': ['1.875rem', {
      //     lineHeight: '2.25rem',
      //     fontWeight: '500',
      //   }],
      // },
    },
    },
    plugins: [
    twBlock,
    twComponents,
    // https://tailwindcss.com/docs/plugins#adding-base-styles
    plugin(function({ addBase, theme }) {
      const elements = ['h1', 'h2', 'h3', 'h4', 'p', 'button'];
      elements.forEach(tag => {
        addBase({
          [tag]: {
            fontFamily: theme('fontFamily.spaceGrotesk').join(','),
            fontWeight: theme('fontWeight.medium'),
            color: theme('colors.white'),
          }
        });
      });

      const mobileStyles = {
        h1: { fontSize: '30px', lineHeight: '110%' },
        h2: { fontSize: '26px', lineHeight: '115%' },
        h3: { fontSize: '22px', lineHeight: '120%' },
        h4: { fontSize: '18px', lineHeight: '130%' },
        p: { fontSize: '14px', lineHeight: '140%', fontWeight: theme('fontWeight.normal') },
        button: { fontSize: '12px', lineHeight: '100%' },
      };

      addBase(mobileStyles);

      const desktopStyles = {
        '@screen lg': {
          h1: { fontSize: '62px', lineHeight: '110%' },
          h2: { fontSize: '42px', lineHeight: '115%' },
          h3: { fontSize: '34px', lineHeight: '120%' },
          h4: { fontSize: '28px', lineHeight: '130%' },
          p: { fontSize: '22px', lineHeight: '140%' },
          button: { fontSize: '18px', lineHeight: '100%' },
        },
      };

      addBase(desktopStyles);
    })
  ],
};