import React from 'react';
import { Button } from '../Button';
import PropTypes from 'prop-types';
const HomeListItem = ({ title, text, label, url }) => {
  return (
    <div>
      <h2 className="text-primary-yellow h2 mb-4">{title}</h2>
      <p className="text-primary-yellow copy mb-9">{text}</p>
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
};
export default HomeListItem;
