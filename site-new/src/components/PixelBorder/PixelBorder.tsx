import { BackgroundColors, backgroundClassesMap, cn } from "@site/lib/utils";
import React, { useEffect, useState } from "react";

interface PixelBorderProps {
  blockSize?: number;
  className?: string;
  blockClassName?: string;
  tone1?: BackgroundColors;
  tone2?: BackgroundColors;
  borderType?: "regular" | "thicker";
  refreshRate?: number;
}

const PixelBorder: React.FC<PixelBorderProps> = ({
  blockSize = 20,
  className = "",
  blockClassName = "",
  tone1 = "black",
  tone2 = "yellow-shade-1",
  borderType = "regular",
  refreshRate = 1250,
}) => {
  const [numBlocks, setNumBlocks] = useState(0);
  const [blocks, setBlocks] = useState<string[]>([]);

  const generateRandomBlocks = (count: number) => {
    const newBlocks: string[] = [];
    const sectionCount = 4;
    const blocksPerSection = Math.floor(count / sectionCount);

    for (let section = 0; section < sectionCount; section++) {
      let i = 0;
      if (borderType === "regular") {
        let previousBlock = tone2;
        while (i < blocksPerSection) {
          const isTone1 =
            previousBlock === tone2 ? Math.random() > 0.1 : Math.random() > 0.2;
          const newBlock = isTone1 ? tone1 : tone2;
          newBlocks.push(backgroundClassesMap[newBlock]);
          previousBlock = newBlock;
          i++;
        }
      } else if (borderType === "thicker") {
        while (i < blocksPerSection) {
          const chunkSize = Math.floor(Math.random() * 4) + 2;
          const color = Math.random() > 0.5 ? tone1 : tone2;
          for (let j = 0; j < chunkSize && i < blocksPerSection; j++, i++) {
            newBlocks.push(backgroundClassesMap[color]);
          }

          i += Math.floor(Math.random() * 1);
        }
      }
    }

    setBlocks(newBlocks);
  };

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth;
      const blockCount = Math.floor(containerWidth / blockSize);
      setNumBlocks(blockCount);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [blockSize]);

  useEffect(() => {
    generateRandomBlocks(numBlocks);
  }, [numBlocks, tone1, tone2, borderType]);

  useEffect(() => {
    const interval = setInterval(() => {
      generateRandomBlocks(numBlocks);
    }, refreshRate);

    return () => clearInterval(interval);
  }, [numBlocks, tone1, tone2, borderType, refreshRate]);

  return (
    <div
      className={cn("flex flex-wrap justify-center", className)}
      style={{ width: "100%" }}
    >
      {blocks.map((color, index) => (
        <div
          key={index}
          className={cn(color, blockClassName)}
          style={{ width: blockSize, height: blockSize }}
        ></div>
      ))}
    </div>
  );
};

export default PixelBorder;
