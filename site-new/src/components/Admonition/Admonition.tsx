import { Eye, EyeFilled } from "@site/assets/icons/Eye";
import Heart from "@site/assets/icons/Heart";
import Info from "@site/assets/icons/Info";
import Note from "@site/assets/icons/Note";
import { cn } from "@site/lib/utils";
import React from "react";

export type Variant = "info" | "warning" | "tip" | "danger" | "note";

const variantBorderClassesMap: Record<Variant, string> = {
  info: "border-tbd-info",
  warning: "border-tbd-warn",
  tip: "border-tbd-teal",
  danger: "border-tbd-danger",
  note: "border-tbd-yellow",
};

const variantTextClassesMap: Record<Variant, string> = {
  info: "text-tbd-info",
  warning: "text-tbd-warn",
  tip: "text-tbd-teal",
  danger: "text-tbd-danger",
  note: "text-tbd-yellow",
};

const variantTextMap: Record<Variant, string> = {
  info: "INFORMATION",
  warning: "WARNING",
  tip: "TIP",
  danger: "DANGER",
  note: "NOTE",
};

const variantIconMap: Record<Variant, React.ReactNode> = {
  info: <Info />,
  warning: <Eye />,
  tip: <Heart />,
  danger: <EyeFilled />,
  note: <Note />,
};

type AdmonitionProps = {
  variant: Variant;
  children: React.ReactNode;
  classes?: string;
};

const Admonition = ({ variant, children, classes }: AdmonitionProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-twist-core-spacing-4 border border-l-8 border-solid bg-tbd-gray-shade-2 p-7",
        variantBorderClassesMap[variant],
        classes,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-twist-core-spacing-3 lg:gap-twist-core-spacing-4",
          variantTextClassesMap[variant],
        )}
      >
        {variantIconMap[variant]}
        <span
          className={cn("eyebrow relative top-[2px] uppercase lg:top-[3px]")}
        >
          {variantTextMap[variant]}
        </span>
      </div>
      <div className="sidebar">
        {typeof children === "string" ? (
          <p className="mb-0 lg:text-lg">{children}</p>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Admonition;
