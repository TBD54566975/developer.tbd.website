import React from "react";
import { cn } from "@site/lib/utils";

type UnderlineProps = {
  className?: string;
};

const Underline = ({ className }: UnderlineProps) => (
  <svg
    viewBox="0 0 302 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("tbd-underline", className)}
  >
    <path
      d="M2 7.93273C28.8315 2.14147 137.499 1.65887 188.479 2.14147L68.4079 13C138.17 10.1044 282.255 4.31311 300.5 4.31311"
      stroke="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Underline;
