import { cn } from "@site/lib/utils";
import { useMemo } from "react";
type MarqueeDuration = "5s" | "10s" | "20s" | "40s" | "60s" | "80s" | "100s";

const durationMap: Record<MarqueeDuration, `[--${string}:${MarqueeDuration}]`> =
  {
    "5s": "[--duration:5s]",
    "10s": "[--duration:10s]",
    "20s": "[--duration:20s]",
    "40s": "[--duration:40s]",
    "60s": "[--duration:60s]",
    "80s": "[--duration:80s]",
    "100s": "[--duration:100s]",
  };

export type MarqueeProps = {
  className?: string;
  duration?: MarqueeDuration;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  // [key: string]: any;
};

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "40s",
  ...props
}: MarqueeProps) {
  const durationClass = useMemo(() => durationMap[duration], [duration]);
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:var(--twist-core-spacing-5)] [gap:var(--gap)]",
        durationClass,
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
