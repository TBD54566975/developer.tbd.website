module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './blog/**/*.{js,jsx,ts,tsx,md,mdx}',
    './events/**/*.{js,jsx,ts,tsx,md,mdx}',
    './learn/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  //   darkMode: ['class', '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
  theme: {
    extend: {},
  },
  plugins: [],
};
