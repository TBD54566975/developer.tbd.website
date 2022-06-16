// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { components } = require('./data/remote-md.json');
const modContent = require('./src/util/remote-content-modification.js');
const metacontent = require('./src/content/global-meta');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `${metacontent.site_name}`,
  tagline: '',
  organizationName: 'TBD54566975',
  projectName: 'developer.tbd.website',
  baseUrl: '/',
  url: 'https://developer.tbd.website',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
    [
      require.resolve('docusaurus-gtm-plugin'),
      {
        id: 'GTM-5X8H2X3', // GTM Container ID
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'learn',
        path: 'learn',
        routeBasePath: 'learn',
        sidebarPath: require.resolve('./learn-sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'events',
        path: 'events',
        routeBasePath: 'events',
        sidebarPath: require.resolve('./event-sidebars.js'),
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        // options here
        name: 'some-content3', // used by CLI, must be path safe
        sourceBaseUrl:
          'https://raw.githubusercontent.com/TBD54566975/dwn-sdk-js/main/', // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: 'src/pages/projects/dwn-sdk-js', // the base directory to output to.
        documents: components['dwn-sdk-js'].map((data) => {
          return data.file;
        }), // the file names to download
        modifyContent(filename, content) {
          return modContent(filename, content, 'dwn-sdk-js');
        },
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        // options here
        name: 'some-content4', // used by CLI, must be path safe
        sourceBaseUrl:
          'https://raw.githubusercontent.com/TBD54566975/ssi-service/main/', // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: 'src/pages/projects/ssi-service', // the base directory to output to.
        documents: components['ssi-service'].map((data) => {
          return data.file;
        }), // the file names to download
        modifyContent(filename, content) {
          return modContent(filename, content, 'ssi-service');
        },
      },
    ],
    [
      'docusaurus-plugin-remote-content',
      {
        // options here
        name: 'some-content5', // used by CLI, must be path safe
        sourceBaseUrl:
          'https://raw.githubusercontent.com/TBD54566975/ssi-sdk/main/', // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: 'src/pages/projects/ssi-sdk', // the base directory to output to.
        documents: components['ssi-sdk'].map((data) => {
          return data.file;
        }), // the file names to download
        modifyContent(filename, content) {
          return modContent(filename, content, 'ssi-sdk');
        },
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          docLayoutComponent: '../src/layout/DocPage',
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },

      navbar: {
        style: 'dark',
        logo: {
          alt: 'TBD-Logo',
          src: 'img/tbd-logo.svg',
        },
        items: [
          {
            to: '/opensource',
            label: 'Open Source',
            position: 'left',
          },

          {
            to: '/projects-index',
            label: 'Projects',
            position: 'left',
          },

          {
            to: '/learn',
            label: 'Learn',
            position: 'left',
          },

          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },

          {
            to: '/events',
            label: 'Events',
            position: 'left',
          },

          {
            to: 'https://tbd.website',
            label: 'TBD Home',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {
          property: 'og:image',
          content: `${metacontent.ogimage}`,
        },
        {
          name: 'description',
          content: `${metacontent.description}`,
        },
        {
          property: 'og:description',
          content: `${metacontent.description}`,
        },
        {
          property: 'og:site_name',
          content: `${metacontent.site_name}`,
        },
      ],
    }),
};

module.exports = config;
