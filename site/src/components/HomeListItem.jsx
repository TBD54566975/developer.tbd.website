import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const HomeListItem = ({ title, description, label, url, className }) => {
  const Description = description;

  return (
    <div className={'not-prose flex flex-col justify-between  ' + className}>
      <div>
        <h2 className="text-primary-yellow h2-caps mb-4">{title}</h2>
        <div className="mb-9">
          {typeof description === 'function' ? (
            <div className="copy text-primary-yellow">
              <Description />
            </div>
          ) : (
            <p className="copy text-primary-yellow">{description}</p>
          )}
        </div>
      </div>
      <Button label={label} url={url} />
    </div>
  );
};
HomeListItem.propTypes = {
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Button URL
   */
  url: PropTypes.string.isRequired,
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
   * aditional Classes
   */
  className: PropTypes.string,
};
export default HomeListItem;
