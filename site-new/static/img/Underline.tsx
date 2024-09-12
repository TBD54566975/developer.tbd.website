import React from "react";

type UnderlineProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

const Underline = ({
  className,
  width = "100%",
  height = "15",
}: UnderlineProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 404 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M2 7.93273C37.9551 2.14147 183.573 1.65887 251.888 2.14147L90.9888 13C184.472 10.1044 377.551 4.31311 402 4.31311"
      stroke="none"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Underline;
