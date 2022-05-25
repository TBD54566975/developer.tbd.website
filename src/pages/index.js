import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { content } from '@site/src/content/home.js';
import Button from '../components/Button/Button';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="bg-blue-500">
      <div className="container mx-auto text-center py-24">
        <h1 className="h1 text-primary-yellow">{siteConfig.title}</h1>
        <p className="text-xl py-6 text-white">{siteConfig.tagline}</p>

        <div className="py-10">
          <Link
            className="bg-white rounded-md text-gray-500 px-4 py-2"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
          <Button
            label="View on Github"
            url="/projects"
            imageURL="/img/github-button-icon.svg"
            colorDarkMode="cyan"
          />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <div className="grid grid-cols-3">
          {content.features.map((item, idx) => (
            <div key={idx}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.cta.url}>{item.cta.label}</a>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
