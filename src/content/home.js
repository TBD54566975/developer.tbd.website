import React from 'react';

export const content = {
  features: [
    {
      title: 'Our Philosophy',
      Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
      description: (
        <>
          Our projects are open source because when we need to go far, we go together.
        </>
      ),
      cta: {
        label: 'Read Our Open Source Philosophy',
        url: '/philosophy'
      },
    },
    {
      title: 'Our Protocol',
      Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
      description: (
        <>
          The tbDEX protocol is our first system. It's how users around the world share information and transact without anyone getting in the middle to see your data or extract fees.
        </>
      ),
      cta: {
        label: 'Learn More',
        url: '/protocol'
      },
    },
    {
      title: 'Our Projects',
      Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
      description: (
        <>
          Our projects are the building blocks for tbDEX, self-sovereign identity, decentralized communication, and more.
        </>
      ),
      cta: {
        label: 'Get Involved',
        url: '/projects'
      },
    },
    {
      title: 'Our Approach',
      Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
      description: (
        <>
          Decentralized. Permissionless. Trustless. This is the paradigm shift evolving the web forward.
        </>
      ),
      cta: {
        label: 'Discover Our Approach',
        url: '/approach'
      },
    },
  ],
};
