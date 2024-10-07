import * as React from "react";
import { SVGProps } from "react";
const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path fill="currentColor" d="M4.5 11.5v2h12v2h2v-2h2v-2h-2v-2h-2v2h-12Z" />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.5 7.5h-2v-2h2v2Zm0 0h2v2h-2v-2Z"
      clipRule="evenodd"
    />
    <path fill="currentColor" d="M14.5 17.5h2v-2h-2v2ZM14.5 17.5h-2v2h2v-2Z" />
  </svg>
);
export default ArrowRight;
