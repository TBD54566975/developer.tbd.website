import React from 'react';
import PropTypes from 'prop-types';
import HomeListItem from '../HomeListItem/HomeListItem';
import { Divider } from '../Divider';
const HomeList = ({ features }) => {
  return (
    <div className="grid grid-cols-1 desktop:grid-cols-2 gap-x-[8rem] gap-y-12 tablet:gap-y-14 desktop:gap-y-24">
      {features.map((feature, index) => (
        <div key={index}>
          <HomeListItem
            label={feature.cta.label}
            url={feature.cta.url}
            title={feature.title}
            text={feature.description}
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
};
export default HomeList;
