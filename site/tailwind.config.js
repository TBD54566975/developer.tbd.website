module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './docs/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  important: false,
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './blog/**/*.{js,jsx,ts,tsx,md,mdx}',
    './events/**/*.{js,jsx,ts,tsx,md,mdx}',
    './learn/**/*.{js,jsx,ts,tsx,md,mdx}',
    './docs/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'tablet': '768px',
        // => @media (min-width: 768px) { ... }
        'desktop': '1024px',
        // => @media (min-width: 1024px) { ... }
        'desktop-lg': '1200px',
        // => @media (min-width: 1200) { ... }
        'desktop-xl': '1400px',
        // => @media (min-width: 1200) { ... }
        'hd': '1820px',
        // => @media (min-width: 1820px) { ... }
      },
      colors: {
        'primary-yellow': 'var(--color-yellow)',
        'primary-black': 'var(--color-black)',
        'primary-white': 'var(--color-white)',
        'accent-cyan': 'var(--color-blue)',
        'accent-purple': 'var(--color-purple)',
      },
    },
    fontFamily: {
      sans: ['IBM Plex Mono', 'monospace'],
      heading: ['IBM Plex Mono', 'monospace'],
    },
    boxShadow: {
      'button-sh':
        '2px 2px 0px 0px #000, 4px 4px 0px 0px #000, 6px 6px 0px 0px #000, 8px 8px 0px 0px #000',
      'button-sh-hv': '2px 2px 0px 0px #000, 4px 4px 0px 0px #000',
      'button-sh-yellow':
        '2px 2px 0px 0px var(--color-yellow), 4px 4px 0px 0px var(--color-yellow), 6px 6px 0px 0px var(--color-yellow), 8px 8px 0px 0px var(--color-yellow)',
      'button-sh-hv-yellow':
        '2px 2px 0px 0px var(--color-yellow), 4px 4px 0px 0px var(--color-yellow)',
      'button-sh-cyan':
        '2px 2px 0px 0px var(--color-blue), 4px 4px 0px 0px var(--color-blue), 6px 6px 0px 0px var(--color-blue), 8px 8px 0px 0px var(--color-blue)',
      'button-sh-hv-cyan':
        '2px 2px 0px 0px var(--color-blue), 4px 4px 0px 0px var(--color-blue)',
      'button-sh-purple':
        '2px 2px 0px 0px var(--color-purple), 4px 4px 0px 0px var(--color-purple), 6px 6px 0px 0px var(--color-purple), 8px 8px 0px 0px var(--color-purple)',
      'button-sh-hv-purple':
        '2px 2px 0px 0px var(--color-purple), 4px 4px 0px 0px var(--color-purple)',
    },
    plugins: [require('tailwind-component-classes')],
    components: {
      'copy':
        'text-copy-mobile tablet:text-copy font-copy-mobile tablet:font-copy',
      'copy-sm':
        'text-copy-sm-mobile tablet:text-copy-sm font-copy-sm-mobile tablet:font-copy-sm',
      'copy-footer':
        'text-copy-footer-mobile tablet:text-copy-footer font-copy-footer-mobile tablet:font-copy-footer',
      'nav-links':
        'text-nav-links-mobile tablet:text-nav-links font-nav-links-mobile tablet:font-nav-links',
      'button-text': 'text-button-text font-button-text',
      'breadcrumbs-text': 'text-breadcrumbs font-breadcrumbs',
    },
    backgroundImage: {
      'vertical-divider': 'url(/img/vertical-divider.svg)',
    },
  },
};
