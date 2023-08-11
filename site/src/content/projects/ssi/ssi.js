/* eslint-disable quotes */
import SSIService from '../ssi-service.mdx';
import TBDEXProtocol from '../tbdex-protocol.mdx';
import Heading from './heading.mdx';

export const content = {
  meta: {
    title: 'SSI | TBD',
    path: 'projects/ssi',
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
        title: 'Verifiable Credentials',
        description:
          'Verifiable Credentials are a W3C standard: Credentials are a part of our daily lives; This specification provides a mechanism to express these sorts of credentials on the Web in a way that is cryptographically secure, privacy respecting, and machine-verifiable.',
        textButton: 'View Component',
        url: 'https://w3c.github.io/did-core/',
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
    actors: [
      {
        title: 'Wallets',
        description:
          'wallets act as agents for individuals or institutions by facilitating identity and data interactions.',
      },
      {
        title: 'Credential Issuers',
        description: 'Trusted organizations or individuals who issue credentails.',
      },
      {
        title: 'Credential Verifiers',
        description:
          'Applications or individuals who verify credentials issued by credential issuers that they trust.',
      },
    ],
    imgDesktop: '/img/actors-web5-desktop.svg',
    imgMobile: '/img/actors-web5-mobile.svg',
    isWeb5: false,
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
          'Alice holds a digital wallet that securely manages her identity and credentials. She is able to selectively share her credentials with others, such as her driver’s license with the DMV, her passport with the airport, and her age with a bar, while maintaining control of the use of her data and avoiding exposing her PII.',
      },
    ],
  },
};


