const tokens = require('./src/css/jsvariables');

module.exports = {
  important: true, //Added this so that the tailwind classes override the existing css definitions.
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        tablet: '768px',
        // => @media (min-width: 768px) { ... }

        desktop: '1024px',
        // => @media (min-width: 1024px) { ... }
      },
      backgroundImage: {
        'home-top-glitch-mobile': 'url(/images/home-glitch-top-mobile.svg)',
        'home-bottom-glitch-mobile':
          'url(/images/home-glitch-bottom-mobile.svg)',
        'home-top-glitch-tablet': 'url(/images/home-glitch-top-tablet.svg)',
        'home-bottom-glitch-tablet':
          'url(/images/home-glitch-bottom-tablet.svg)',
        'home-top-glitch-desktop': 'url(/images/home-glitch-top-desktop.svg)',
        'home-bottom-glitch-desktop':
          'url(/images/home-glitch-bottom-desktop.svg)',
        'mobile-menu-glitch-bottom':
          'url(/images/mobile-menu-glitch-bottom.svg)',
        'mobile-menu-glitch-bottom-dark':
          'url(/images/mobile-menu-glitch-bottom-dark.svg)',
        'home-top-glitch-mobile-dark':
          'url(/images/home-glitch-top-mobile-dark.svg)',
        'home-bottom-glitch-mobile-dark':
          'url(/images/home-glitch-bottom-mobile-dark.svg)',
        'home-top-glitch-tablet-dark':
          'url(/images/home-glitch-top-tablet-dark.svg)',
        'home-bottom-glitch-tablet-dark':
          'url(/images/home-glitch-bottom-tablet-dark.svg)',
        'home-top-glitch-desktop-dark':
          'url(/images/home-glitch-top-desktop-dark.svg)',
        'home-bottom-glitch-desktop-dark':
          'url(/images/home-glitch-bottom-desktop-dark.svg)',
        'slash-light': 'url(/img/divider-slash-light.svg)',
        'slash-dark': 'url(/img/divider-slash-dark.svg)',
        'dotted-legal': 'url(/img/divider-dotted-white.svg)',
        'dotted-light': 'url(/img/divider-dotted-light.svg)',
        'dotted-dark': 'url(/img/divider-dotted-dark.svg)',
        'vertical-divider': 'url(/img/vertical-divider.svg)',
      },
      spacing: {
        8.5: `calc(((34 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        13.5: `calc(((54 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        15: `calc(((60 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        17: `calc(((68 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        18: `calc(((72 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        19.5: `calc(((78 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        30: `calc(((120 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        39: `calc(((156 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        45: `calc(((180 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        50: `calc(((200 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
        62: `calc(((248 / ${tokens.TypographyBaseFontSize}) * 1rem))`,
      },
      fontWeight: {
        'copy': `${tokens.FontBody1D.fontWeight}`,
        'copy-mobile': `${tokens.FontBody1M.fontWeight}`,
        'copy-sm': `${tokens.FontBody2D.fontWeight}`,
        'copy-sm-mobile': `${tokens.FontBody2M.fontWeight}`,
        'copy-footer': `${tokens.FontLinksD.fontWeight}`,
        'copy-footer-mobile': `${tokens.FontLinksM.fontWeight}`,
        'nav-links': `${tokens.FontLinksD.fontWeight}`,
        'nav-links-mobile': `${tokens.FontLinksM.fontWeight}`,
        'button-text': `${tokens.FontLinksD.fontWeight}`,
        'button-text-mobile': `${tokens.FontLinksM.fontWeight}`,
        'h1': `${tokens.FontH1D.fontWeight}`,
        'h2': `${tokens.FontH2D.fontWeight}`,
        'h3': `${tokens.FontH3D.fontWeight}`,
        'h4': `${tokens.FontH4D.fontWeight}`,
        'h1-tablet': `${tokens.FontH1T.fontWeight}`,
        'h1-mobile': `${tokens.FontH1M.fontWeight}`,
        'h2-mobile': `${tokens.FontH2M.fontWeight}`,
        'h3-mobile': `${tokens.FontH3M.fontWeight}`,
        'h4-mobile': `${tokens.FontH4M.fontWeight}`,
      },
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
        'button-text': [
          `calc(((${tokens.FontLinksD.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontLinksD.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
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
        'h3': [
          `calc(((${tokens.FontH3D.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH3D.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'h4': [
          `calc(((${tokens.FontH4D.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH4D.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'h1-tablet': [
          `calc(((${tokens.FontH1T.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH1T.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
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
        'h3-mobile': [
          `calc(((${tokens.FontH3M.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH3M.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
        'h4-mobile': [
          `calc(((${tokens.FontH4M.fontSize} / ${tokens.TypographyBaseFontSize}) * 1rem))`,
          {
            lineHeight: `calc((${tokens.FontH4M.lineHeight} / ${tokens.TypographyBaseFontSize} * 1rem))`,
          },
        ],
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
      colors: {
        'primary-yellow': 'var(--color-yellow)',
        'primary-black': 'var(--color-black)',
        'primary-white': 'var(--color-white)',
        'accent-cyan': 'var(--color-blue)',
        'accent-purple': 'var(--color-purple)',
      },
      fontFamily: {
        sans: [tokens.FontBody1D.fontFamily],
        heading: [tokens.FontBody1D.fontFamily],
      },
      typography: ({ theme }) => ({
        pink: {
          css: {
            '--tw-prose-body': theme('colors.primary-yellow'),
            '--tw-prose-headings': theme('colors.primary-yellow'),
            '--tw-prose-lead': theme('colors.primary-yellow'),
            '--tw-prose-links': theme('colors.accent-cyan'),
            '--tw-prose-bold': theme('colors.primary-yellow'),
            '--tw-prose-counters': theme('colors.primary-yellow'),
            '--tw-prose-bullets': theme('colors.primary-yellow'),
            '--tw-prose-hr': theme('colors.primary-yellow'),
            '--tw-prose-quotes': theme('colors.primary-yellow'),
            '--tw-prose-quote-borders': theme('colors.primary-yellow'),
            '--tw-prose-captions': theme('colors.primary-yellow'),
            '--tw-prose-code': theme('colors.primary-yellow'),
            '--tw-prose-pre-code': theme('colors.primary-yellow'),
            '--tw-prose-pre-bg': theme('colors.primary-black'),
            '--tw-prose-th-borders': theme('colors.primary-yellow'),
            '--tw-prose-td-borders': theme('colors.primary-yellow'),
            '--tw-prose-invert-body': theme('colors.primary-black'),
            '--tw-prose-invert-headings': theme('colors.primary-black'),
            '--tw-prose-invert-lead': theme('colors.primary-black'),
            '--tw-prose-invert-links': theme('colors.primary-black'),
            '--tw-prose-invert-bold': theme('colors.primary-black'),
            '--tw-prose-invert-counters': theme('colors.primary-black'),
            '--tw-prose-invert-bullets': theme('colors.primary-black'),
            '--tw-prose-invert-hr': theme('colors.primary-black'),
            '--tw-prose-invert-quotes': theme('colors.primary-black'),
            '--tw-prose-invert-quote-borders': theme('colors.primary-black'),
            '--tw-prose-invert-captions': theme('colors.primary-black'),
            '--tw-prose-invert-code': theme('colors.primary-black'),
            '--tw-prose-invert-pre-code': theme('colors.primary-black'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.primary-black'),
            '--tw-prose-invert-td-borders': theme('colors.primary-black'),
            '--ifm-code-background': theme('colors.accent-cyan'),
            '--ifm-heading-font-family': theme('fontFamily.sans'),
            '--ifm-link-hover-color': theme('colors.accent-cyan'),
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
      _: 'text-h1-mobile desktop:text-h1 font-h1-mobile desktop:font-h1 tablet:text-h1-tablet',
      caps: 'uppercase',
    },
    'h2': {
      _: 'text-h2-mobile tablet:text-h2 font-h2-mobile tablet:font-h2',
      caps: 'uppercase',
    },
    'h3': {
      _: 'text-h3-mobile tablet:text-h3 font-h3-mobile tablet:font-h3',
      caps: 'uppercase',
    },
    'h4': {
      _: 'text-h4-mobile tablet:text-h4 font-h4-mobile tablet:font-h4',
      caps: 'uppercase',
    },
    'copy':
      'text-copy-mobile tablet:text-copy font-copy-mobile tablet:font-copy',
    'copy-sm':
      'text-copy-sm-mobile tablet:text-copy-sm font-copy-sm-mobile tablet:font-copy-sm',
    'copy-footer':
      'text-copy-footer-mobile tablet:text-copy-footer font-copy-footer-mobile tablet:font-copy-footer',
    'nav-links':
      'text-nav-links-mobile tablet:text-nav-links font-nav-links-mobile tablet:font-nav-links',
    'button-text': 'text-button-text font-button-text',
  },
};
