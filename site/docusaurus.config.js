// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require('dotenv').config();
const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const WEB5_VERSION = require('../package.json').dependencies['@web5/api'];

const algoliaApiKey = process.env.DOC_SEARCH_API_KEY;
const algoliaIndexName = process.env.DOC_SEARCH_INDEX_NAME;
const algoliaAppId = process.env.DOC_SEARCH_APP_ID;

const feedbackWidgetApiUrl = process.env.FEEDBACK_WIDGET_API_URL;

let algoliaConfig = null;
if (algoliaApiKey && algoliaIndexName && algoliaAppId) {
  algoliaConfig = {
    appId: algoliaAppId,
    apiKey: algoliaApiKey,
    indexName: algoliaIndexName,
    contextualSearch: true,
    searchParameters: {},
  };
}

/** @type {import('@docusaurus/types').Config} */
let config = {
  title: `TBD`,
  tagline: '',
  organizationName: 'TBD54566975',
  projectName: 'developer.tbd.website',
  baseUrl: '/',
  url: 'https://developer.tbd.website',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  markdown: {
    mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en'],
  // },
  customFields: {
    WEB5_VERSION,
    feedbackWidgetApiUrl,
  },
  plugins: [
    'docusaurus-tailwindcss',
    require.resolve("./webpackPlugin"),
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'events',
    //     path: 'events',
    //     breadcrumbs: false,
    //     routeBasePath: 'events',
    //     sidebarPath: require.resolve('./event-sidebars.js'),
    //   },
    // ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'learn',
    //     path: 'learn',
    //     breadcrumbs: false,
    //     routeBasePath: 'learn',
    //     sidebarPath: require.resolve('./learn-sidebars.js'),
    //   },
    // ],
  ],
  scripts: [
    {
      src: 'https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js',
      async: true,
    },
    {
      src: '/scripts/dd-analytics.js',
      async: true,
    },
    {
      src: '/scripts/custom.js',
      async: true,
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    [
      'redocusaurus',
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          {
            id: 'ssi-sdk',
            spec: 'https://raw.githubusercontent.com/TBD54566975/ssi-service/main/doc/swagger.yaml',
            route: '/docs/apis/ssi-service',
          },
        ],
        // Theme Options for modifying how redoc renders them
        theme: {
          // Change with your site colors
          primaryColor: '#1890ff',
        },
      },
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
            to: '/open-source',
            label: 'Open Source',
            position: 'left',
          },

          {
            to: '/projects',
            label: 'Projects',
            position: 'left',
          },

          // {
          //   to: '/learn',
          //   label: 'Learn',
          //   position: 'left',
          // },

          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },
          // {
          //   to: '/events',
          //   label: 'Events',
          //   position: 'left',
          // },
          {
            to: '/community',
            label: 'Community',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'index',
            to: '/docs',
            label: 'Docs',
            position: 'left',
          },
          {
            to: '#ask',
            label: 'Ask 🤖',
          },
          // {
          //   to: 'https://tbd.website',
          //   position: 'right',
          //   label: 'TBD Home',
          // },
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
                to: '/docs/',
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
        darkTheme: {
          ...darkCodeTheme,
          styles: [
            ...darkCodeTheme.styles,
            {
              types: ['keyword', 'variable'],
              style: {
                color: 'rgb(189, 147, 249)',
              },
            },
          ],
        },
        additionalLanguages: ['kotlin', 'swift', 'dart', 'rust', 'bash', 'gradle'],
      },
    }),
};

if (algoliaConfig) {
  config.themeConfig = {
    ...config.themeConfig,
    algolia: algoliaConfig,
  };
}

module.exports = config;
