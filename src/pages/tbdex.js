import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { content } from '@site/src/content/tbdex.js';

export default function ReactPage() {
  return (
    <Layout>
      <div className="container">
        <h1>tbDEX</h1>
        <p>{content.title}</p>
        <p>{content.subtitle}</p>

        <section>
          <h2>Actors</h2>

          <div className="row">
            {content.actors.map((props, idx) => (
              <div className={clsx('col col--4')} key={idx}>
                <div className="text--center padding-horiz--md">
                  <h3>{props.title}</h3>
                  <p>{props.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Use Cases</h2>
          <ul>
            {content.uses.map((props, idx) => (
              <li key={idx}>
                <a href={props.url}>{props.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}
