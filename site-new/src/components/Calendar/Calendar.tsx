import React, { useState } from "react";
import {
  startOfToday,
  endOfMonth,
  eachDayOfInterval,
  parse,
  getDay,
  format,
  add,
  isToday,
  isSameMonth,
  endOfWeek,
  startOfWeek,
  isBefore,
  isAfter,
} from "date-fns";
import { cn } from "@site/lib/utils";

const colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const Calendar = () => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <>
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-gray-900 text-white">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
        </button>
      </div>
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-white">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-[0.5px] border border-solid border-white bg-gray-100 text-sm">
        {days.map((day, dayIdx) => {
          const isNotInThemonth =
            isBefore(day, firstDayCurrentMonth) ||
            isAfter(day, endOfMonth(firstDayCurrentMonth));
          return (
            <div
              key={day.toString()}
              className={cn(
                dayIdx === 0 && colStartClasses[getDay(day)],
                "h-full w-full bg-black py-1.5",
              )}
            >
              <div
                className={cn(
                  !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "text-gray-400",
                  isToday(day) && "font-semibold",
                  "eyebrow mx-auto flex h-full w-full items-center justify-center rounded-full",
                  {
                    "text-white": !isNotInThemonth,
                    "text-gray-400": isNotInThemonth,
                  },
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
