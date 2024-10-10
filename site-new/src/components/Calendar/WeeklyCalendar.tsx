import { add, eachDayOfInterval, startOfToday, format } from "date-fns";
import React, { useMemo } from "react";
import Heading from "@theme/Heading";

const WeeklyCalendar = () => {
  const currentDate = startOfToday();

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: currentDate,
      end: add(currentDate, { days: 6 }),
    });
  }, [currentDate]);

  return (
    <div>
      <div>
        {days.map((day) => (
          <div
            key={day.toString()}
            className="flex-1 bg-tbd-yellow pb-[10.41px] pt-[16.35px] text-black"
          >
            <div className="flex-center h-[90.8px] flex-col">
              <span className="eyebrow uppercase">{format(day, "EEEE")}</span>
              <Heading
                as="h3"
                className="mb-0 mt-twist-core-spacing-3 font-medium uppercase text-inherit"
              >
                {format(day, "dd")}
              </Heading>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
