import React from 'react';

const KotlinIcon = ({ className, fill }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M0 0H24L12.1863 11.8137L24 24H0V0Z" fill={fill} />
    <path d="M0 0H24L12.1863 11.8137L24 24H0V0Z" fill="url(#paint0_linear_6087_62303)" />
    <defs>
      <linearGradient id="paint0_linear_6087_62303" x1="24" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0.00343514" stopColor="#E44857" />
        <stop offset="0.4689" stopColor="#C711E1" />
        <stop offset="1" stopColor="#7F52FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default KotlinIcon;
