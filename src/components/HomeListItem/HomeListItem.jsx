import React from 'react';
import { Button } from '../Button';
import PropTypes from 'prop-types';
const HomeListItem = ({ title, text, label, url, className }) => {
  return (
    <div className={'flex flex-col justify-between  ' + className}>
      <div>
        <h2 className="text-primary-yellow h2 mb-4">{title}</h2>
        <p className="text-primary-yellow copy mb-9">{text}</p>
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
  text: PropTypes.string.isRequired,

  /**
   * aditional Classes
   */
  className: PropTypes.string,
};
export default HomeListItem;
