import Inclusivity from "@site/assets/icons/Inclusivity";
import { cn, textClassesMap, ToneTypes } from "@site/lib/utils";
import React from "react";

type TextIllustrationProps = {
  tone?: ToneTypes;
  titleText?: string;
  body?: React.ReactNode;
};

const TextIllustration = ({
  tone = "yellow",
  titleText = "Note",
  body,
}: TextIllustrationProps) => {
  return (
    <div>
      <div
        className={cn(
          textClassesMap[tone],
          "mb-twist-core-spacing-7 flex flex-col gap-twist-core-spacing-15 border-0 border-b-[0.5px] border-solid border-white pb-twist-core-spacing-5 lg:mb-twist-core-spacing-8 lg:pb-twist-core-spacing-7",
        )}
      >
        <Inclusivity />
        <span className="eyebrow">{titleText}</span>
      </div>
      <div>{body}</div>
    </div>
  );
};

export default TextIllustration;
