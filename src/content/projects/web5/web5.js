/* eslint-disable quotes */
import SSIService from '../ssi-service.mdx';
import TBDEXProtocol from '../tbdex-protocol.mdx';
import Heading from './heading.mdx';
export const content = {
  meta: {
    title: 'Web5 | TBD',
    path: 'projects/web5',
  },
  Heading: Heading,
  components: {
    growToFit: true,
    title: 'Components',
    projects: [
      {
        icon: '/img/component-icon.svg',
        title: 'Decentralized Identifiers',
        description:
          'Decentralized Identifiers are a W3C international standard for identifiers created, owned, and controlled by individuals, without reliance on centralized entities',
        textButton: 'View Component',
        url: 'https://w3c.github.io/did-core/',
        isExternalLink: true,
      },
      {
        icon: '/img/component-icon.svg',
        title: 'Decentralized Web Node',
        description: TBDEXProtocol,
        textButton: 'View Component',
        url: 'https://github.com/TBD54566975/dwn-sdk-js#readme',
        isExternalLink: true,
      },

      {
        icon: '/img/component-icon.svg',
        title: 'Self-Sovereign Identity Service',
        description:
          'An in-a-box service that handles the full Verifiable Credentials lifecycle, including issuance, verification, revocation, and more.',
        textButton: 'View Component',
        url: 'https://github.com/TBD54566975/ssi-service#readme',
        isExternalLink: true,
      },
      {
        icon: '/img/component-icon.svg',
        title: 'Self-Sovereign Identity SDK',
        description: SSIService,
        textButton: 'View Component',
        url: 'https://github.com/TBD54566975/ssi-sdk/blob/main/README.md',
        isExternalLink: true,
      },
      {
        icon: '/img/component-icon.svg',
        title: 'Self-Sovereign Identity Console',
        description: 'A user-friendly GUI Console for managing Verifiable Credentials lifecycle, from issuance to revocation.',
        textButton: 'View Component',
        url: 'https://github.com/TBD54566975/ssi-admin-ui/blob/main/README.md',
        isExternalLink: true,
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
    imgDesktop: '/img/actors-web5-desktop.svg',
    imgMobile: '/img/actors-web5-mobile.svg',
    isWeb5: true,
  },
  web5Illustrations: {
    imgMobile: '/img/web5-mobile.svg',
    imgTablet: '/img/web5-tablet.svg',
    imgDesktop: '/img/web5-desktop.svg',
    altText: 'Web2 and Web3 to Web5',
  },
  useCases: {
    title: 'Use Cases',
    pillars: [
      {
        img: '/img/data-icon.svg',
        title: 'Control Your Identity',
        alt: '',
        description:
          'Alice holds a digital wallet that securely manages her identity, data, and authorizations for external apps and connections. Alice uses her wallet to sign in to a new decentralized social media app. Because Alice has connected to the app with her decentralized identity, she does not need to create a profile, and all the connections, relationships, and posts she creates through the app are stored with her, in her decentralized web node. Now Alice can switch apps whenever she wants, taking her social persona with her.',
      },
      {
        img: '/img/devices-icon.svg',
        title: 'Own Your Data',
        alt: '',
        description:
          "Bob is a music lover and hates having his personal data locked to a single vendor. It forces him to regurgitate his playlists and songs over and over again across different music apps. Thankfully there's a way out of this maze of vendor-locked silos: Bob can keep this data in his decentralized web node. This way Bob is able to grant any music app access to his settings and preferences, enabling him to take his personalized music experience wherever he chooses.",
      },
    ],
  },
};