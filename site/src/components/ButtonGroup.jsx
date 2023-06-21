import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonGroup = ({ buttons, className, invertDarkMode }) => {
  return (
    <div className={`not-prose flex gap-4 flex-wrap ${className ?? ''}`}>
      {buttons.map((button) => (
        <div key={button.data.label} className="w-fit">
          <Button
            {...button.data}
            invertDarkMode={invertDarkMode ? invertDarkMode : false}
          />
        </div>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  /**
   * Text content
   */
  buttons: PropTypes.array.isRequired,
  className: PropTypes.string,
  invertDarkMode: PropTypes.bool,
};

export default ButtonGroup;
