// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const { components } = require('./data/remote-md.json');
const linkTypes = {
  discussions: {
    text: 'View Discussions',
  },
  issues: {
    text: 'View Issues',
  },
  github: {
    text: 'View on Github',
  },
};

const linkcode = '<a href="#url#">#text#</a>';

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
          let fileData = components['tbdex-protocol'].find((file) => {
            return file.file === filename;
          });

          let links = '';
          if (fileData.links) {
            fileData.links.forEach((ele, idx) => {
              if (idx === 0) {
                links += '<div class="flex gap-12 mb-20">';
              }

              links += `${linkcode
                .replace('#url#', ele.url)
                .replace('#text#', linkTypes[ele.type].text)}`;

              if (idx === fileData.links.length - 1) {
                links += '</div>';
              }
            });
          }

          if (fileData) {
            return {
              content: `<div  class="prose prose-pink">
              ${links}

${content}

</div>`, // <-- this last part adds in the rest of the content, which would otherwise be discarded
            };
          }

          return undefined;
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
          let fileData = components['dwn-sdk-js'].find((file) => {
            return file.file === filename;
          });

          let links = '';
          if (fileData.links) {
            fileData.links.forEach((ele, idx) => {
              if (idx === 0) {
                links += '<div class="flex gap-12 mb-20">';
              }

              links += `${linkcode
                .replace('#url#', ele.url)
                .replace('#text#', linkTypes[ele.type].text)}`;

              if (idx === fileData.links.length - 1) {
                links += '</div>';
              }
            });
          }

          if (fileData) {
            return {
              content: `<div  class="prose prose-pink">
              ${links}

${content}

</div>`, // <-- this last part adds in the rest of the content, which would otherwise be discarded
            };
          }
          return undefined;
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
          let fileData = components['ssi-service'].find((file) => {
            return file.file === filename;
          });

          let links = '';
          if (fileData.links) {
            fileData.links.forEach((ele, idx) => {
              if (idx === 0) {
                links += '<div class="flex gap-12 mb-20">';
              }

              links += `${linkcode
                .replace('#url#', ele.url)
                .replace('#text#', linkTypes[ele.type].text)}`;

              if (idx === fileData.links.length - 1) {
                links += '</div>';
              }
            });
          }

          if (fileData) {
            return {
              content: `<div  class="prose prose-pink">
              ${links}

${content}

</div>`, // <-- this last part adds in the rest of the content, which would otherwise be discarded
            };
          }
          return undefined;
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
          let fileData = components['ssi-sdk'].find((file) => {
            return file.file === filename;
          });

          let links = '';
          if (fileData.links) {
            fileData.links.forEach((ele, idx) => {
              if (idx === 0) {
                links += '<div class="flex gap-12 mb-20">';
              }

              links += `${linkcode
                .replace('#url#', ele.url)
                .replace('#text#', linkTypes[ele.type].text)}`;

              if (idx === fileData.links.length - 1) {
                links += '</div>';
              }
            });
          }

          if (fileData) {
            return {
              content: `<div  class="prose prose-pink">
              ${links}

${content}

</div>`, // <-- this last part adds in the rest of the content, which would otherwise be discarded
            };
          }
          return undefined;
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
          alt: 'My Site Logo',
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
