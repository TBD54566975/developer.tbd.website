import type {
  SidebarsConfig,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docsSidebar: [
    "index",
    {
      type: "category",
      label: "SDKs",
      collapsible: false,
      items: [
        { type: "link", label: "Web5 SDK", href: "web5-sdk" },
        { type: "link", label: "tbDex SDK", href: "tbdex-sdk" },
      ],
    },
  ],
  web5Sidebar: {
    "Web5 SDKs": ["web5-sdk/index"],
  },
  tbdexSidebar: {
    "tbDex SDKs": ["tbdex-sdk/index"],
  },

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
