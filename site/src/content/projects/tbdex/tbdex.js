/* eslint-disable quotes */
import Heading from './heading.mdx';
import DataOwnership from './data-self-ownership.mdx';
import ProvingIdentity from './proving-your-identity.mdx';
import SSIService from '../ssi-service.mdx';
import TBDEXProtocol from '../tbdex-protocol.mdx';
export const content = {
  meta: {
    title: 'tbDEX | TBD',
    path: 'projects/tbdex',
  },
  Heading: Heading,
  components: {
    growToFit: true,
    title: 'Components',
    projects: [
      {
        icon: '/img/component-icon.svg',
        title: 'tbDEX Whitepaper',
        description:
          'Whitepaper defining a decentralized liquidity protocol for exchanging assets.',
        textButton: 'View Whitepaper',
        url: 'https://tbdex.io/whitepaper.pdf',
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
        title: 'Decentralized Identifiers',
        description:
          'Decentralized Identifiers are a W3C international standard for identifiers created, owned, and controlled by individuals, without reliance on centralized entities',
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
        url: 'https://github.com/TBD54566975/ssi-sdk#readme',
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
          'wallets act as agents for individuals or institutions by facilitating exchanges with PFIs',
      },
      {
        title: 'Participating Financial Institutions (PFIs)',
        description:
          'entities that offer liquidity services on the tbDEX network',
      },
      {
        title: 'Credential Issuer',
        description:
          'organizations or individuals (by means of their wallet) who serve as a source of verifiable credentials',
      },
    ],
    imgDesktop: '/img/maze.svg',
    isWeb5: false,
  },
  useCases: {
    title: 'Use Cases',
    pillars: [
      {
        img: '/img/identity-icon.svg',
        title: 'Proving your identity',
        alt: '',
        description: ProvingIdentity,
      },
      {
        img: '/img/wallet-icon.svg',
        title: 'Data self-ownership',
        alt: '',
        description: DataOwnership,
      },
    ],
  },
};
