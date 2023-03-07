import React from 'react';
import LearnCard from './LearnCard';
import PropTypes from 'prop-types';
import Divider from './Divider';
const LearnCardList = ({ items }) => {
  const learnList = items.map((item) => {
    return {
      ...item.customProps,
      url: item.href,
      title: item.label,
      guests: item.customProps.guestslist,
    };
  });
  return (
    <div className="not-prose">
      <div className="flex flex-col gap-12 mt-12 mb-12 tablet:mb-[4.5rem] tablet:mt-[4.5rem] tablet:gap-[4.5rem]">
        <Divider type="dotted" />
        {learnList.map((learn, index) => (
          <div key={index}>
            <LearnCard {...learn} />
            {index == learnList.length - 1 ? null : (
              <div className="mt-12 tablet:mt-[4.5rem]">
                <Divider type="dotted" />
              </div>
            )}
          </div>
        ))}
        <Divider type="dotted" />
      </div>
    </div>
  );
};

LearnCardList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default LearnCardList;
