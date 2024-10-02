/* eslint-disable quotes */
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
        url: '/docs/web5/decentralized-identifiers/what-are-dids',
        isExternalLink: false,
      },
      {
        icon: '/img/component-icon.svg',
        title: 'Verifiable Credentials',
        description:'Verifiable Credentials are a W3C international standard for cryptographically-signed statements made by an issuer about a holder',
        textButton: 'View Component',
        url: '/docs/web5/verifiable-credentials/what-are-vcs',
        isExternalLink: false,
      },
      {
        icon: '/img/component-icon.svg',
        title: 'Decentralized Web Nodes',
        description: TBDEXProtocol,
        textButton: 'View Component',
        url: '/docs/web5/decentralized-web-nodes/what-are-dwns',
        isExternalLink: false,
      }
    ],
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
          "Bob is a music lover and hates having his personal data locked to a single vendor. It forces him to recreate his playlists and songs over and over again across different music apps. Thankfully there's a way out of this maze of vendor-locked silos: Bob can keep this data in his decentralized web node. This way Bob is able to grant any music app access to his settings and preferences, enabling him to take his personalized music experience wherever he chooses.",
      },
    ],
  },
};
