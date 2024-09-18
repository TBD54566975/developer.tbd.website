import React from "react";
import PixelBorder from "./PixelBorder"; // Assuming your PixelBorder component is here
import { cn } from "@site/lib/utils"; // Utility for combining class names

interface PixelBorderWrapperProps {
  children: React.ReactNode;
  outerTopClassName?: string; // Custom class for outer top PixelBorder
  outerBottomClassName?: string; // Custom class for outer bottom PixelBorder
  blockSize?: number; // Block size to pass to PixelBorder
  refreshRate?: number; // Refresh rate to pass to PixelBorder
}

const PixelBorderWrapper: React.FC<PixelBorderWrapperProps> = ({
  children,
  outerTopClassName = "",
  outerBottomClassName = "",
  blockSize = 50,
  refreshRate = 1500,
}) => {
  return (
    <div className="relative">
      {/* Outer top PixelBorder with custom class */}
      <PixelBorder
        blockSize={blockSize}
        className={cn(outerTopClassName)}
        refreshRate={refreshRate}
      />

      {/* Inner top PixelBorder with thicker mode */}
      <PixelBorder
        blockSize={blockSize}
        borderType="thicker"
        refreshRate={refreshRate}
      />

      {/* Children content */}
      <div className="relative z-10">{children}</div>

      {/* Inner bottom PixelBorder with thicker mode */}
      <PixelBorder
        blockSize={blockSize}
        borderType="thicker"
        refreshRate={refreshRate}
      />

      {/* Outer bottom PixelBorder with custom class */}
      <PixelBorder
        blockSize={blockSize}
        className={cn(outerBottomClassName)}
        refreshRate={refreshRate}
      />
    </div>
  );
};

export default PixelBorderWrapper;
