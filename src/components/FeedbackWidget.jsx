import React from 'react';
import Card from './Card';

function FeedbackWidget({ EditThisPage }) {
  return (
    <div className="flex justify-end lg:mb-0">
      <Card className={'w-2/4'}>
        <h3>Was this page helpful?</h3>
        <p>
          Connect with us in{' '}
          <a href="https://discord.com/invite/tbd">Discord</a>
        </p>
        <p>
          Submit feedback:{' '}
          <a href="https://github.com/TBD54566975/developer.tbd.website/issues/new/choose">
            Open a GitHub issue
          </a>
        </p>
      </Card>
    </div>
  );
}

export default FeedbackWidget;
