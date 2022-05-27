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
        <div className="tablet:max-w-[100%] desktop:max-w-[92%] relative">
          <h1 className="h1 mb-18">
            We’re building the next generation of the decentralized web,
            returning data back to users. You’re welcome to join.
          </h1>
          <HomeList
            features={content.features}
            className="desktop:mb-[6rem] tablet:mb-[152px] mb-[56px]"
          />
          <img
            src="/img/static-vertical-cyan.svg"
            className="absolute right-[-24px] tablet:right-[-35px] desktop:right-[-150px] hd:right-[-176px] bottom-[13vh] tablet:bottom-[-9.5rem] desktop:bottom-[2.5rem] "
            alt=""
          />
          <img
            src="/img/heart.svg"
            className="absolute right-[-32px] tablet:right-[-46px] desktop:right-[-214px] bottom-[27vh] tablet:bottom-[-6.5rem] desktop:bottom-[10.5rem] w-[90px] h-[78px]  tablet:w-[180px] tablet:h-[156px] desktop:w-[270px] desktop:h-[230px] hdplus:w-[300px] hdplus:h-[260px]"
            alt=""
          />
        </div>
      </main>
    </Layout>
  );
}
