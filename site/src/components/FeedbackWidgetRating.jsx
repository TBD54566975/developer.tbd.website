import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import '../css/feedback.css';
import { useFeedbackRating } from '../hooks';

function FeedbackWidgetRating() {
  const { isFeedbackRatingEnabled, userFeedback, submitUserRating } =
    useFeedbackRating();

  return isFeedbackRatingEnabled ? (
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
            onClick={() => submitUserRating('like')}
          />
          <RatingButton
            label="Not Helpful"
            icon={faThumbsDown}
            onClick={() => submitUserRating('dislike')}
          />
        </>
      )}
    </div>
  ) : null;
}

function RatingButton({ label, icon, onClick }) {
  return (
    <div className="rating-box" onClick={onClick}>
      {label}
      <FontAwesomeIcon icon={icon} className="icon" />
    </div>
  );
}

export default FeedbackWidgetRating;
