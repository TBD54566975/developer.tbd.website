import React from 'react';
import { Button } from '../Button';
import PropTypes from 'prop-types';
import { TextWithTooltip } from '../TextWithTooltip';

const HomeListItem = ({ title, text, label, url, className }) => {
  return (
    <div className={'not-prose flex flex-col justify-between  ' + className}>
      <div>
        <h2 className="text-primary-yellow h2-caps mb-4">{title}</h2>
        <p className="text-primary-yellow copy mb-9">
          <TextWithTooltip content={text} />
        </p>
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
