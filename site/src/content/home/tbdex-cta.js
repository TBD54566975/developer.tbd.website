import React, { useState } from 'react';
import HeroCard from '../../components/HeroCard';
import Divider from '../../components/Divider';

function tbdexCTA() {

  return (
    <div>
      <h1>The future of finance is open.</h1>
      <p className="mb-8 copy text-primary-yellow">
      What do we mean by open? Well, let's see how many times we can use it in a sentence...
      We're building <span className="mb-8 copy text-accent-cyan">open</span> source toolkits that implement <span className="mb-8 copy text-accent-cyan">open</span> standards and protocols to <span className="mb-8 copy text-accent-cyan">open</span> up financial access globally.
      Pretty good, huh? Our SDKs are even better!
      </p>

      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        <HeroCard
          heroText="tbDEX SDK"
          buttonUrl="/docs/tbdex"
          buttonText="Talk money to me"
          bodyText="An open source messaging service that enables wallet applications to communicate with financial institutions to discover and obtain liquidity."
          themeColor="cyan"
          imgSrc="/img/money-msg-blue-purple.svg"
          primary
        />
        <HeroCard
          heroText="Web5 SDK"
          buttonUrl="/docs/web5"
          buttonText="Prove Yourself"
          bodyText="An open source library for creating and resolving Decentralized Identifiers, as well as issuing, presenting and verifying Verifiable Credentials."
          themeColor="cyan"
          imgSrc="/img/id-blue-purple.svg"
          imgClass="w-28"
          primary
        />
      </div>



      <Divider type="slash" />
    </div>
  );
}

export default tbdexCTA;

