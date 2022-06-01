import React from 'react';
import PropTypes from 'prop-types';
export default function Divider({ type }) {
  let classes;

  if (type === 'slash') {
    classes = 'bg-slash-dark border-none h-2';
  } else if (type === 'legal') {
    classes = 'bg-dotted-legal border-none h-[2px]';
  } else if (type === 'dotted-small') {
    classes = 'bg-dotted-small-dark border-none h-[2px]';
  } else {
    classes = 'bg-dotted-dark border-none h-[2px]';
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-container">
        <hr className={classes} />
      </div>
    </div>
  );
}
Divider.propTypes = {
  /**
   * divider type: dotted, slash, legal
   */
  type: PropTypes.string.isRequired,
};
