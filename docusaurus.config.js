// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { components } = require('./src/content/remote-md.json');
const modContent = require('./src/util/remote-content-modification.js');
const metacontent = require('./src/content/global-meta');

let plugins = [
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
      id: 'events',
      path: 'events',
      breadcrumbs: false,
      routeBasePath: 'events',
      sidebarPath: require.resolve('./event-sidebars.js'),
    },
  ],
];

for (const property in components) {
  //console.log(`${property}: ${components[property]}`);
  let plugin = [
    'docusaurus-plugin-remote-content',
    {
      // options here
      name: components[property]['plugin']['name'], // used by CLI, must be path safe
      sourceBaseUrl: components[property]['plugin']['sourceBaseUrl'], // the base url for the markdown (gets prepended to all of the documents when fetching)
      outDir: components[property]['plugin']['outDir'], // the base directory to output to.
      documents: components[property]['files'].map((data) => {
        return data.file;
      }), // the file names to download
      modifyContent(filename, content) {
        return modContent(filename, content, components[property]['name']);
      },
    },
  ];

  plugins.push(plugin);
}

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
  plugins: plugins,
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          docLayoutComponent: '../src/theme/DocPage',
          id: 'learn',
          path: 'learn',
          routeBasePath: 'learn',
          breadcrumbs: false,
          sidebarPath: require.resolve('./learn-sidebars.js'),
        },
        blog: {
          showReadingTime: false,
          blogListComponent: '../src/theme/BlogListPage',
          blogSidebarCount: 'ALL',
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
            to: '/open-source',
            label: 'Open Source',
            position: 'left',
          },

          {
            to: '/projects',
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
          content:
            'We build decentralized platforms, protocols, and tools that empower every individual to own their data and participate in the global economy.',
        },
        {
          property: 'og:description',
          content:
            'We build decentralized platforms, protocols, and tools that empower every individual to own their data and participate in the global economy.',
        },
        {
          property: 'og:site_name',
          content: `${metacontent.site_name}`,
        },
        {
          property: 'keywords',
          // eslint-disable-next-line prettier/prettier
          content:
            'tbd, tbdex, decentralized identifiers, decentralized ids, verifiable credentials, dwp, decentralized web platform, decentralized web nodes, web5, web3, open source, decentralized bitcoin, decentralized crypto, decentralized exchange, decentralized exchanges, decentralized, defi, decentralized finance',
        },
      ],
    }),
};

module.exports = config;
