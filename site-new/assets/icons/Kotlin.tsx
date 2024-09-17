import * as React from "react";
import { SVGProps } from "react";
<<<<<<< HEAD
const Kotlin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
=======
const Kotlin = ({
  height = 60,
  width = 60,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
>>>>>>> 6db78d23 (add IconButton Component)
    fill="none"
    {...props}
  >
    <path fill="#fff" d="M0 0h60L30.466 29.534 60 60H0V0Z" />
<<<<<<< HEAD
    <path
      fill="url(#paint0_linear_102_14452)"
      d="M0 0h60L30.466 29.534 60 60H0V0Z"
    />
    <defs>
      <linearGradient
=======
    <path fill="url(#a)" d="M0 0h60L30.466 29.534 60 60H0V0Z" />
    <defs>
      <linearGradient
        id="a"
>>>>>>> 6db78d23 (add IconButton Component)
        x1={60}
        x2={0}
        y1={0}
        y2={60}
        gradientUnits="userSpaceOnUse"
<<<<<<< HEAD
        id="paint0_linear_102_14452"
=======
>>>>>>> 6db78d23 (add IconButton Component)
      >
        <stop offset={0.003} stopColor="#E44857" />
        <stop offset={0.469} stopColor="#C711E1" />
        <stop offset={1} stopColor="#7F52FF" />
      </linearGradient>
    </defs>
  </svg>
);
export default Kotlin;
