import { BackgroundColors } from "@site/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type BackgroundProps = {
  bgColor?: BackgroundColors;
  squareCount?: number;
  className?: string;
  childrenClassName?: string;
  children: React.ReactNode;
};

const bgColorMap: Record<BackgroundColors, string> = {
  teal: "#1af1ff",
  yellow: "#ffec19",
  purple: "#b15bff",
};

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
};

const rgbToHex = (r, g, b) => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

const darkenColor = (color, factor = 0.1) => {
  const [r, g, b] = hexToRgb(color);
  const newR = Math.max(0, Math.min(255, Math.floor(r * (1 - factor))));
  const newG = Math.max(0, Math.min(255, Math.floor(g * (1 - factor))));
  const newB = Math.max(0, Math.min(255, Math.floor(b * (1 - factor))));
  return rgbToHex(newR, newG, newB);
};

const generateRandomSquares = (count, maxWidth, maxHeight, darkerColor) => {
  const squares = [];
  const cellSize = Math.sqrt((maxWidth * maxHeight) / count);
  const padding = 10;

  const isOverlapping = (newSquare) => {
    return squares.some((square) => {
      return (
        newSquare.left < square.left + square.width + padding &&
        newSquare.left + newSquare.width + padding > square.left &&
        newSquare.top < square.top + square.height + padding &&
        newSquare.top + newSquare.height + padding > square.top
      );
    });
  };

  for (let i = 0; i < count; i++) {
    let size, top, left;
    let attempts = 0;
    let newSquare;

    do {
      size = Math.floor(Math.random() * (cellSize * 0.5) + cellSize);
      top = Math.floor(Math.random() * maxHeight);
      left = Math.floor(Math.random() * maxWidth);
      newSquare = { width: size, height: size, top, left };
      attempts++;
    } while (isOverlapping(newSquare) && attempts < 100);

    squares.push({
      ...newSquare,
      backgroundColor: darkerColor,
      position: "absolute",
    });
  }
  return squares;
};

const Background = ({
  bgColor = "yellow",
  squareCount = 10,
  className = "",
  childrenClassName = "",
  children,
}: BackgroundProps) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const bgColorHex = bgColorMap[bgColor];

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const darkerColor = darkenColor(bgColorHex, 0.1);
  const squares = generateRandomSquares(
    squareCount,
    containerSize.width,
    containerSize.height,
    darkerColor,
  );

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        backgroundColor: bgColorHex,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {squares.map((square, index) => (
        <div key={index} style={{ ...square }} />
      ))}
      <div className={`${childrenClassName} relative z-10`}>{children}</div>
    </div>
  );
};

export default Background;
