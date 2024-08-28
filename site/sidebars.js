/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    { type: 'doc', id: 'index', label: 'Getting Started' },
    { type: 'link', href: './web5', label: 'Web5 SDK' },
    { type: 'link', href: './tbdex', label: 'tbDEX SDK' },
    { type: 'doc', id: 'api', label: 'API Reference Guides' },
    { type: 'doc', id: 'glossary', label: 'Glossary' },
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

module.exports = sidebars;
