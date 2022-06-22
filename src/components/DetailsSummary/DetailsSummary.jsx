import React from 'react';
import PropTypes from 'prop-types';

const DetailsSummary = ({ details, summary }) => {
  return (
    <details className="not-prose copy">
      <summary className="flex cursor-pointer copy">
        {summary}
        <button className="ml-auto float-right">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 8H5V10H7V12H9V14H11V16H13V14H15V12H17V10H19V8H17V10H15V12H13V14H11V12H9V10H7V8Z"
              fill="#FFEC19"
            />
          </svg>
        </button>
      </summary>
      {details}
    </details>
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
