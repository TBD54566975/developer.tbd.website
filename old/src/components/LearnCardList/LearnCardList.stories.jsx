/* eslint-disable quotes */
import React from 'react';
import LearnCardList from './LearnCardList';
export default {
  title: 'LearnCardList',
  component: LearnCardList,
};

const Template = (args) => (
  <div className="max-w-[45.75rem]">
    <LearnCardList {...args} />
  </div>
);
export const Discussions = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Discussions.args = {
  items: [
    {
      customProps: {
        description:
          'An open discussion about the architecture of various blockchains and why experienced software architects are concerned. ',
        duration: '9:22',
        guests: ['Grady Booch'],
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/learn/discussions/architectural-concerns-blockchain',
      label: 'Architectural Concerns with Blockchain',
      type: 'link',
    },
    {
      customProps: {
        description:
          "A panel discussion on Decentralized Identity (DID) where we talk use cases, benefits, DIDs vs NFTs, and what should and shouldn't go on a blockchain.",
        duration: '9:22',
        guests: ['Daniel Buchner', 'Kim Hamilton Duffy', 'Brooklyn Zelenka'],
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/learn/discussions/architectural-concerns-blockchain',
      label: 'Decentralized Identity',
      type: 'link',
    },
    {
      customProps: {
        description:
          'An open discussion between builders, spectators, and critics',
        duration: '9:22',
        guests: ['Kelsey Hightower'],
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/learn/discussions/architectural-concerns-blockchain',
      label: 'Blockchain Skepticism',
      type: 'link',
    },
  ],
};

export const Concepts = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Concepts.args = {
  items: [
    {
      customProps: {
        duration: '9:22',
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/learn/discussions/architectural-concerns-blockchain',
      label: 'Trustless Demystified',
      type: 'link',
    },
    {
      customProps: {
        duration: '9:22',
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/learn/discussions/architectural-concerns-blockchain',
      label: 'Decentralized ID',
      type: 'link',
    },
    {
      customProps: {
        duration: '9:22',
        thumbnail: '/img/placeholder-media-image.png',
        type: 'video',
      },
      docId: 'test',
      href: '/learn/discussions/architectural-concerns-blockchain',
      label: 'Permissionsless Explained',
      type: 'link',
    },
  ],
};
