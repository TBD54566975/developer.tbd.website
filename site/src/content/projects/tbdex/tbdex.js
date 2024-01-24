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
        title: 'Decentralized Identifiers',
        description:
          'Decentralized Identifiers are a W3C international standard for identifiers created, owned, and controlled by individuals, without reliance on centralized entities',
        textButton: 'View Component',
        url: '/docs/web5/learn/decentralized-identifiers'
      },
      {
        icon: '/img/component-icon.svg',
        title: 'Verifiable Credentials',
        description:
          'Verifiable Credentials are a W3C international standard for verifiable claims.',
        textButton: 'View Component',
        url: '/docs/web5/learn/verifiable-credentials'
      }
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
          'entities that offer liquidity services on a tbDEX network',
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
      }
    ],
  },
};
