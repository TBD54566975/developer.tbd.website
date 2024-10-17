import * as React from "react";
import { SVGProps } from "react";
const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M13.335 7.833v1.334h-8V10.5H4V9.167H2.668V7.833h1.333V6.5h1.334v1.333h8Z"
    />
    <path
      fill="#000"
      fillRule="evenodd"
      d="M6.668 5.167H5.335V6.5h1.333V5.167Zm0 0h1.333V3.833H6.668v1.334Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      d="M6.668 11.833H5.335V10.5h1.333v1.333ZM6.668 11.833h1.333v1.334H6.668v-1.334Z"
    />
  </svg>
);
export default ArrowLeft;
