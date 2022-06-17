import React from 'react';
const TextLink = ({
  clickHandler,
  href,
  text,
  className,
  isExternalLink,
  isFirstItem,
  isInverse,
  ...props
}) => {
  let colors = 'text-primary-black dark:text-primary-yellow';
  if (isInverse) {
    colors = 'text-primary-yellow dark:text-primary-black';
  }
  return (
    <a
      target={isExternalLink ? '_blank' : ''}
      href={href}
      rel={isExternalLink ? 'noopener noreferrer' : ''}
      onClick={clickHandler}
      id={isFirstItem ? 'first-link' : ''}
      className={`${className ?? ''} nav-links ${colors}`}
    >
      {text}
    </a>
  );
};

export default TextLink;
