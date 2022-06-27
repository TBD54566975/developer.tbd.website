/* eslint-disable quotes */
export const content = {
  meta: {
    title: 'tbDEX | TBD',
    path: 'projects/tbdex',
  },
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
        description:
          "An implementation of DIF's emerging decentralized personal datastore standard.",
        textButton: 'View Component',
        url: '/projects/dwn-sdk-js/README',
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
        img: '/img/wallet-icon.svg',
        title: 'On-and-Off Ramps Between Fiat and Crypto',
        alt: '',
        description: [
          {
            type: 'text',
            data: 'Alice holds a ',
          },
          {
            type: 'tooltip',
            data: {
              trigger: 'digital wallet',
              text: 'agent that provides an interface and functionality to manage credentials and data',
            },
          },
          {
            type: 'text',
            data: ". Through the wallet's user interface, Alice requests cryptocurrency in exchange for $100 USD. The wallet broadcasts Alice's request to ",
          },
          {
            type: 'tooltip',
            data: {
              trigger: 'Participating Financial Institutions',
              text: 'entities that offer liquidity services on the tbDEX network (ex: a bank)',
            },
          },
          {
            type: 'text',
            data: " (PFIs) who may possibly fulfill it. Interested PFIs respond to the wallet with bids for Alice's request. Each bid is accompanied with ",
          },

          {
            type: 'tooltip',
            data: {
              trigger: 'credential',
              text: 'proof of identity',
            },
          },
          {
            type: 'text',
            data: " requirements. Alice (or the wallet) chooses a bid and allows the wallet to provide Alice’s credentials requested by the PFI. Once a bid is accepted and credentials verified, Alice's wallet makes a payment, and the PFI executes a ",
          },
          {
            type: 'tooltip',
            data: {
              trigger: 'smart contract',
              text: 'code that describes an agreement between parties and executes the terms of that agreement on its own',
            },
          },
          {
            type: 'text',
            data: ' to release the crypto to Alice’s wallet address.',
          },
        ],
      },
      {
        img: '/img/identity-icon.svg',
        title: 'Proving Your Identity',
        alt: '',
        description: [
          {
            type: 'text',
            data: 'Alice holds a digital wallet that securely manages all aspects of her identity, including her ',
          },
          {
            type: 'tooltip',
            data: {
              trigger: 'identifiers',
              text: 'Unique address to personal information that may be required for currency exchange with a regulated financial institution',
            },
          },
          {
            type: 'text',
            data: ', credentials, and ',
          },
          {
            type: 'tooltip',
            data: {
              trigger: 'authorizations',
              text: 'permissions granted for another person or app to view or exchange data with you',
            },
          },
          {
            type: 'text',
            data: ' for external apps and entities. Alice uses her wallet to request USD in exchange for 100 units of cryptocurrency. Because Alice is ',
          },

          {
            type: 'tooltip',
            data: {
              trigger: 'off-ramping',
              text: 'Converting digital money to legacy money, fiat.',
            },
          },
          {
            type: 'text',
            data: ' from cryptocurrency to fiat, most Participating Financial Institutions (PFIs) are required to verify Alice’s identity in order to fulfill their regulatory and compliance obligations. PFIs that are interested in fulfilling Alice’s request reply with a bid as well as their identity verification requirements for fulfillment. Alice chooses a bid which will need Know Your Customer (KYC) information (such as name, address, date of birth). Alice has already provided all of the necessary information to another PFI in the past. So Alice allows her wallet to provide a ',
          },
          {
            type: 'tooltip',
            data: {
              trigger: 'verifiable credential',
              text: 'digital certificates that make it easy to share information online in a private and secure way',
            },
          },
          {
            type: 'text',
            data: ' issued from the past PFI to the bidding PFI, along with the cryptocurrency to exchange. The PFI verifies the credential and continues with fulfillment.',
          },
        ],
      },
    ],
  },
};
