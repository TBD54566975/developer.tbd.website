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
    colors: {
      'primary-yellow': 'var(--color-yellow)',
      'primary-black': 'var(--color-black)',
      'primary-white': 'var(--color-white)',
      'accent-cyan': 'var(--color-blue)',
      'accent-purple': 'var(--color-purple)',
    },
  },
  plugins: [],
};
