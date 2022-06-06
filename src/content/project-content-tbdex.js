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
        title: 'tbdex Spec',
        description:
          'A playground as we iterate our way to a robust protocol. Mostly composed of tbDEX message schemas/formats and a mock PFI implementation.',
        textButton: 'View Component',
        url: '/projects/tbdex-protocol/lib/README',
      },
      {
        icon: '/img/component-icon.svg',
        title: 'PFI Example Implementation',
        description:
          "A mock implementation of a PFI (Participating Financial Institution) that leverages Circle's APIs in order to facilitate the on and off ramps.",
        textButton: 'View Component',
        url: '/projects/tbdex-protocol/pfi-mock-impl/README',
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
          'An implementation of DIF’s emerging decentralized identifiers standard.',
        textButton: 'View Component',
        url: 'https://identity.foundation/ion/',
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
        img: '/img/identity-icon.svg',
        title: 'Proving Your Identity',
        alt: '',
        description:
          'Alice holds a digital wallet that securely manages all aspects of her identity, including her identifiers, credentials, and authorizations for external apps and entities. Alice uses her wallet to request USD in exchange for 100 units of cryptocurrency. Because Alice is off-ramping from cryptocurrency to fiat, most Participating Financial Institutions (PFIs) are required to verify Alice’s identity in order to fulfill their regulatory and compliance obligations. PFIs that are interested in fulfilling Alice’s request reply with a bid as well as their identity verification requirements for fulfillment. Alice chooses a bid which will need Know Your Customer (KYC) information (such as name, address, date of birth). Alice has already provided all of the necessary information to another PFI in the past. So Alice allows her wallet to provide a verifiable credential issued from the past PFI to the bidding PFI, along with the cryptocurrency to exchange. The PFI verifies the credential and continues with fulfillment.',
      },
      {
        img: '/img/wallet-icon.svg',
        title: 'On-and-Off Ramps Between Fiat and Crypto',
        alt: '',
        description:
          "Alice holds a digital wallet. Through the wallet's user interface, Alice requests cryptocurrency in exchange for $100 USD. The wallet broadcasts Alice's request to Participating Financial Institutions (PFIs) who may possibly fulfill it. Interested PFIs respond to the wallet with bids for Alice's request. Each bid is accompanied with credential requirements. Alice (or the wallet) chooses a bid and allows the wallet to provide Alice’s credentials requested by the PFI. Once a bid is accepted and credentials verified, Alice's wallet makes a payment, and the PFI executes a smart contract to release the crypto to Alice’s wallet address.",
      },
    ],
  },
};
