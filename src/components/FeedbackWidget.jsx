import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';

function FeedbackWidget() {
  return (
    <div className="flex justify-end lg:mb-0">
      <Card className={'w-full'}>
        <h3>Was this page helpful?</h3>
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
      </Card>
    </div>
  );
}

export default FeedbackWidget;
