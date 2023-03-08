import React from 'react';
import Biography from './Biography';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
const BiographyList = ({ title, biographies, growToFit }) => {
  const [classGrowToFit, setClassGrowToFit] = useState('');

  useEffect(() => {
    if (growToFit) {
      setClassGrowToFit(
        'grid grid-cols-2 tablet:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))]',
      );
    } else {
      setClassGrowToFit('grid grid-cols-1 tablet:grid-cols-2');
    }
  }, [growToFit]);

  return (
    <div className="not-prose gap-y-48">
      <h2 className="h2-caps ml-0 text-primary-yellow mb-6 tablet:mb-9  empty:hidden">
        {title}
      </h2>
      <div className={' gap-x-[8rem] gap-y-16  pt-4 ' + classGrowToFit}>
        {biographies.map((biography, index) => (
          <Biography {...biography} key={index} growToFit={growToFit} />
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
