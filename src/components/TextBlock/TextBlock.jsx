import React from 'react';
import PropTypes from 'prop-types';

function computeClasses(invertDarkMode, className) {
  let cssClasses = 'mb-4 text-copy last:mb-0 ';

  cssClasses += invertDarkMode
    ? 'text-primary-yellow dark:text-primary-black'
    : 'text-primary-black dark:text-primary-yellow';

  if (className) {
    cssClasses += ' ' + className;
  }

  return cssClasses;
}

const TextBlock = ({
  textH1,
  textH2,
  text,
  invertDarkMode,
  className,
  forceSingleCol,
}) => {
  const cssClasses = computeClasses(invertDarkMode, className);

  let array = text.toString().split('\n');

  return (
    <div
      className={`columns-1 ${
        !forceSingleCol ? 'tablet:columns-2' : ''
      } gap-x-[2rem] gap-y-[1rem]`}
    >
      {textH1 ? <h1 className="h1 text-primary-yellow">{textH1}</h1> : null}
      {textH2 ? <h2 className="h2 text-primary-yellow">{textH2}</h2> : null}
      {array.map((paragraph, index) => (
        <p className={cssClasses} key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

TextBlock.propTypes = {
  text: PropTypes.string.isRequired,
  textH1: PropTypes.string,
  textH2: PropTypes.string,
  className: PropTypes.string,
  invertDarkMode: PropTypes.bool,
  forceSingleCol: PropTypes.bool,
};

export default TextBlock;
