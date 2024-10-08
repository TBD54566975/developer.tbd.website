import React from "react";
import {
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  endOfWeek,
  startOfWeek,
  isBefore,
  isAfter,
} from "date-fns";
import { cn } from "@site/lib/utils";
import { useCalendar } from "./CalendarCtx";

const colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const Calendar = ({
  renderEvents,
}: {
  renderEvents?: (_day: Date) => React.ReactNode;
}) => {
  const { firstDayCurrentMonth } = useCalendar();
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  return (
    <>
      <div className="grid grid-cols-7 gap-[0.5px] text-center text-xs leading-6 text-white *:eyebrow *:grid *:h-[49.2px] *:place-items-center *:bg-tbd-yellow *:pb-[10px] *:pt-[18px] *:text-black">
        <div>SUNDAY</div>
        <div>MONDAY</div>
        <div>TUESDAY</div>
        <div>WEDNESDAY</div>
        <div>THURSDAY</div>
        <div>FRIDAY</div>
        <div>SATURDAY</div>
      </div>
      <div className="grid grid-cols-7 gap-[0.5px] border border-solid border-white bg-gray-100 text-sm [grid-auto-rows:1fr]">
        {days.map((day, dayIdx) => {
          const isNotInThemonth =
            isBefore(day, firstDayCurrentMonth) ||
            isAfter(day, endOfMonth(firstDayCurrentMonth));
          return (
            <div
              key={day.toString()}
              className={cn(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "h-full w-full bg-black",
              )}
            >
              <div
                className={cn(
                  // isToday(day) && "font-semibold",
                  "h-full w-full justify-center px-twist-core-spacing-5 py-twist-core-spacing-6",
                )}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={cn(
                    {
                      "text-white": !isNotInThemonth,
                      "text-gray-400": isNotInThemonth,
                    },
                    "eyebrow mb-[13px] block text-right",
                  )}
                >
                  {format(day, "dd")}
                </time>
                {renderEvents?.(day)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
