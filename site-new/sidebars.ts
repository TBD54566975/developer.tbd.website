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
    {
      type: "doc",
      id: "index",
      customProps: { sidebarHeader: "Docs" },
    },
    {
      type: "html",
      value: "SDKs",
      className: "category-label",
    },
    {
      type: "link",
      label: "Web5 SDK",
      href: "web5-sdk",
      className: "web5-icon",
    },
    {
      type: "link",
      label: "tbDex SDK",
      href: "tbdex-sdk",
      className: "tbdex-icon",
    },
    { type: "html", value: "RESOURCES", className: "category-label" },
    { type: "link", label: "API Reference Guides", href: "/" },
    { type: "link", label: "Glossary", href: "/" },
  ],
  web5Sidebar: [
    {
      type: "doc",
      id: "web5-sdk/index",
      customProps: { sidebarHeader: "Web5 SDK" },
    },
    {
      type: "html",
      value: "components",
      className: "category-label",
    },
    {
      type: "autogenerated",
      dirName: "web5-sdk/dids",
      customProps: { sidebarHeader: "test" },
    },
  ],
  tbdexSidebar: [
    {
      type: "doc",
      id: "tbdex-sdk/index",
      customProps: { sidebarHeader: "tbDex SDK" },
    },
  ],
  learnSidebar: [
    {
      type: "category",
      label: "DIDs",
      items: [{ type: "autogenerated", dirName: "web5-sdk/Learn" }],
      customProps: {
        sidebarHeader: "Learn",
      },
    },
  ],
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
