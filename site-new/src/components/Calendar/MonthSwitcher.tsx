import React from "react";
import { useCalendar } from "./CalendarCtx";
import { add, format } from "date-fns";
import Heading from "@theme/Heading";
import { cn } from "@site/lib/utils";

const MonthSwitcher = ({
  maxDate,
  minDate,
  className,
}: {
  maxDate: Date;
  minDate: Date;
  className?: string;
}) => {
  const { currentMonth, previousMonth, nextMonth } = useCalendar();
  const isPreviouseMonthDisabled = add(currentMonth, { months: -1 }) < minDate;
  const isNextMonthDisabled = add(currentMonth, { months: 1 }) > maxDate;

  return (
    <div className={cn("flex gap-4", className)}>
      <button
        type="button"
        onClick={previousMonth}
        className="unset -my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 transition-transform hover:-translate-x-2 hover:scale-125 hover:text-gray-500"
        disabled={isPreviouseMonthDisabled}
      >
        <span className="chevron rotate-90 cursor-pointer bg-tbd-yellow"></span>
        <span className="sr-only">Previous month</span>
      </button>

      <Heading
        as="h3"
        className="mb-0 w-fit min-w-[13ch] flex-auto text-center font-normal text-white"
      >
        {format(currentMonth, "MMMM yyyy")}
      </Heading>
      <button
        onClick={nextMonth}
        type="button"
        className="unset -my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 transition-transform hover:translate-x-2 hover:scale-125 hover:text-gray-500"
        disabled={isNextMonthDisabled}
      >
        <span className="chevron -rotate-90 cursor-pointer bg-tbd-yellow"></span>
      </button>
    </div>
  );
};

export default MonthSwitcher;
