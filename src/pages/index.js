import React from 'react';
import Layout from '@theme/Layout';
import HomeList from '../components/HomeList/HomeList';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { content } from '@site/src/content/home.js';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <div className="max-w-[1052px]">
          <h1 className="h1 mb-18">
            We’re building the next generation of the decentralized web,
            returning data back to users. You’re welcome to join.
          </h1>
          <HomeList
            features={content.features}
            className="desktop:mb-[6rem] tablet:mb-[152px]"
          />
          <img
            src="/img/static-vertical-cyan.svg"
            className="absolute right-[-3px] bottom-[58rem] tablet:bottom-[41.5rem] hd:bottom-[27.5rem]  hdplus:bottom-[23.5rem] "
            alt=""
          />
          <img
            src="/img/heart.svg"
            className="absolute right-[-9px] bottom-[58rem] tablet:bottom-[41.5rem] hd:bottom-[36.5rem]  hdplus:bottom-[34.5rem] w-[90px] h-[78px]  tablet:w-[180px] tablet:h-[156px] hd:w-[250px] hd:h-[210px] hdplus:w-[300px] hdplus:h-[260px]"
            alt=""
          />
        </div>
      </main>
    </Layout>
  );
}
