import React from 'react';
import HeroCard from '@site/src/components/HeroCard';
import ExploreCard from '../src/components/ExploreCard';
import Community from '../src/components/Community';

function DocsIndex() {
  return (
    <div className="p-8">
      <h1>
        Build Web5 apps that put you in control of your data and identity.
      </h1>
      <p className="mb-8">
        Web5 brings decentralized
        identity and data storage to your applications. It lets developers focus
        on creating delightful user experiences, while returning ownership of
        data and identity to individuals.
      </p>
      <div>
        <HeroCard
          heroText="Web5 in 5️⃣ Minutes"
          buttonUrl="/docs/web5/quickstart"
          buttonText="Quickstart 🚀"
          imgSrc="/img/docs-web5-code.png"
          imgClass="w-96"
          bodyText="An interactive guide to get started with Web5"
          themeColor="yellow"
        />
      </div>

      <div className='padding-top--xl'/>

      <h2 className='-mb-2'>LEARN MORE</h2>

      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        <HeroCard
          heroText="What is Web5"
          buttonUrl="/blog/what-is-web5" 
          buttonText="Read"
          imgSrc="/img/search-icon.png"
          bodyText="Learn how Web5 enables decentralized apps"
          themeColor="cyan"
        />
        <HeroCard
          heroText="Decentralized Identifiers"
          buttonUrl="/docs/web5/learn/decentralized-identifiers"
          buttonText="Learn"
          imgSrc="/img/data-icon.svg"
          bodyText="Take a journey with Alice and Bob to learn all about DIDs"
          themeColor="purple"
        />
          <HeroCard
          heroText="Decentralized Web Nodes"
          buttonUrl="/docs/web5/learn/decentralized-web-nodes"
          buttonText="Learn"
          imgSrc="/img/message-icon.png"
          imgClass="w-40"
          bodyText="Learn how DWNs act as personal data stores"
          themeColor="purple"
        />
        <HeroCard
          heroText="Build a ToDo App"
          buttonUrl="/docs/web5/build/apps/todo-app-tutorial"
          buttonText="Build"
          imgSrc="/img/docs-todo-icon.png"
          imgClass="w-24"
          bodyText="Learn how to build a simple, single-user decentralized app"
          themeColor="cyan"
        />
      </div>

      <div className='padding-top--xl'/>

      <h2>EXPLORE</h2>
      <div className="grid grid-cols-2 tablet:grid-cols-2 desktop-lg:grid-cols-4 gap-4">

      <ExploreCard
          text="Sample Apps"
          icon="/img/docs-app.svg"
          url="https://github.com/TBD54566975/incubating-web5-labs"
        />
        <ExploreCard
          text="Videos"
          icon="/img/docs-conference-speaker.svg"
          url="https://vimeo.com/tbd54566975"
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
          url="/learn"
        />

      </div>

      <div className='padding-top--xl'/>

      <Community />

    </div>
  );
}

export default DocsIndex;
