import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { content } from '@site/src/content/projects.js';

export default function ReactPage() {
  return (
    <Layout>
      <div className="container">
        <h1>Projects</h1>
        <p>{content.title}</p>

        <section>
          <h2>List of projects</h2>

          <div className="row">
            {content.projects.map((props, idx) => (
              <div className={clsx('col col--4')} key={idx}>
                <div className="text--center padding-horiz--md">
                  <h3>{props.name}</h3>
                  <p>{props.description}</p>
                  <a href={props.url}>View Project</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3>{content.prototyping.title}</h3>
          <p>{content.prototyping.subtitle}</p>
        </section>
      </div>
    </Layout>
  );
}
