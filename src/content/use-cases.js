/* eslint-disable quotes */
export const content = {
  title: 'Use Cases',
  pillars: [
    {
      img: '/img/identity-icon.svg',
      title: 'Proving your identity',
      description:
        'Alice holds a digital wallet that securely manages all aspects of her identity, including her identifiers, credentials, and authorizations for external apps and entities. Alice uses her wallet to request USD in exchange for 100 units of cryptocurrency. Because Alice is off-ramping from cryptocurrency to fiat, most Participating Financial Institutions (PFIs) are required to verify Alice’s identity in order to fulfill their regulatory and compliance obligations. PFIs that are interested in fulfilling Alice’s request reply with a bid as well as their identity verification requirements for fulfillment. Alice chooses a bid which will need Know Your Customer (KYC) information (such as name, address, date of birth). Alice has already provided all of the necessary information to another PFI in the past. So Alice allows her wallet to provide a verifiable credential issued from the past PFI to the bidding PFI, along with the cryptocurrency to exchange. The PFI verifies the credential and continues with fulfillment.',
    },
    {
      img: '/img/wallet-icon.svg',
      title: 'On-and-off-ramps between fiat and crypto',
      description:
        "Alice holds a digital wallet. Through the wallet's user interface, Alice requests cryptocurrency in exchange for $100 USD. The wallet broadcasts Alice's request to Participating Financial Institutions (PFIs) who may possibly fulfill it. Interested PFIs respond to the wallet with bids for Alice's request. Each bid is accompanied with credential requirements. Alice (or the wallet) chooses a bid and allows the wallet to provide Alice’s credentials requested by the PFI. Once a bid is accepted and credentials verified, Alice's wallet makes a payment, and the PFI executes a smart contract to release the crypto to Alice’s wallet address.",
    },
  ],
};
