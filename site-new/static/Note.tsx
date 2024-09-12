import React from "react";

const Note = ({ className }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M14 4.00781H4V6.00781H14V4.00781Z" fill="#FFEC19" />
    <path d="M4 8.00781H14V10.0078H4V8.00781Z" fill="#FFEC19" />
    <path d="M11 12.0078H4V14.0078H11V12.0078Z" fill="#FFEC19" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0.0078125V18.0078H18V0.0078125H0ZM16 2.00781V16.0078H2V2.00781H16Z"
      fill="#FFEC19"
    />
  </svg>
);

export default Note;
