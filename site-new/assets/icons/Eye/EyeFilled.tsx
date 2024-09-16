import * as React from "react";
import { SVGProps } from "react";
const EyeFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.833 17.5h8.334v-1.667h1.666v-1.666H17.5V5.833h-1.667V4.167h-1.666V2.5H5.833v1.667H4.167v1.666H2.5v8.334h1.667v1.666h1.666V17.5Zm5-6.667H9.167v-5h1.666v5Zm-1.666 3.334h1.666V12.5H9.167v1.667Z"
      clipRule="evenodd"
    />
  </svg>
);
export default EyeFilled;
