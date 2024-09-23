import React from "react";
import PixelBorder from "./PixelBorder";
import { cn } from "@site/lib/utils";
import { BackgroundColors } from "@site/lib/utils";

interface PixelBorderWrapperProps {
  children: React.ReactNode;
  outerTopClassName?: string;
  outerBottomClassName?: string;
  blockSize?: number;
  refreshRate?: number;
  tone1?: BackgroundColors;
  tone2?: BackgroundColors;
}

const PixelBorderWrapper: React.FC<PixelBorderWrapperProps> = ({
  children,
  outerTopClassName = "",
  outerBottomClassName = "",
  blockSize = 50,
  refreshRate = 2500,
  tone1 = "black",
  tone2 = "yellow-shade-1",
}) => {
  return (
    <div className="relative">
      <PixelBorder
        blockSize={blockSize}
        className={cn(outerTopClassName)}
        refreshRate={refreshRate}
        tone1={tone1}
        tone2={tone2}
      />

      <PixelBorder
        blockSize={blockSize}
        borderType="thicker"
        refreshRate={refreshRate}
        tone1={tone1}
        tone2={tone2}
      />

      <div className="relative z-10">{children}</div>

      <PixelBorder
        blockSize={blockSize}
        borderType="thicker"
        refreshRate={refreshRate}
        tone1={tone1}
        tone2={tone2}
      />

      <PixelBorder
        blockSize={blockSize}
        className={cn(outerBottomClassName)}
        refreshRate={refreshRate}
        tone1={tone1}
        tone2={tone2}
      />
    </div>
  );
};

export default PixelBorderWrapper;
