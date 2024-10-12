import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind-pluging.cjs";

const SDK_VERSIONS = require("../sdk-versions.json");

// const lightCodeTheme = require("prism-react-renderer").themes.github;
// const darkCodeTheme = require("prism-react-renderer").themes.dracula;

const config: Config = {
  title: "TBDevs",
  tagline: "TBD",
  favicon: "img/favicon.ico",
  plugins: [tailwindPlugin, require.resolve("./webpackPlugin")],
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

  customFields: {
    SDK_VERSIONS: SDK_VERSIONS,
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
          blogSidebarCount: 0,
          postsPerPage: "ALL",
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
              label: "Code of Conduct",
              href: "/community/code-of-conduct",
            },
            {
              label: "Governance",
              href: "/community/governance",
            },
            {
              label: "Monthly Spotlight",
              href: "/community/spotlight",
            },
            {
              label: "Calendar",
              href: "/community/calendar",
            },
            {
              label: "Open Source Playbook",
              href: "/community/open-source-playbook",
            },
            {
              label: "Contribution Guide",
              href: "/community/contribute",
            },
            {
              label: "Incubation Program",
              href: "/community/incubation-program",
            },
            {
              label: "Innovators Showcase",
              href: "/community/innovators-showcase",
            },
            {
              label: "Assets",
              href: "/community/assets",
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
    footer: {
      logo: {
        alt: "TBD logo",
        src: "img/logo.svg",
        href: "/",
        width: 73.6,
        height: 32,
      },
      links: [
        {
          items: [
            {
              label: "terms of service",
              href: "/",
            },
            {
              label: "code of conduct",
              href: "/",
            },
            {
              label: "governance",
              href: "/",
            },
            {
              label: "tbd.shop",
              href: "/",
            },
          ],
        },
        {
          items: [
            {
              html: `
            <a href="/" target="_blank" rel="noreferrer noopener" aria-label="redirects to github">
              <img src="/img/github-mark-1.svg" alt="Deploys by Netlify" width="20.417" height="20" />
            </a>
          `,
            },
            {
              html: `
							<a href="/" target="_blank" rel="noreferrer noopener" aria-label="redirects to netlify">
								<img src="/img/discord-footer-link.svg" alt="Redirects to discord" width="25.837" height="20" />
							</a>
							`,
            },
            {
              html: `
							<a href="/" target="_blank" rel="noreferrer noopener" aria-label="redirects to netlify">
								<img src="/img/twitter-footer-link.svg" alt="Redirects to footer" width="19.649" height="20" />
								</a>`,
            },
            {
              html: `
							<a href="/" target="_blank" rel="noreferrer noopener" aria-label="redirects to youtube">
								<img src="/img/youtube-footer-link.svg" alt="Redirects to youtube" width="28.293" height="20" />
								</a>
							`,
            },
            {
              html: `
								<a href="/" target="_blank" rel="noreferrer noopener" aria-label="redirects to linkedin">
									<img src="/img/linkedin-footer-link.svg" alt="Redirects to LinkedIn" width="21" height="20" />
								</a>
							`,
            },
            {
              html: `
								<a href="/" target="_blank" rel="noreferrer noopener" aria-label="redirects to twitch">
									<img src="/img/twitch-footer-link.svg" alt="Redirects to Twitch" width="19.105" height="20" />
								</a>
							`,
            },
          ],
        },
      ],
    },
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
