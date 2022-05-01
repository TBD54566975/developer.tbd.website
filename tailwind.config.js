const tokens = require('./src/css/jsvariables');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      mobile: '520px',
      // => @media (min-width: 520px) { ... }

      tablet: '768px',
      // => @media (min-width: 768px) { ... }

      desktop: '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      fontSize: {
        'copy': [
          `calc(((${tokens.FontBody1D.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontBody1D.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'copy-mobile': [
          `calc(((${tokens.FontBody1M.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontBody1M.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'copy-sm': [
          `calc(((${tokens.FontBody2D.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontBody2D.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'copy-sm-mobile': [
          `calc(((${tokens.FontBody2M.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontBody2M.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'copy-footer': [
          `calc(((${tokens.FontLinksD.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontLinksD.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'copy-footer-mobile': [
          `calc(((${tokens.FontLinksM.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontLinksM.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'nav-links': [
          `calc(((${tokens.FontLinksD.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontLinksD.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'nav-links-mobile': [
          `calc(((${tokens.FontLinksM.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontLinksM.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'h1': [
          `calc(((${tokens.FontH1D.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH1D.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'h2': [
          `calc(((${tokens.FontH2D.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH2D.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'h1-mobile': [
          `calc(((${tokens.FontH1M.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH1M.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'h2-mobile': [
          `calc(((${tokens.FontH2M.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH2M.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
      },
      boxShadow: {
        'button-sh':
          '2px 2px 0px 0px var(--color-black), 4px 4px 0px 0px var(--color-black), 6px 6px 0px 0px var(--color-black), 8px 8px 0px 0px var(--color-black)',
        'button-sh-hv':
          '2px 2px 0px 0px var(--color-black), 4px 4px 0px 0px var(--color-black)',
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
      colors: {
        'primary-yellow': 'var(--color-yellow)',
        'primary-black': 'var(--color-black)',
        'primary-white': 'var(--color-white)',
        'accent-cyan': 'var(--color-blue)',
        'accent-purple': 'var(--color-purple)',
      },
      fontFamily: {
        sans: [tokens.FontBody1D.fontFamily, 'sans-serif'],
        heading: [tokens.FontBody1D.fontFamily, 'sans-serif'],
      },
      typography: ({ theme }) => ({
        pink: {
          css: {
            '--tw-prose-body': theme('colors.primary-black'),
            '--tw-prose-headings': theme('colors.primary-black'),
            '--tw-prose-lead': theme('colors.primary-black'),
            '--tw-prose-links': theme('colors.accent-blue'),
            '--tw-prose-bold': theme('colors.primary-black'),
            '--tw-prose-counters': theme('colors.primary-black'),
            '--tw-prose-bullets': theme('colors.primary-black'),
            '--tw-prose-hr': theme('colors.primary-black'),
            '--tw-prose-quotes': theme('colors.primary-black'),
            '--tw-prose-quote-borders': theme('colors.primary-black'),
            '--tw-prose-captions': theme('colors.primary-black'),
            '--tw-prose-code': theme('colors.primary-black'),
            '--tw-prose-pre-code': theme('colors.primary-black'),
            '--tw-prose-pre-bg': theme('colors.primary-black'),
            '--tw-prose-th-borders': theme('colors.primary-black'),
            '--tw-prose-td-borders': theme('colors.primary-black'),
            '--tw-prose-invert-body': theme('colors.primary-yellow'),
            '--tw-prose-invert-headings': theme('colors.primary-yellow'),
            '--tw-prose-invert-lead': theme('colors.primary-yellow'),
            '--tw-prose-invert-links': theme('colors.primary-yellow'),
            '--tw-prose-invert-bold': theme('colors.primary-yellow'),
            '--tw-prose-invert-counters': theme('colors.primary-yellow'),
            '--tw-prose-invert-bullets': theme('colors.primary-yellow'),
            '--tw-prose-invert-hr': theme('colors.primary-yellow'),
            '--tw-prose-invert-quotes': theme('colors.primary-yellow'),
            '--tw-prose-invert-quote-borders': theme('colors.primary-yellow'),
            '--tw-prose-invert-captions': theme('colors.primary-yellow'),
            '--tw-prose-invert-code': theme('colors.primary-yellow'),
            '--tw-prose-invert-pre-code': theme('colors.primary-yellow'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.primary-yellow'),
            '--tw-prose-invert-td-borders': theme('colors.primary-yellow'),
            '--ifm-code-background': theme('colors.accent-purple'),
            '--ifm-heading-font-family': theme('fontFamily.sans'),
          },
        },
      }),
    },
  },
  plugins: [
    require('tailwind-component-classes'),
    require('@tailwindcss/typography'),
  ],
  components: {
    'h1': {
      _: 'text-h1-mobile tablet:text-h1',
      caps: 'uppercase',
    },
    'h2': {
      _: 'text-h2-mobile tablet:text-h2',
      caps: 'uppercase',
    },
    'copy': 'text-copy-mobile tablet:text-copy text-copy-mobile',
    'copy-sm': 'text-copy-sm-mobile tablet:text-copy-sm',
    'copy-footer': 'text-copy-footer-mobile tablet:text-copy-footer',
    'nav-links': 'text-nav-links-mobile tablet:text-nav-links',
  },
};
