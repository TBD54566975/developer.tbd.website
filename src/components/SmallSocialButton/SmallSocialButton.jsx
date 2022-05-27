import React from 'react';
import PropTypes from 'prop-types';
import { Illustration } from '../Illustration';

const SmallSocialButton = ({ src, url, altText, title, isBlackWhite }) => {
  const darkIconColor = isBlackWhite
    ? 'tbd-white-illustration'
    : 'tbd-yellow-illustration';

  const borderColor = isBlackWhite
    ? { light: '', dark: 'border-b-primary-white' }
    : { light: 'border-b-primary-black', dark: 'border-b-primary-yellow' };

  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className={`w-12 h-full flex justify-center items-center ${borderColor.light} dark:${borderColor.dark} border-t-transparent hover:border-y-4`}
    >
      <Illustration
        img={src}
        alt={altText}
        title={title}
        className={'w-6 p-3 aspect-square relative text-primary-black'}
        accentClass={darkIconColor}
      />
    </a>
  );
};

SmallSocialButton.propTypes = {
  /**
   * SVG image loaded with import
   */
  src: PropTypes.string.isRequired,
  /**
   * Url to go to when pressing the button
   */
  url: PropTypes.string.isRequired,
};
SmallSocialButton.defaultProps = {
  isBlackWhite: false,
};
export default SmallSocialButton;
