import React from 'react';
import HomeList from './HomeList';

export default {
  title: 'HomeList',
  component: HomeList,
};

const Template = (args) => (
  <div className="">
    <HomeList {...args} />
  </div>
);
export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
  features: [
    {
      title: 'Our Philosophy',
      description: (
        <>
          Our projects are open source because when we need to go far, we go
          together.
        </>
      ),
      cta: {
        label: 'Read Our Open Source Philosophy',
        url: '/philosophy',
      },
    },
    {
      title: 'Our Protocol',
      description: (
        <>
          The tbDEX protocol is our first system. It's how users around the
          world share information and transact without anyone getting in the
          middle to see your data or extract fees.
        </>
      ),
      cta: {
        label: 'Learn More',
        url: '/protocol',
      },
    },
    {
      title: 'Our Projects',
      description: (
        <>
          Our projects are the building blocks for tbDEX, self-sovereign
          identity, decentralized communication, and more.
        </>
      ),
      cta: {
        label: 'Get Involved',
        url: '/projects',
      },
    },
    {
      title: 'Our Approach',
      description: (
        <>
          Decentralized. Permissionless. Trustless. This is the paradigm shift
          evolving the web forward.
        </>
      ),
      cta: {
        label: 'Discover Our Approach',
        url: '/approach',
      },
    },
  ],
};
