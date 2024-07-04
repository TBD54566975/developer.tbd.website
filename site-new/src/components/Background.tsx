import React, { useEffect, useRef, useState } from "react";

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
  const cellSize = Math.sqrt((maxWidth * maxHeight) / count); // Calculate cell size to distribute squares evenly

  for (let i = 0; i < count; i++) {
    const size = Math.floor(Math.random() * 20) + 20; // Random size between 20px and 40px
    const top = Math.floor(Math.random() * (maxHeight - size));
    const left = Math.floor(Math.random() * (maxWidth - size));

    squares.push({
      width: size,
      height: size,
      top,
      left,
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
}) => {
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
    darkerColor
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
        <div key={index} style={square}></div>
      ))}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default Background;
