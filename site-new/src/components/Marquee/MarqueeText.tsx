import React, { useMemo } from "react";
import Marquee, { MarqueeProps } from "./Marquee";
import { backgroundClassesMap, BackgroundColors, cn } from "@site/lib/utils";

export type MarqueeTextProps = {
  texts: string[];
  bgColor?: BackgroundColors;
} & Pick<MarqueeProps, "repeat" | "className">;

const MarqueeText = ({
  texts,
  className,
  bgColor = "yellow",
  ...rest
}: MarqueeTextProps) => {
  const backgroundColorClass = useMemo(
    () => backgroundClassesMap[bgColor],
    [bgColor],
  );

  return (
    <Marquee
      duration="10s"
      className={cn(
        "h-twist-core-spacing-15 lg:h-twist-core-spacing-25",
        className,
        backgroundColorClass,
      )}
      {...rest}
    >
      {texts.map((item, i) => (
        <span
          key={i}
          className="relative top-1 grid place-items-center font-basis text-[1rem] leading-[1.2rem] lg:top-1.5 lg:text-[1.375rem] lg:leading-[1.65rem]"
        >
          {item}
        </span>
      ))}
    </Marquee>
  );
};

export default MarqueeText;
