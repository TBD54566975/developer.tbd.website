import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
const DetailsSummary = ({ details, summary }) => {
  const arrayDetails = details.toString().split(/\r?\n/);
  const [isOpen, setIsOpen] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScrollPosition(position);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (isOpen) {
      window.scroll(0, scrollPosition);
    }
  }, [isOpen]);

  const clickHandler = () => {
    setIsOpen((prevValue) => !prevValue);
  };
  return (
    <React.Fragment>
      <p className="copy">{summary}</p>
      <details className="copy">
        <summary
          className="block cursor-pointer copy border-b-primary-yellow border-b-2 pb-[0.6875rem]"
          onClick={clickHandler}
        >
          <div className="flex justify-between mt-[2.8125rem]">
            <div>
              {isOpen ? (
                <p className="my-0">View Less</p>
              ) : (
                <p className="my-0">View More</p>
              )}
            </div>
            <div className="arrow-container">
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
            </div>
          </div>
        </summary>
        <div>
          {arrayDetails.map((paragraph, index) => (
            <p key={index} className="first:mt-[2.875rem] mb-[2rem]">
              {paragraph}
            </p>
          ))}
        </div>
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
