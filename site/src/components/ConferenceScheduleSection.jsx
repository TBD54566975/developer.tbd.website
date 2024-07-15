import React from 'react';
import Link from '@docusaurus/Link';

function ScheduleCard({ image, DateTime, EventName, EventDetails,ExtraDetails }) {
  return (
    <div className="p-8 w-full">
      <div className="flex flex-col items-center">
        <div className="rounded-full overflow-hidden w-40 h-40 mb-4">
          <img className="w-full h-full object-cover" src={image} alt={DateTime} />
        </div>
        <div className="text-center">
          <h3 className="text-[#22f1ff]" style={{ whiteSpace: 'nowrap' }}>{DateTime}</h3>
          <p style={{ fontWeight: 'bold' }}>{EventName}</p>
          <p style={{color: '#1ccfdb'}}>{EventDetails}</p>
          <p style={{ fontWeight: 'bold' }}>{ExtraDetails}</p>
        </div>
      </div>
    </div>
  );
}

function ConferenceSchedule() {
  return (
    <div>
      <div className="community-card grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 pb-7 space-x-4">
        <ScheduleCard
          DateTime="July 18 @ 16:00"
          image="/img/happy-hour.png"
          EventName={`TBD Happy Hour`}
          EventDetails={`FREE Swag & Beer - see you there!🍻`}
          ExtraDetails= {`Hall 2.2, Booth 2_40`}
        />
        <ScheduleCard
          DateTime="July 18 @ 16:10"
          image="/img/communityPanel.png"
          EventName={`Panel: The Power of Developer Communities`}
          EventDetails={`Scott Hanselman, Angie Jones, Rajeev Rajan`}
          ExtraDetails= {`Tech Leaders Stage (500)`}
        />
        <ScheduleCard
          DateTime="July 19 @ 10:00"
          image="/img/learn/headshots/angie_jones.png"
          EventName={`"Do you speak tbDEX? Learn the Language of Global Payments"`}
          EventDetails={`Angie Jones`}
          ExtraDetails= {`Workshop Room M3 💻`}

        />
        <ScheduleCard
          DateTime="July 19 @ 12:20"
          image="/img/opening_panel.png"
          EventName={`Mainstage Keynote`}
          EventDetails={` Mike Brock, Daniel Buchner, Angie Jones & Nalin Mittal`}
          ExtraDetails= {`Mainstage`}
        />
      </div>
    </div>
  );
}

export default ConferenceSchedule;
