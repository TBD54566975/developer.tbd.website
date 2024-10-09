import * as React from "react";
import { SVGProps } from "react";
const VideoCamera = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 5.5h14v4h2v-2h2v-2h2v14h-2v-2h-2v-2h-2v4H2v-14Zm2 12h10v-10H4v10Z"
      clipRule="evenodd"
    />
  </svg>
);
export default VideoCamera;
