// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { components } = require('./data/remote-md.json');

const modContent = function (filename, content, contentKey) {
  let fileData = components[contentKey].find((file) => {
    return file.file === filename;
  });

  let buttons = '';
  if (fileData.buttons) {
    buttons = `<div className="mb-18"><ButtonGroup buttons={${JSON.stringify(
      fileData.buttons,
    )}} /></div>`;
  }

  let re1 = /```mermaid/g;
  var hasMermaid = false;
  while (re1.exec(content) != null) {
    hasMermaid = true;
    break;
  }

  let re = /```mermaid([\s\S]*?)```/gm;

  if (fileData) {
    return {
      content: `${hasMermaid ? 'import { Mermaid } from "@theme/Mermaid";' : ''}
${
  fileData.buttons
    ? 'import { ButtonGroup } from "@site/src/components/ButtonGroup";'
    : ''
}

<div  class="prose prose-pink">
      ${buttons}

${content.replaceAll(re, '\r<Mermaid chart={`\r$1`}/>\r\r')}

</div>`,
    };
  }

  return undefined;
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TBD',
  tagline: '',
  organizationName: 'TBD54566975',
  projectName: 'developer.tbd.website',
  baseUrl: '/',
  url: 'https://developer.tbd.website',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

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
    /*
    [
      'docusaurus-plugin-remote-content',
      {
        // options here
        name: 'some-content1', // used by CLI, must be path safe
        sourceBaseUrl:
          'https://raw.githubusercontent.com/TBD54566975/tbdex-protocol/main/', // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: 'src/pages/projects/tbdex-protocol', // the base directory to output to.
        documents: ['README.md'], // the file names to download
        modifyContent(filename, content) {
          return {
            content: `<div  class="prose prose-pink">

${content}

</div>`,
          };
        },
      },
    ],
    */
    [
      'docusaurus-plugin-remote-content',
      {
        // options here
        name: 'some-content2', // used by CLI, must be path safe
        sourceBaseUrl:
          'https://raw.githubusercontent.com/TBD54566975/tbdex-protocol/main/', // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: 'src/pages/projects/tbdex-protocol', // the base directory to output to.
        documents: components['tbdex-protocol'].map((data) => {
          return data.file;
        }), // the file names to download
        modifyContent(filename, content) {
          return modContent(filename, content, 'tbdex-protocol');
        },
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

  /*
    [
      'docusaurus-plugin-remote-content',
      {
        // options here
        name: 'some-content1', // used by CLI, must be path safe
        sourceBaseUrl:
          'https://raw.githubusercontent.com/TBD54566975/tbd-project-template/main/', // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: 'docs', // the base directory to output to.
        documents: ['GOVERNANCE.md', 'MAINTAINERS.md', 'CONTRIBUTING.md'], // the file names to download
      },
    ],
    */
  /*
    [
      "docusaurus-plugin-remote-content",
      {
          // options here
          name: "some-content1", // used by CLI, must be path safe
          sourceBaseUrl: "http://localhost:8081/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs", // the base directory to output to.
          documents: ["markd1.md"], // the file names to download
      },
    ],
    [
      "docusaurus-plugin-remote-content",
      {
          // options here
          name: "some-content2", // used by CLI, must be path safe
          sourceBaseUrl: "http://localhost:8082/", // the base url for the markdown (gets prepended to all of the documents when fetching)
          outDir: "docs", // the base directory to output to.
          documents: ["markd2.md"], // the file names to download
      },
    ],
    */

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
          showReadingTime: true,
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
    }),
};

module.exports = config;
