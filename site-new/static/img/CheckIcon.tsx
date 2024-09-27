import * as React from "react";
import { SVGProps } from "react";
const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={7}
    fill="none"
    {...props}
  >
    <path
      fill="#FFEC19"
      d="M.168 3.5h1.333v1.334H.168V3.501ZM1.501 4.834h1.334v1.333H1.5V4.834ZM2.835 3.5h1.333v1.334H2.835V3.501ZM4.168 2.167h1.333v1.334H4.168V2.167ZM5.501.834h1.334v1.333H5.5V.834Z"
    />
  </svg>
);
export default CheckIcon;
