import React from 'react';
import EventCard from './EventCard';
import PropTypes from 'prop-types';
import Divider from './Divider';
const EventCardList = ({ items }) => {
  const learnList = items.map((item) => {
    return { ...item.customProps, url: item.href, title: item.label };
  });

  return (
    <div className="not-prose">
      <div className="flex flex-col gap-12 mt-12 tablet:mt-[4.5rem] desktop:gap-[4.5rem]">
        {learnList.map((learn, index) => (
          <div key={index}>
            <EventCard {...learn} />

            <div className="mt-12 desktop:mt-[4.5rem]">
              <Divider type="dotted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

EventCardList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default EventCardList;
