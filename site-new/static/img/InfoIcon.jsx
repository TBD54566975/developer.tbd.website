import React from "react";

const InfoIcon = ({ className, fill }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M11 11H13V17H11V11Z" fill="currentColor" />
    <path d="M13 7H11V9H13V7Z" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 3H7V5H5V7H3V17H5V19H7V21H17V19H19V17H21V7H19V5H17V3ZM17 5V7H19V17H17V19H7V17H5V7H7V5H17Z"
      fill={fill}
    />
  </svg>
);

export default InfoIcon;
