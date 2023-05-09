import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';

function FeedbackWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandableContentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      expandableContentRef.current.classList.add('expandable-content-expanded');
    } else {
      expandableContentRef.current.classList.remove(
        'expandable-content-expanded',
      );
    }
  }, [isExpanded]);

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  console.log('isExanded', isExpanded);

  return (
    <div className="flex-col justify-start">
      <Card className={'w-1/3 border-accent-purple lg:p-4'}>
        <h3 className="m-0">Was this page helpful?</h3>
        <button
          className={`expand-btn pt-4 animate-pulse p-4 ${
            isExpanded ? 'expandable-content-expanded' : ''
          }`}
          onClick={handleExpandToggle}
          type="button"
        >
          <img src="/img/arrow-blue.svg" />
        </button>
        <div className={`expandable-content`} ref={expandableContentRef}>
          <div className="mb-4">
            <p>Connect with us:</p>
            <a href="https://discord.com/invite/tbd">Discord</a>
          </div>
          <p>
            <div>
              <p>Submit feedback:</p>
              <a href="https://github.com/TBD54566975/developer.tbd.website/issues/new/choose">
                Open a GitHub issue
              </a>
            </div>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default FeedbackWidget;
