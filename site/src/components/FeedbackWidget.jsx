import React from 'react';
import Card from './Card';
import Link from '@docusaurus/Link';

function FeedbackWidget() {
  return (
    <div className="flex justify-end lg:mt-8">
      <Card className={'w-full'}>
        <h3 className="text-3xl">Was this page helpful?</h3>
        <p>
          Connect with us on{' '}
          <a href="https://discord.com/invite/tbd">Discord</a>
        </p>
        <p>
          Submit feedback:{' '}
          <a href="https://github.com/TBD54566975/developer.tbd.website/issues/new/choose">
            Open a GitHub issue
          </a>
        </p>
        <p>
          Edit this page:{' '}
          <a href="https://github.com/TBD54566975/developer.tbd.website/tree/main/docs">
            GitHub Repo
          </a>
        </p>
        <p>
          Contribute:{' '}
          <Link to="/open-source/contributing">Contributing Guide</Link>
        </p>
      </Card>
    </div>
  );
}

export default FeedbackWidget;
