import React from 'react';
import { Biography } from '../Biography';
import PropTypes from 'prop-types';
const BiographyList = ({ title, biographies, growToFit }) => {
  let classGrow =
    'grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))]';
  if (!growToFit) {
    classGrow = 'grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,22rem)]';
  }
  return (
    <div className="not-prose gap-y-48">
      <h2 className="h2-caps ml-0 text-primary-yellow mb-6 tablet:mb-9  empty:hidden">
        {title}
      </h2>
      <div
        className={
          'grid grid-cols-1 desktop:grid-cols-2 gap-x-48 gap-y-32' +
          classGrow
        }
      >
        {biographies.map((biography, index) => (
          <Biography {...biography} key={index} />
        ))}
      </div>
    </div>
  );
};

BiographyList.propTypes = {
  /**
   * Title of the component
   */
  title: PropTypes.string,
  /**
   * Indicates if the cards should grow in width to fit the available space
   */
  growToFit: PropTypes.bool,
  /**
   * Array of biography objects
   */
  biographies: PropTypes.array.isRequired,
};

BiographyList.defaultProps = {
  growToFit: true,
};

export default BiographyList;
