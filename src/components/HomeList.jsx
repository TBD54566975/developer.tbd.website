import React from 'react';
import PropTypes from 'prop-types';
import Divider from './Divider';
import HomeListItem from './HomeListItem';

const HomeList = ({ features, className }) => {
  return (
    <div
      className={
        'not-prose grid grid-cols-1 desktop:grid-cols-2 gap-x-32 gap-y-12 tablet:gap-y-14 desktop:gap-y-24 ' +
        className
      }
    >
      {features.map((feature, index) => (
        <div key={index}>
          <HomeListItem
            label={feature.cta.label}
            url={feature.cta.url}
            title={feature.title}
            description={feature.description}
            className="desktop:h-full mt-12 tablet:mt-[3.5rem] first:mt-0"
          />
          {index == features.length - 1 ? null : (
            <div className="block desktop:hidden mt-12 tablet:mt-[3.5rem]">
              <Divider type="dotted" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
HomeList.propTypes = {
  /**
   * list content
   */
  features: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};
export default HomeList;
