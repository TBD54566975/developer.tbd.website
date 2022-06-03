import React from 'react';
import PropTypes from 'prop-types';

const DetailsSummary = ({ details, summary }) => {
  return (
    <details className="text-primary-yellow"><summary>{summary}</summary>{details}</details>
  );
};

DetailsSummary.propTypes = {
  /**
   * Text content
   */
  details: PropTypes.string.isRequired,
  summary: PropTypes.string,
};

export default DetailsSummary;
