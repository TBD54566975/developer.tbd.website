import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind-pluging.cjs";

// const lightCodeTheme = require("prism-react-renderer").themes.github;
// const darkCodeTheme = require("prism-react-renderer").themes.dracula;

const config: Config = {
  title: "TBDevs",
  tagline: "TBD",
  favicon: "img/favicon.ico",
  plugins: [tailwindPlugin],
  staticDirectories: ["public", "static"],
  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          breadcrumbs: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      logo: {
        alt: "TBD Dev",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "dropdown",
          label: "Community",
          position: "right",
          items: [
            {
              label: "Example 1",
              href: "https://example.com",
            },
            {
              label: "Example 2",
              href: "https://example.com",
            },
            {
              label: "Example 3",
              href: "https://example.com",
            },
            {
              label: "Example 4",
              href: "https://example.com",
            },
            {
              label: "Example 5",
              href: "https://example.com",
            },
          ],
        },
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "right",
          label: "Docs",
        },

        { to: "/blog", label: "Blog", position: "right" },
      ],
    },
    // footer: {
    //   style: "dark",
    //   links: [
    //     {
    //       title: "Docs",
    //       items: [
    //         {
    //           label: "Tutorial",
    //           to: "/docs/intro",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Community",
    //       items: [
    //         {
    //           label: "Stack Overflow",
    //           href: "https://stackoverflow.com/questions/tagged/docusaurus",
    //         },
    //         {
    //           label: "Discord",
    //           href: "https://discordapp.com/invite/docusaurus",
    //         },
    //         {
    //           label: "Twitter",
    //           href: "https://twitter.com/docusaurus",
    //         },
    //       ],
    //     },
    //     {
    //       title: "More",
    //       items: [
    //         {
    //           label: "Blog",
    //           to: "/blog",
    //         },
    //         {
    //           label: "GitHub",
    //           href: "https://github.com/facebook/docusaurus",
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // },
    prism: {
      theme: {
        plain: { color: "white", backgroundColor: "#0F0F0F" },
        styles: [
          {
            types: ["title", "comment"],
            style: { color: "rgba(247, 247, 247, 0.5)" },
          },
          {
            types: ["property"],
            style: {
              color: "#70FAFF",
            },
          },
          {
            types: ["parameter", "interpolation-string"],
            style: {
              color: "#FFEC19",
            },
          },
          {
            types: ["script", "attr-value"],
            style: {
              color: "#C88E76",
            },
          },
          {
            types: ["boolean", "arrow", "atrule", "tag"],
            style: {
              color: "#BD72FF",
            },
          },
          {
            types: ["number", "color", "unit"],
            style: {
              color: "#FFEC19",
            },
          },
          {
            types: ["font-matter"],
            style: {
              color: "#BD72FF",
            },
          },
          {
            types: ["keyword", "rule"],
            style: {
              color: "#BD72FF",
            },
          },
          {
            types: ["regex"],
            style: {
              color: "#FFEC19",
            },
          },
          {
            types: ["maybe-class-name", "property-access", "attr-name"],
            style: {
              color: "#70FAFF",
            },
          },
          {
            types: ["constant", "function"],
            style: {
              color: "#70FAFF",
            },
          },
        ],
      },

      darkTheme: {
        plain: {
          color: "#f8f8f2",
          backgroundColor: "#282a36",
        },
        styles: [
          {
            types: ["keyword", "variable"],
            style: {
              color: "rgb(189, 147, 249)",
            },
          },
        ],
      },
      additionalLanguages: [
        "kotlin",
        "swift",
        "dart",
        "rust",
        "bash",
        "gradle",
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
