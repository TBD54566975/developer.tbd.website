import React from 'react';
import PropTypes from 'prop-types';

const Pillar = ({ img, title, description }) => {
  return (
    <div className="flex gap-[2.25rem] flex-col tablet:flex-row tablet:gap-[3.5rem] desktop:gap-[4.8125rem] ">
      <img
        src={img}
        className="w-[7.875rem] h-[7.125rem] desktop:w-[13.125rem] desktop:h-[11.875rem]"
      />
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
