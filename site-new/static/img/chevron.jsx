import React from 'react';

const Chevron = ({ className, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M4.66683 5.33398H3.3335V6.66732H4.66683V8.00065H6.00016V9.33398H7.3335V10.6673H8.66683V9.33398H10.0002V8.00065H11.3335V6.66732H12.6668V5.33398H11.3335V6.66732H10.0002V8.00065H8.66683V9.33398H7.3335V8.00065H6.00016V6.66732H4.66683V5.33398Z"
      fill={fill}
    />
  </svg>
);

export default Chevron;
