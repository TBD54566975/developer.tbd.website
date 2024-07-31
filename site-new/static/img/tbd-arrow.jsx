import React from 'react';

const tbdArrow = ({ className, fill }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.3346 7.33398V8.66732H5.33464V10.0007H4.0013L4.0013 8.66732L2.66797 8.66732L2.66797 7.33398L4.0013 7.33398L4.0013 6.00065L5.33464 6.00065V7.33398L13.3346 7.33398Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.66797 4.66732L5.33464 4.66732L5.33464 6.00065H6.66797L6.66797 4.66732ZM6.66797 4.66732H8.0013V3.33398L6.66797 3.33398V4.66732Z"
      fill={fill}
    />
    <path d="M6.66797 11.334H5.33464L5.33464 10.0007H6.66797V11.334Z" fill={fill} />
    <path d="M6.66797 11.334H8.0013L8.0013 12.6673H6.66797L6.66797 11.334Z" fill={fill} />
  </svg>
);

export default tbdArrow;
