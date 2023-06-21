import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import RandomAccentColor from '../utils/random-accent-color';
const Illustration = ({
  img,
  className,
  alt,
  accentClass,
  imgStyle,
  ...imageProps
}) => {
  return (
    <div
      className={`not-prose tbd-illustration ${className ?? ''} ${
        accentClass ?? ''
      }`}
    >
      <img {...imageProps} src={img} className={imgStyle ?? null} alt={alt} />
    </div>
  );
};

Illustration.propTypes = {
  /**
   * Illustration contents
   */
  img: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Illustration.defaultProps = {
  img: '/img/dinosaur-illustration.svg',
  alt: '',
  imgStyle: null,
};

export default Illustration;
