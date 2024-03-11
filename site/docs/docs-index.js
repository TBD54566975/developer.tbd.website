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
        Build Web5 apps that put you in control of your data and identity.
      </h1>
      <p className="mb-8">
        <a href="/blog/what-is-web5">Web5</a> brings decentralized identity and
        data storage to your applications. It lets developers focus on creating
        delightful user experiences, while returning ownership of data and
        identity to individuals.
      </p>
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        <HeroCard
          heroText="Web5 in 5️ Minutes"
          buttonUrl="/docs/web5/quickstart"
          buttonText="Quickstart 🚀"
          bodyText="An interactive guide to get started with Web5"
          themeColor="purple"
          primary
        />
        <HeroCard
          heroText="Web5 API Reference"
          buttonUrl="https://tbd54566975.github.io/web5-js/modules/_web5_api.html"
          buttonText="API Docs 📖"
          bodyText="API documentation for the Web5 JS SDK"
          themeColor="cyan"
          primary
        />
      </div>

      <div className="padding-top--xl" />

      <h2 className="mb-4">Learn More</h2>
      <p className="mb-8">
        Get to know the components of Web5 and try it out in minutes.
      </p>

      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        <HeroCard
          heroText="Decentralized Identifiers"
          buttonUrl="/docs/web5/learn/decentralized-identifiers"
          buttonText="Learn"
          imgSrc="/img/data-icon.svg"
          bodyText="Take a journey with Alice and Bob to learn all about DIDs"
          themeColor="cyan"
        />
        <HeroCard
          heroText="Decentralized Web Nodes"
          buttonUrl="/docs/web5/learn/decentralized-web-nodes"
          buttonText="Learn"
          imgSrc="/img/docs-page-icon.svg"
          imgClass="w-32"
          bodyText="Learn how DWNs act as personal data stores"
          themeColor="purple"
        />
        <HeroCard
          heroText="Protocols"
          buttonUrl="/docs/web5/learn/protocols"
          buttonText="Learn"
          imgSrc="/img/lock-key.png"
          bodyText="Learn how to define data schemas and permissions"
          themeColor="purple"
        />
        <HeroCard
          heroText="Build a Chat App"
          buttonUrl="/docs/web5/build/apps/dinger-tutorial"
          buttonText="Build"
          imgSrc="/img/message-icon-purple.png"
          imgClass="w-36"
          bodyText="Learn how to build a decentralized chat app"
          themeColor="cyan"
        />
      </div>

      <div className="padding-top--xl" />

      <h2 className="mb-4">Explore</h2>
      <p className="mb-8">Dive into Web5 sample apps, videos, and more.</p>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop-lg:grid-cols-4 gap-4">
        <ExploreCard
          text="Sample Apps"
          icon="/img/docs-app.svg"
          url="https://github.com/TBD54566975/developer.tbd.website/tree/main/examples"
        />
        <ExploreCard
          text="Videos"
          icon="/img/docs-conference-speaker.svg"
          url="https://www.youtube.com/@TBD54566975"
        />
        <ExploreCard
          text="Blog Posts"
          icon="/img/docs-blog-icon.svg"
          imgClass="w-24"
          url="/blog"
        />

        <ExploreCard
          text="Discussions"
          icon="/img/docs-listen-music.svg"
          url="https://soundcloud.com/user-625850228/sets/the-blockchain-discussion"
        />
      </div>

      <div className="padding-top--xl" />

      <Community />
    </div>
  );
}

export default DocsIndex;
