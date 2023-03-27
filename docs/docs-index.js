import React from 'react';
import Link from '@docusaurus/Link';
import Card from '@site/src/components/Card';

function DocsIndex() {
  return (
    <div className="docs-index">
      <h1>
        Build Web5 apps that put you in control of your data and identity.
      </h1>
      <p className="mb-8">
        <Link href="/blog/what-is-web5">Web5</Link> brings decentralized
        identity and data storage to your applications. It lets developers focus
        on creating delightful user experiences, while returning ownership of
        data and identity to individuals.
      </p>
      <Card>
        <h2>Getting Started</h2>
        <p style={{ color: 'rgb(180 180 180)' }} className="mb-4">
          Discover how to set up Web5 Apps in a few minutes.
        </p>

        <p style={{ color: 'rgb(180 180 180)' }} className="mb-4">
          WHAT YOU'LL LEARN
        </p>
        <ul className="list-disc">
          <li>Issuing Verifiable Credentials</li>
          <li>Storing data in DWNs</li>
        </ul>
      </Card>
      <h2>Component Documentation</h2>
      {/* <Card>
        <Link href="https://github.com/TBD54566975">
          <div className="flex items-center">
            <span>GitHub Repo</span>
            <span style={{ marginLeft: '12px' }}>
              <img
                src="/img/github-icon.svg"
                alt="github"
                width="20"
                height="20"
              />
            </span>
          </div>
        </Link>
      </Card> */}
    </div>
  );
}

export default DocsIndex;
