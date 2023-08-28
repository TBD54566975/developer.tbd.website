import React, { useState, useEffect } from 'react';
import Card from './Card';
import Link from '@docusaurus/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import '../css/feedback.css';

function RatingButton({ label, icon, onClick }) {
  return (
    <div className="rating-box" onClick={onClick}>
      {label}
      <FontAwesomeIcon icon={icon} className="icon" />
    </div>
  );
}

function FeedbackWidget() {
  const [userFeedback, setUserFeedback] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('https://tbd-feedback-spreadsheet-server.vercel.app/api/csrf-token', { 
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken));
  }, []);

  const handleUserRatingClick = (rating) => {
    setUserFeedback(rating);
    const requestBody = {
      rating: rating === 'like' ? 'helpful' : 'notHelpful',
      pageLink: window.location.href,
    };
    console.log('Sending request:', requestBody);
    fetch('https://tbd-feedback-spreadsheet-server.vercel.app/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken
      },
      credentials: 'include',
      body: JSON.stringify(requestBody),
    });
  };

  return (
    <div className="flex justify-end lg:mt-8">
      <Card className="w-full">
        <h3 className="text-3xl feedback-header">Was this page helpful?</h3>
        <div className="rating">
          {userFeedback ? (
            <>
              <span>Thank you for your feedback!</span>
              <FontAwesomeIcon
                icon={userFeedback === 'like' ? faThumbsUp : faThumbsDown}
                className={userFeedback ? 'active-icon' : 'icon'}
              />
            </>
          ) : (
            <>
              <RatingButton
                label="Helpful"
                icon={faThumbsUp}
                onClick={() => handleUserRatingClick('like')}
              />
              <RatingButton
                label="Not Helpful"
                icon={faThumbsDown}
                onClick={() => handleUserRatingClick('dislike')}
              />
            </>
          )}
        </div>

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
          <a href="https://github.com/TBD54566975/developer.tbd.website/tree/main/site/docs">
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
