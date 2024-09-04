import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Pillar = ({ img, title, description, alt }) => {
  const Description = description;
  return (
    <div className="not-prose tablet:pl-[2.8125rem] tablet:pr-[2.25rem] tablet:py-[2.25rem] tablet:border-primary-yellow tablet:border-2 tablet:rounded-lg flex gap-[2.25rem] flex-col tablet:flex-row tablet:gap-0  ">
      <div className="flex flex-col tablet:flex-row">
        <div className="mr-[2.8125rem] min-w-[7.875rem] desktop:min-w-[13.125rem] mb-9 tablet:mb-0">
          <img
            src={img}
            className="w-[7.875rem] h-[7.125rem] desktop:w-[13.125rem] desktop:h-[11.875rem] "
            alt={alt}
          />
        </div>
        <div className="tablet:block hidden desktop:mr-[2.125rem] tablet:mr-[1.3125rem]">
          <div className="bg-vertical-divider bg-repeat-y w-0.5 h-full"></div>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-[1.5rem] text-primary-yellow">{title}</h2>
          </div>
          {typeof description === 'function' ? (
            <div className="copy primary-white">
              <Description />
            </div>
          ) : (
            <p className="copy primary-white">{description}</p>
          )}
        </div>
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
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,

  /**
   * Alt text for image
   */
  alt: PropTypes.string,
};
export default Pillar;
