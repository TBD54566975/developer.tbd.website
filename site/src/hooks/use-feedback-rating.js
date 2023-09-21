import { useState, useEffect } from 'react';
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

  const submitUserRating = async (rating) => {
    if (!csrfToken) {
      throw new Error("Can't send feedback without CSRF token");
    }

    // TODO: we need to handle cases where the rating request fails
    setUserFeedback(rating);

    await postFeedbackRating(feedbackWidgetUrl, csrfToken, rating);
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
  console.info('Sending request:', requestBody);

  fetch(`${feedbackWidgetUrl}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
    credentials: 'include',
    body: JSON.stringify(requestBody),
  });
};
