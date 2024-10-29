import { cn } from "@site/lib/utils";
import { useEffect, useMemo, useState } from "react";

function getRandomNumber({ min, max }: { min: number; max: number }): number {
  if (min > max) {
    throw new Error("Minimum should be less than or equal to maximum.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function populateGrid(grid: number[][], decreaseBlockLevel: number): void {
  const rows = grid.length;
  const cols = grid[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        // sometimes populate the grid randomly without checking if the cell is occupied
        if (Math.floor(Math.random() * 2) % 2 === 0) {
          grid[i][j] = 1;
          continue;
        }
        let isOccupied = false;
        if (i > 0 && grid[i - 1][j] === 1) {
          isOccupied = true;
        }
        if (j > 0 && grid[i][j - 1] === 1) {
          isOccupied = true;
        }
        if (i < rows - 1 && grid[i + 1][j] === 1) {
          isOccupied = true;
        }
        if (j < cols - 1 && grid[i][j + 1] === 1) {
          isOccupied = true;
        }
        if (!isOccupied) {
          grid[i][j] = 1;
        }
      }
    }
  }

  let randomIterations = decreaseBlockLevel;

  while (randomIterations--) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 1 && Math.floor(Math.random() * 2) % 2 === 0) {
          grid[i][j] = 0;
        }
      }
    }
  }
}

const widths = {
  0: "25%",
  1: "50%",
  2: "75%",
  3: "100%",
} as const;

type BlockBgProps = {
  minSize: number;
  maxSize: number;
  rows?: number;
  columns?: number;
  className?: string;
  children?: React.ReactNode;
  decreaseBlockLevel?: number;
  secondaryClassName?: string;
} & (
  | { animate?: false; intervalDuration?: never }
  | {
      animate: true;
      intervalDuration: number;
    }
);

const BlockBg = ({
  maxSize,
  minSize,
  rows = 12,
  columns = 12,
  className,
  children,
  decreaseBlockLevel = 2,
  secondaryClassName,
  ...props
}: BlockBgProps) => {
  const [timer, setTimer] = useState(0);

  const grid = useMemo(() => {
    const generatedGrid = new Array(rows)
      .fill(0)
      .map(() => new Array(columns).fill(0));
    populateGrid(generatedGrid, decreaseBlockLevel);
    return generatedGrid;
  }, [timer]);

  useEffect(() => {
    if (props.animate) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, props.intervalDuration);

      return () => {
        clearInterval(interval);
      };
    }
  }, [props.animate]);

  return (
    <div
      className={`${className} relative grid w-full overflow-clip *:[grid-area:1/]`}
    >
      <div className={cn("absolute inset-0 z-0 w-full")}>
        {grid.map((row, i) => {
          // generate a random height for the row
          const height = getRandomNumber({ min: minSize, max: maxSize });
          return (
            <div
              className="grid h-full w-full grid-rows-1"
              key={i}
              style={{
                height,
                gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
              }}
            >
              {row.map((col, j) => {
                if (!col) return null;
                // sometime use height as width sometime use height sometimes take full width
                const randomNumber = Math.floor(Math.random() * 4) as 0 | 1 | 3;

                const width =
                  Math.floor(Math.random() * 2) % 2 === 0
                    ? height
                    : Math.floor(Math.random() * 2) % 2 === 0
                      ? getRandomNumber({ min: minSize, max: maxSize })
                      : widths[randomNumber];

                const randomHeight =
                  (Number.parseInt(widths[randomNumber].split("%")[0], 10) *
                    height) /
                  100;
                return (
                  <div
                    key={j}
                    className={secondaryClassName}
                    style={{
                      height: randomHeight,
                      width,
                      gridColumnStart: j + 1,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="z-10">{children}</div>
    </div>
  );
};

export default BlockBg;
