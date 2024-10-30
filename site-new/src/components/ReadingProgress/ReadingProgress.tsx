import React, { useEffect, useRef } from "react";
import RocketProgress from "@site/assets/icons/RocketProgress";
import { BlockBg } from "@site/src/components/BlockBg";

const ReadingProgress = () => {
  const rocketRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const updateProgressBar = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      const scrollPercent =
        (scrollTop / (scrollHeight - window.innerHeight)) * 100;

      if (rocketRef.current) {
        rocketRef.current.style.left = `calc(${Math.max(scrollPercent)}%)`;
      }
    };
    document.addEventListener("scroll", updateProgressBar);

    return () => {
      document.removeEventListener("scroll", updateProgressBar);
    };
  }, [rocketRef]);

  return (
    <div className="fixed z-20 h-[72px] w-full bg-black">
      <div className="relative w-full">
        <span
          ref={rocketRef}
          className="relative flex items-center py-twist-core-spacing-6"
        >
          <span>
            <BlockBg
              maxSize={4}
              minSize={2}
              className="top=[12px] absolute h-2 w-4 transform bg-[transparent]"
              secondaryClassName="bg-tbd-yellow-shade-2"
              animate
              intervalDuration={100}
            />
          </span>
          <RocketProgress />
        </span>
      </div>
    </div>
  );
};

export default ReadingProgress;
