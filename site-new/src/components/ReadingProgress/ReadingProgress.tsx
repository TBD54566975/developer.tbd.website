import React, { useEffect, useRef } from "react";
import RocketProgress from "@site/assets/icons/RocketProgress";

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
    <div className="fixed top-[--ifm-navbar-height] z-20 h-[36px] w-full bg-black">
      <div className="relative w-full">
        <span ref={rocketRef} className="absolute inline-block">
          <RocketProgress />
        </span>
      </div>
    </div>
  );
};

export default ReadingProgress;
