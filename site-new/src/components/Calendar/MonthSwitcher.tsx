import React from "react";
import { useCalendar } from "./CalendarCtx";
import { format } from "date-fns";
import Heading from "@theme/Heading";

const MonthSwitcher = () => {
  const { currentMonth, previousMonth, nextMonth } = useCalendar();
  return (
    <>
      <div className="flex w-fit gap-4">
        <button
          type="button"
          onClick={previousMonth}
          className="unset -my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
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
          className="unset -my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="chevron -rotate-90 cursor-pointer bg-tbd-yellow"></span>
        </button>
      </div>
    </>
  );
};

export default MonthSwitcher;
