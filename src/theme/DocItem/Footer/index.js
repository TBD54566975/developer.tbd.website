import React from 'react';
import FeedbackWidget from '../../../components/FeedbackWidget';
import EditThisPage from '@theme/EditThisPage';

export default function FooterWrapper(props) {
  return (
    <>
      <FeedbackWidget EditThisPage={EditThisPage} />
    </>
  );
}
