import { useState, useEffect } from 'react';
import { wait } from '../util/feedback-retry-wait';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useFeedbackRating = () => {
  const [userFeedback, setUserFeedback] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const feedbackWidgetUrl = customFields.feedbackWidgetApiUrl;
  const isFeedbackRatingEnabled = feedbackWidgetUrl && csrfToken;

  useEffect(() => {
    if (feedbackWidgetUrl) {
      getFeedbackCsrfToken(feedbackWidgetUrl)
        .then(setCsrfToken)
        .catch(console.error);
    }
  }, []);

  const refreshCsrfToken = async (feedbackWidgetUrl) => {
    const freshToken = await getFeedbackCsrfToken(feedbackWidgetUrl);
    setCsrfToken(freshToken);
    return freshToken;
  };

  const submitUserRating = async (rating, maxTries = 3) => {
    let currentToken = csrfToken;
  
    for (let currentTry = 1; currentTry <= maxTries; currentTry++) {
      try {
        setUserFeedback('submitting');
        await postFeedbackRating(feedbackWidgetUrl, currentToken, rating);
        setUserFeedback(rating);
        break;
      } catch (error) {
        console.error(`Attempt ${currentTry} failed:`, error);
        setUserFeedback('failed');
        
        if (currentTry < maxTries) {
          try {
            currentToken = await refreshCsrfToken(feedbackWidgetUrl);
          } catch (tokenError) {
            console.error('Failed to refresh CSRF token:', tokenError);
            continue; 
          }
  
          const waitTime = currentTry * 1000;
          await wait(waitTime);
        }
      }
    }
  };
  
  return {
    isFeedbackRatingEnabled,
    userFeedback,
    submitUserRating,
  };
};

const getFeedbackCsrfToken = async (feedbackWidgetUrl) => {
  const res = await fetch(`${feedbackWidgetUrl}/csrf-token`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch feedback widget CSRF token: ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  return data.csrfToken;
};

const postFeedbackRating = async (feedbackWidgetUrl, csrfToken, rating) => {
  const requestBody = {
    rating: rating === 'like' ? 'helpful' : 'notHelpful',
    pageLink: window.location.href,
  };

  const res = await fetch(`${feedbackWidgetUrl}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
    credentials: 'include',
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    throw new Error('Failed to submit feedback rating');
  } 
};
