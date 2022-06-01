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
            className="desktop:mb-[6rem] tablet:mb-[9.5rem] mb-[3.5rem]"
          />
          <img
            src="/img/static-vertical-cyan.svg"
            className="absolute right-[-1.5rem] tablet:right-[-2.1875rem] desktop:right-[-12rem] bottom-[13vh] tablet:bottom-[-9.5rem] desktop:bottom-[1.5rem] "
            alt=""
          />
          <img
            src="/img/heart.svg"
            className="absolute right-[-2rem] tablet:right-[-2.875rem] desktop:right-[-13.375rem] bottom-[27vh] tablet:bottom-[-6.5rem] desktop:bottom-[10.5rem] w-[5.625rem] h-[4.875rem]  tablet:w-[11.25rem] tablet:h-[9.75rem] desktop:w-[16.875rem] desktop:h-[14.375rem]"
            alt=""
          />
        </div>
      </main>
    </Layout>
  );
}
