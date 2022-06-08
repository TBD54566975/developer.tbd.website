/* eslint-disable quotes */
export const content = {
  meta: {
    title: 'Developers | TBD',
  },
  heading:
    'We’re building the next generation of the decentralized web, returning data back to users. You’re welcome to join.',
  features: [
    {
      title: 'Our Philosophy',
      Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
      description:
        'We’re building open protocols, standards, and development communities. ' +
        'Our projects are open source because we want everyone in the economy ' +
        'to benefit: individuals, businesses, institutions, and government.',
      cta: {
        label: 'Read More',
        url: '/opensource',
      },
    },
    {
      title: 'Our Protocol',
      Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
      description:
        "The tbDEX protocol is our first system. It's how users around the " +
        'world share information and transact without anyone getting in the ' +
        'middle to see your data or extract fees.',
      cta: {
        label: 'Learn More',
        url: '/projects/tbdex',
      },
    },
    {
      title: 'Our Projects',
      Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
      description:
        'Our projects are the building blocks for tbDEX, self-sovereign ' +
        'identity, decentralized communication, and more.',
      cta: {
        label: 'Get Involved',
        url: '/projects-index',
      },
    },
  ],
};
