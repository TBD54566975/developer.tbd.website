import React from 'react';
import PropTypes from 'prop-types';

const Pillar = ({ img, title, description }) => {
  return (
    <div className="tablet:pl-[4.4375rem] tablet:pr-[5.875rem] tablet:py-[2.25rem] tablet:border-primary-yellow tablet:border-2 tablet:rounded-lg flex gap-[2.25rem] flex-col tablet:flex-row tablet:gap-0  ">
      <img
        src={img}
        className="w-[7.875rem] h-[7.125rem] desktop:w-[13.125rem] desktop:h-[11.875rem] mr-[4.3125rem]"
      />
      <div className="tablet:block hidden mr-[2.125rem]">
        <div className="bg-vertical-divider bg-repeat-y w-0.5 h-full"></div>
      </div>

      <div>
        <h2 className="h2 text-primary-yellow mb-4">{title}</h2>
        <p className="copy text-primary-yellow">{description}</p>
      </div>
    </div>
  );
};

Pillar.propTypes = {
  /**
   * Image source
   */
  img: PropTypes.string.isRequired,
  /**
   * Title of the component
   */
  title: PropTypes.string.isRequired,
  /**
   * Text of the component
   */
  description: PropTypes.string.isRequired,
};
export default Pillar;
