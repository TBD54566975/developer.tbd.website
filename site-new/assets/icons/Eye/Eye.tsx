import * as React from "react";
import { SVGProps } from "react";
const Eye = ({
  height = 20,
  width = 20,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.667 5h6.666v1.667H6.667V5ZM3.333 8.333V6.667h3.334v1.666H3.333ZM1.667 10V8.333h1.666V10H1.667ZM1.667 11.667V10H0v1.667h1.667ZM3.333 13.333H1.667v-1.666h1.666v1.666ZM6.667 15H3.333v-1.667h3.334V15ZM13.333 15v1.667H6.667V15h6.666ZM16.667 13.333V15h-3.334v-1.667h3.334ZM18.333 11.667v1.666h-1.666v-1.666h1.666ZM18.333 10H20v1.667h-1.667V10Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.667 8.333V6.667h-3.334v1.666h3.334Zm0 0h1.666V10h-1.666V8.333Z"
      clipRule="evenodd"
    />
    <path fill="currentColor" d="M8.333 9.167h3.334V12.5H8.333V9.167Z" />
  </svg>
);
export default Eye;
