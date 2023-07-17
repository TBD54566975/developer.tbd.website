import React from 'react';
import Link from '@docusaurus/Link';

function ScheduleCard({ image, DateTime, EventName, EventDetails }) {
  return (
    <div className="p-8 w-full">
      <div className="flex flex-col items-center">
        <div className="rounded-full overflow-hidden w-40 h-40 mb-4">
          <img className="w-full h-full object-cover" src={image} alt={DateTime} />
        </div>
        <div className="text-center">
          <h3 className="text-[#22f1ff]" style={{ whiteSpace: 'nowrap' }}>{DateTime}</h3>
          <p>{EventName}</p>
          <p>{EventDetails}</p>
        </div>
      </div>
    </div>
  );
}

function ConferenceSchedule() {
  return (
    <div>
      <div className="community-card grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3 gap-4 pb-7 space-x-4">
        <ScheduleCard
          DateTime="July 27 @ 11:30"
          image="/img/learn/headshots/angie_jones.png"
          EventName={`"Refactoring the Web"`}
          EventDetails={`Angie Jones, TBD`}
        />
        <ScheduleCard
          DateTime="July 27, 17:30 - 19:30"
          image="/img/happy-hour.png"
          EventName={`TBD Happy Hour`}
          EventDetails={`Hall 2.2, Booth 2_62
          Drinks, swag & more!`}
        />
        <ScheduleCard
          DateTime="July 28 @ 09:00"
          image="/img/what_is_web5.png"
          EventName={`Web5 Workshop`}
        />
      </div>
    </div>
  );
}

export default ConferenceSchedule;
