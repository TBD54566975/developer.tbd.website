import * as React from "react";
import { SVGProps } from "react";
const KotlinMobile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <path fill="#fff" d="M0 0h40L20.31 19.69 40 40H0V0Z" />
    <path fill="url(#kotlinIconMobile)" d="M0 0h40L20.31 19.69 40 40H0V0Z" />
    <defs>
      <linearGradient
        id="kotlinIconMobile"
        x1={40}
        x2={0}
        y1={0}
        y2={40}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.003} stopColor="#E44857" />
        <stop offset={0.469} stopColor="#C711E1" />
        <stop offset={1} stopColor="#7F52FF" />
      </linearGradient>
    </defs>
  </svg>
);
export default KotlinMobile;
