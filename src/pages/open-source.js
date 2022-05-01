import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { content } from '@site/src/content/open-source.js';

export default function ReactPage() {
  return (
    <Layout>
      <div className="container">
        <h1>Open Source</h1>
        <p>{content.title}</p>
        <p>{content.subtitle}</p>

        <h2>Our Pillars</h2>

        <section>
          <div className="row">
            {content.pillars.map((props, idx) => (
              <div className={clsx('col col--4')} key={idx}>
                <div className="text--center padding-horiz--md">
                  <h3>{props.title}</h3>
                  <p>{props.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
