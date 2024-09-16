import * as React from "react";
import { SVGProps } from "react";
const Note = ({
  width = 20,
  height = 20,
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
      d="M1.666 1.668v16.667h1.667v-1.667h1.666v-1.667H3.333V3.335h13.333v10H4.999V15h13.334V1.668H1.666Z"
    />
    <path
      fill="currentColor"
      d="M5 5.835h10V7.5H5V5.835ZM11.666 9.168H4.999v1.667h6.667V9.168Z"
    />
  </svg>
);
export default Note;
