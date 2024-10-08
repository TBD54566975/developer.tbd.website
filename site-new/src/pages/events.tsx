import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CalendarProvider,
  MonthSwitcher,
} from "../components/Calendar";
import { format, isSameDay } from "date-fns";
import { max, min } from "date-fns";
import Link from "@docusaurus/Link";
import { cn } from "@site/lib/utils";
import { Loading } from "../components/Loading";
import ArrowRight from "@site/assets/icons/ArrowRight";

import Heading from "@theme/Heading";
import VideoCamera from "@site/assets/icons/VideoCamera";
import Discord from "@site/static/Discord";

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

const AddToCalendarButton = ({
  className,
  event,
}: {
  className?: string;
  event: EventType;
}) => {
  return (
    <Link
      className={cn(
        className,
        "cursor-pointer bg-white p-[10px] text-black transition-colors hover:bg-tbd-yellow hover:text-black",
      )}
      target="_blank"
      href={createGoogleCalendarLink(event)}
    >
      Add to Calendar +
    </Link>
  );
};

const DailyViewEvent = ({ event }: { event: EventType }) => {
  const fromTime = format(event.start, "hh:mma");
  const toTime = format(event.end, "hh:mma");

  const isDiscordLink = event.location?.startsWith("https://discord.com");
  return (
    <div>
      <div className="w-full *:grid *:grid-cols-2 *:gap-x-[134px]">
        <div>
          <p className="eyebrow mb-0 text-xs leading-[120%]">
            {fromTime} - {toTime}
          </p>
          <span className="eyebrow">
            <span className="mr-1 opacity-50">#</span>
            Show and Tells
          </span>
        </div>
        <div className="mt-[19px]">
          <Heading as="h3" className="mb-0 text-tbd-yellow">
            {event.summary}
          </Heading>
          <div className="flex">
            <VideoCamera className="relative top-1 mr-3 text-tbd-yellow" />
            <Heading as="h4">Livestream</Heading>
          </div>
        </div>
        <div className="mt-[37px]">
          <div>
            {event.description ? (
              <div dangerouslySetInnerHTML={{ __html: event.description }} />
            ) : (
              <AddToCalendarButton event={event} />
            )}
          </div>

          {isDiscordLink && (
            <Link
              className={
                "flex-center w-max gap-twist-core-spacing-2 border-[0.5px] border-solid px-[9px] py-[6px] text-white"
              }
              href={event.location}
            >
              <Discord />
              <span className="tag capitalize">Discord</span>
            </Link>
          )}
        </div>
      </div>
      {event.description && (
        <AddToCalendarButton className="mt-[37px] inline-block" event={event} />
      )}
    </div>
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [eventsData, setEventsData] = useState<EventGroup>({});

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
        setSelectedDate(new Date(eventsData[0].start));
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
          {calendarView === "monthly" ? (
            <MonthSwitcher maxDate={max(allDates)} minDate={min(allDates)} />
          ) : (
            <div />
          )}
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
        {calendarView === "daily" && !isLoading && selectedDate && (
          <div>
            <div className="flex gap-[1px] bg-black">
              {Object.keys(eventsData)
                .slice(0, 7)
                .map((day) => {
                  const isActiveDay = isSameDay(day, selectedDate);

                  return (
                    <div
                      key={day.toString()}
                      className={cn(
                        "flex-1 cursor-pointer pb-[10.41px] pt-[16.35px] text-black",
                        {
                          "bg-tbd-yellow": !isActiveDay,
                          "bg-tbd-yellow-shade-2": isActiveDay,
                        },
                      )}
                      onClick={() => setSelectedDate(new Date(day))}
                    >
                      <div className="flex-center h-[90.8px] flex-col">
                        <span className="eyebrow uppercase">
                          {format(day, "EEEE")}
                        </span>
                        <Heading
                          as="h3"
                          className="mb-0 mt-twist-core-spacing-3 font-medium uppercase text-inherit"
                        >
                          {format(day, "dd")}
                        </Heading>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex flex-col">
              {eventsData[selectedDate.toLocaleDateString()]?.map((event) => (
                <div
                  key={event.htmlLink}
                  className="border-0 border-b-[0.5px] border-solid pb-[calc(var(--twist-core-spacing-25)+40px)] pt-[50px]"
                >
                  <DailyViewEvent event={event} />
                </div>
              ))}
            </div>
          </div>
        )}
      </CalendarProvider>
    </div>
  );
};

export default Events;
