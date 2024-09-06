import React, { useEffect, useRef, useState } from "react";

type BackgroundProps = {
  width?: number;
  height?: number;
  primaryColor: string;
  squareCount?: number;
  className?: string;
  children: React.ReactNode;
  childrenClassName?: string;
};

// Helper functions to manipulate colors
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
  const minSize = Math.max(10, Math.min(maxWidth, maxHeight) * 0.05);
  const maxSize = Math.min(maxWidth, maxHeight) * 0.5;
  const padding = Math.max(5, minSize * 0.1);

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
      size = Math.floor(Math.random() * (maxSize - minSize) + minSize); // Dynamic size based on container
      top = Math.floor(Math.random() * (maxHeight - size));
      left = Math.floor(Math.random() * (maxWidth - size));
      newSquare = { width: size, height: size, top, left };
      attempts++;
    } while (isOverlapping(newSquare) && attempts < 100); // Retry if overlapping

    squares.push({
      ...newSquare,
      backgroundColor: darkerColor,
      position: "absolute",
      zIndex: 0, // Ensure squares are behind the content
    });
  }
  return squares;
};

// BackgroundColor Component
const Background = ({
  width,
  height,
  primaryColor,
  squareCount = 10,
  className,
  children,
  childrenClassName = "",
}: BackgroundProps) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const containerWidth = width || containerSize.width;
  const containerHeight = height || containerSize.height;

  const darkerColor = darkenColor(primaryColor, 0.1);
  const squares = generateRandomSquares(
    squareCount,
    containerWidth,
    containerHeight,
    darkerColor,
  );

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        position: "relative",
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
        backgroundColor: primaryColor,
        overflow: "hidden",
      }}
    >
      {squares.map((square, index) => (
        <div key={index} style={{ ...square, zIndex: 0 }}></div>
      ))}
      <div
        className={childrenClassName}
        style={{ position: "relative", zIndex: 1 }}
      >
        {children}
      </div>
    </div>
  );
};

export default Background;
