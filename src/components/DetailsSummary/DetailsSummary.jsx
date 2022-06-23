import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
const DetailsSummary = ({ details, summary }) => {
  console.log('details?', details);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <p className="copy">{summary}</p>
      <details className="copy">
        <summary
          className="block cursor-pointer copy border-b-primary-yellow border-b-2 pb-[0.6875rem]"
          onClick={() => {
            console.log('entered here:', isOpen);
            setIsOpen((prevValue) => !prevValue);
          }}
        >
          <div className="flex justify-between mt-[2.8125rem]">
            <div>{isOpen ? <p>View Less</p> : <p>View More</p>}</div>
            <button>
              <div className="ml-auto float-right">
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
              </div>
            </button>
          </div>
        </summary>
        <>
          {details.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </>
      </details>
    </React.Fragment>
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
