import * as React from "react";
const Minus = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
  >
    <path fill="currentColor" d="M7 11h10v2H7v-2Z" />
  </svg>
);
export default Minus;
