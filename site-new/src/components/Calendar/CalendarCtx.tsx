import { createRequiredContext } from "@site/src/utils/helpers";
import React, { useState } from "react";
import { format, startOfToday, add, parse } from "date-fns";

const [useCalendar, CalendarCtxProvider] = createRequiredContext<{
  currentMonth: string;
  previousMonth: () => void;
  nextMonth: () => void;
  firstDayCurrentMonth: Date;
}>();

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const today = startOfToday();

  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <CalendarCtxProvider
      value={{
        firstDayCurrentMonth,
        currentMonth,
        nextMonth,
        previousMonth,
      }}
    >
      {children}
    </CalendarCtxProvider>
  );
};

export { useCalendar, CalendarProvider };
