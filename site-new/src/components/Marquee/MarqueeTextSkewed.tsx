import React from "react";
import MarqueeText, { MarqueeTextProps } from "./MarqueeText";
import { cn } from "@site/lib/utils";

type Props = MarqueeTextProps;

const MarqueeTextSkewed = ({ className, ...props }: Props) => {
  return (
    <div className="h-[68px] overflow-x-clip md:h-24 lg:h-32 xl:h-[150px]">
      <MarqueeText
        className={cn(
          "w-[110%] origin-top-right -translate-x-2 -rotate-[3.125deg] lg:-rotate-[2.46deg]",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default MarqueeTextSkewed;
