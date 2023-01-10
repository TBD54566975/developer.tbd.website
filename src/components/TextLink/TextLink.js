/* eslint-disable react/prop-types */
import React from 'react';
const TextLink = ({
  href,
  text,

  isExternalLink,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      target={isExternalLink ? '_blank' : ''}
      href={href}
      rel={isExternalLink ? 'noopener noreferrer' : ''}
      className="text-accent-cyan underline underline-offset-2 hover:no-underline"
      {...props}
    >
      {text}
    </a>
  );
};

export default TextLink;
