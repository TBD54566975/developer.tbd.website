import React from 'react';
import HeroCard from '@site/src/components/HeroCard';
import ExploreCard from '../src/components/ExploreCard';
import Community from '../src/components/Community';
import Head from '@docusaurus/Head';

function DocsIndex() {
  return (
    <div>
      <Head title="Developer Docs | TBD">
        <meta property="og:title" />
      </Head>
      <h1>
      Give your customers control of their identity, data, and finances.
      </h1>
      <p className="mb-8">
        Our toolkits bring decentralized identity, messaging, and data storage to your applications. It lets developers focus on creating delightful user experiences, while returning ownership to individuals.
      </p>
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        <HeroCard
          heroText="Web5"
          buttonUrl="/docs/web5/quickstart"
          buttonText="Quickstart 🚀"
          bodyText="An interactive guide to get started with Web5"
          imgSrc="/img/did-vc.svg"
          imgClass="w-32 flip"
          themeColor="purple"
        />
        <HeroCard
          heroText="tbDEX"
          buttonUrl="/docs/tbdex/"
          buttonText="Playbooks 📖"
          bodyText="Guides on faciliating cross-border payments"
          imgSrc="/img/money-msg-blue-purple.svg"
          imgClass="w-36 flip"
          themeColor="cyan"
        
        />
      </div>

      <div className="padding-top--xl" />

      <h2 className="mb-4">Learn More</h2>
      <p className="mb-8">
        Learn more about the components that enable decentralized applications.
      </p>

      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        <HeroCard
          heroText="Decentralized Identifiers"
          buttonUrl="/docs/web5/learn/decentralized-identifiers"
          buttonText="Learn"
          imgSrc="/img/id-blue-purple.svg"
          imgClass="w-32 beat-fade"
          bodyText="Learn how digital IDs work across the web"
          themeColor="cyan"
        />
        <HeroCard
          heroText="Verifiable Credentials"
          buttonUrl="/docs/web5/learn/verifiable-credentials"
          buttonText="Learn"
          imgSrc="/img/credential-yellow.svg"
          imgClass="w-32 beat-fade"
          bodyText="Learn how digital credentials can be used to prove claims online"
          themeColor="purple"
        />
        <HeroCard
          heroText="Wallet App Example"
          buttonUrl="https://github.com/TBD54566975/tbDEX-Example-iOS"
          buttonText="Learn"
          imgSrc="/img/wallet-blue-yellow.svg"
          imgClass="w-32 beat-fade"
          bodyText="Explore an example iOS wallet app that uses tbDEX to find liquidity"
          themeColor="purple"
        />
        <HeroCard
          heroText="Financial Institution Example"
          buttonUrl="https://github.com/TBD54566975/tbdex-pfi-exemplar"
          buttonText="Learn"
          imgSrc="/img/bank-purple-yellow.svg"
          imgClass="w-36 beat-fade"
          bodyText="Explore an example liquidity provider that uses tbDEX to reach new markets"
          themeColor="cyan"
        />
      </div>

      <div className="padding-top--xl" />

      <h2 className="mb-4">Explore</h2>
      <p className="mb-8">Dive into sample apps, videos, and more.</p>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop-lg:grid-cols-4 gap-4">
        <ExploreCard
          text="Sample Apps"
          icon="/img/mobile-phone-yellow-blue.svg"
          url="https://github.com/TBD54566975/developer.tbd.website/tree/main/examples/tutorials"
        />
        <ExploreCard
          text="Videos"
          icon="/img/tv-yellow-blue.svg"
          url="https://www.youtube.com/@TBD54566975/videos"
        />
        <ExploreCard
          text="Blog Posts"
          icon="/img/blog-yellow-blue.svg"
          imgClass="w-24"
          url="/blog"
        />

        <ExploreCard
          text="Discussions"
          icon="/img/microphone-yellow-blue.svg"
          url="https://soundcloud.com/user-625850228/sets/the-blockchain-discussion"
        />
      </div>

      <div className="padding-top--xl" />

      <Community />
    </div>
  );
}

export default DocsIndex;
