import React from 'react';
import Pillar from './Pillar';
import PropTypes from 'prop-types';
import Divider from './Divider';
const PillarList = ({ title, pillars }) => {
  return (
    <div className="not-prose">
      <h1 className="h1 text-primary-yellow mb-12">{title}</h1>
      <div className="flex flex-col gap-12 tablet:gap-4">
        {pillars.map((pillar, index) => (
          <div key={index}>
            <Pillar {...pillar} />
            {index == pillars.length - 1 ? null : (
              <div className="block tablet:hidden mt-12 tablet:mt-[3.5rem]">
                <Divider type="dotted" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

PillarList.propTypes = {
  /**
   * Title of the component
   */
  title: PropTypes.string.isRequired,
  /**
   * x
   */
  pillars: PropTypes.array.isRequired,
};

export default PillarList;
