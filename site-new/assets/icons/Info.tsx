import * as React from "react";
import { SVGProps } from "react";
const Info = ({
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
      d="M9.167 9.167h1.666v5H9.167v-5ZM10.833 5.833H9.167V7.5h1.666V5.833Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.167 2.5H5.833v1.667H4.167v1.666H2.5v8.334h1.667v1.666h1.666V17.5h8.334v-1.667h1.666v-1.666H17.5V5.833h-1.667V4.167h-1.666V2.5Zm0 1.667v1.666h1.666v8.334h-1.666v1.666H5.833v-1.666H4.167V5.833h1.666V4.167h8.334Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Info;
