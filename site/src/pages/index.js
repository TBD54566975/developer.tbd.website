import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomeList from '../components/HomeList';
import { content } from '@site/src/content/home/home.js';

export default function Home() {
  const Web5CTA = content.web5cta;
  const TbdexCTA = content.tbdexCTA;
  const Heading = content.heading;

  return (
    <Layout>
      <Head title={content.meta.title}>
        <meta property="og:title" content={content.meta.title} />
        <meta property="og:url" content="https://developer.tbd.website" />
        <link
          rel="apple-touch-icon"
          href="https://developer.tbd.website/img/tbd-fav-icon-main.png"
        />
        <script defer type="module" src="https://embeddables.p.mbirdcdn.net/v1/web-components.es.js"></script>         
      </Head>

      <main>
        <div className="tablet:max-w-[100%] desktop:max-w-[92%] relative">
          <div className="h1 mb-16">            
            <TbdexCTA />
            <Heading />
          </div>
          <HomeList
            features={content.features}
            className="desktop:mb-[6rem] tablet:mb-[9.5rem] mb-[3.5rem]"
          />
          <img
            src="/img/static-vertical-cyan.svg"
            className="absolute right-[-1.5rem] tablet:right-[-2.1875rem] desktop:right-[-12rem] bottom-[13vh] tablet:bottom-[-9.5rem] desktop:bottom-[-0.5rem] "
            alt=""
          />
          <img
            src="/img/heart.svg"
            className="absolute right-[-2rem] tablet:right-[-2.875rem] desktop:right-[-13.375rem] bottom-[20rem] tablet:bottom-[-6.5rem] desktop:bottom-[10.5rem] w-[5.625rem] h-[4.875rem]  tablet:w-[11.25rem] tablet:h-[9.75rem] desktop:w-[16.875rem] desktop:h-[14.375rem]"
            alt=""
          />          
        </div>
      </main>
    </Layout>
  );
}
