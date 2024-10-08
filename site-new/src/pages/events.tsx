import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CalendarProvider,
  MonthSwitcher,
} from "../components/Calendar";
import { format } from "date-fns";
import { max, min } from "date-fns";
import Link from "@docusaurus/Link";
import { cn } from "@site/lib/utils";
import { Loading } from "../components/Loading";
import ArrowRight from "@site/assets/icons/ArrowRight";

export interface EventType {
  start: string;
  end: string;
  summary: string;
  htmlLink: string;
  location: string;
  description: string;
}

const createGoogleCalendarLink = (event: EventType) => {
  const startTime = new Date(event.start)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "");
  const endTime = new Date(event.end)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "");
  const details = encodeURIComponent(
    event.description || "No details provided.",
  );
  const location = encodeURIComponent(
    event.location || "No location provided.",
  );
  const text = encodeURIComponent(event.summary || "No title");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
};

type EventGroup = Record<string, EventType[]>;

const groupEventsByDate = (events: EventType[]) => {
  return events.reduce((acc, event) => {
    const date = new Date(event.start).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} satisfies EventGroup);
};

const lineClampMap = {
  1: "line-clamp-3",
  2: "line-clamp-2",
  3: "line-clamp-1",
};

const CalenderSwitcherButton = ({
  children,
  onClick,
  isActive,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "unset flex items-center border border-solid px-twist-core-spacing-4 py-twist-core-spacing-2",
        {
          "border-white text-white hover:border-tbd-yellow hover:text-tbd-yellow":
            !isActive,
          "border-tbd-yellow bg-tbd-yellow text-black": isActive,
        },
      )}
    >
      {children}
    </button>
  );
};

const CalendarEvent = ({
  event,
  noOfEvents,
}: {
  event: EventType;
  noOfEvents: number;
}) => {
  const startTime = format(event.start, "h.mm a");
  const noOfEventsNormalized = noOfEvents > 3 ? 3 : noOfEvents;
  const lineClamp = lineClampMap[noOfEventsNormalized];

  return (
    <div>
      <time className="eyebrow text-tbd-yellow">{startTime}</time>
      <Link
        className="h-[76.5px]"
        target="_blank"
        href={createGoogleCalendarLink(event)}
      >
        <p className={cn("p text-white hover:text-tbd-yellow", lineClamp)}>
          {event.summary}
        </p>
      </Link>
    </div>
  );
};

const getEventsAsync = async () => {
  const resp = await fetch(
    "https://developer-tbd-website-calendar-service.tbddev.org/events",
  );
  const eventsData = (await resp.json()) as EventType[];
  return eventsData;
};

const Events = () => {
  const [calendarView, setCalendarView] = useState<"monthly" | "daily">(
    "monthly",
  );
  const [isLoading, setIsLoading] = useState(true);

  const [eventsData, setEventsData] = useState<EventGroup>();
  const allDates = useMemo(() => {
    if (eventsData) {
      return Object.keys(eventsData);
    }
    return [];
  }, [eventsData]);

  useEffect(() => {
    getEventsAsync()
      .then((eventsData) => {
        setEventsData(groupEventsByDate(eventsData));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <CalendarProvider>
        <div className="mb-[47px] grid grid-cols-3">
          <div />
          <MonthSwitcher maxDate={max(allDates)} minDate={min(allDates)} />
          <div className="flex flex-row justify-end">
            <CalenderSwitcherButton
              onClick={() => setCalendarView("monthly")}
              isActive={calendarView === "monthly"}
            >
              Month View
              {calendarView === "monthly" && <ArrowRight />}
            </CalenderSwitcherButton>
            <CalenderSwitcherButton
              onClick={() => setCalendarView("daily")}
              isActive={calendarView === "daily"}
            >
              {calendarView === "daily" && (
                <ArrowRight className="rotate-180 transform" />
              )}
              Day View
            </CalenderSwitcherButton>
          </div>
        </div>

        {isLoading && (
          <div className="flex h-dvh w-full items-center justify-center">
            <Loading />
          </div>
        )}
        {calendarView === "monthly" && !isLoading && (
          <Calendar
            renderEvents={(calendarDate) => {
              const date = calendarDate.toLocaleDateString();
              if (eventsData && eventsData[date]) {
                return (
                  <div className="mt-[13px] flex flex-col gap-[13px]">
                    {eventsData[date].map((event) => (
                      <CalendarEvent
                        key={event.htmlLink}
                        event={event}
                        noOfEvents={eventsData[date].length}
                      />
                    ))}
                  </div>
                );
              }
            }}
          />
        )}
      </CalendarProvider>
    </div>
  );
};

export default Events;
