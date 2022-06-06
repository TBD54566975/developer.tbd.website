/* eslint-disable quotes */
export const content = {
  meta: {
    title: 'Web5 | TBD',
    path: 'projects/tbdex',
  },
  components: {
    growToFit: true,
    title: 'Components',
    projects: [
      {
        icon: '/img/component-icon.svg',
        title: 'Decentralized Identifiers',
        description:
          'An implementation of DIF’s emerging decentralized identifiers standard.',
        textButton: 'View Component',
        url: 'https://identity.foundation/ion/',
        isExternalLink: true,
      },
      {
        icon: '/img/component-icon.svg',
        title: 'Decentralized Web Node',
        description:
          "An implementation of DIF's emerging decentralized personal datastore standard.",
        textButton: 'View Component',
        url: '/projects/dwn-sdk-js/README',
      },

      {
        icon: '/img/component-icon.svg',
        title: 'Self-Sovereign Identity Service',
        description:
          'An in-a-box service that handles the full Verifiable Credentials lifecycle, including issuance, verification, revocation, and more.',
        textButton: 'View Component',
        url: '/projects/ssi-service/README',
      },
      {
        icon: '/img/component-icon.svg',
        title: 'Self-Sovereign Identity SDK',
        description:
          'Standards-based primitives for using Decentralized Identifiers and Verifiable Credentials.',
        textButton: 'View Component',
        url: '/projects/ssi-sdk/README',
      },
    ],
  },
  actors: {
    title: 'Actors',
    actors: [
      {
        title: 'Wallets',
        description:
          'wallets act as agents for individuals or institutions by facilitating identity and data interactions.',
      },
      {
        title: 'Decentralized Web Nodes (DWNs)',
        description: 'personal datastores that hold public and encrypted data.',
      },
      {
        title: 'Decentralized Web Apps (DWAs)',
        description:
          'web apps enhanced with decentralized identity and data storage capabilities.',
      },
    ],
  },
  web5Illustrations: {
    imgMobile: '/img/new-web5-mobile.svg',
    imgTablet: '/img/new-web5-tablet.svg',
    imgDesktop: '/img/new-web5-desktop.svg',
    altText: 'Web2 and Web3 to Web5',
  },
  useCases: {
    title: 'Use Cases',
    pillars: [
      {
        img: '/img/devices-icon.svg',
        title: 'Control Your Identity',
        description:
          'Alice holds a digital wallet that securely manages her identity, data, and authorizations for external apps and connections. Alice uses her wallet to sign in to a new decentralized social media app. Because Alice has connected to the app with her decentralized identity, she does not need to create a profile, and all the connections, relationships, and posts she creates through the app are stored with her, in her decentralized web node. Now Alice can switch apps whenever she wants, taking her social persona with her.',
      },
      {
        img: '/img/data-icon.svg',
        title: 'Own Your Data',
        description:
          "Bob is a music lover and hates having his personal data locked to a single vendor. It forces him to regurgitate his playlists and songs over and over again across different music apps. Thankfully there's a way out of this maze of vendor-locked silos: Bob can keep this data in his decentralized web node. This way Bob is able to grant any music app access to his settings and preferences, enabling him to take his personalized music experience wherever he chooses.",
      },
    ],
  },
};
