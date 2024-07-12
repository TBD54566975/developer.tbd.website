import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const Button = ({
  label,
  url,
  className,
  isExternalLink,
  colorDarkMode,
  imageURL,
  title,
  onClick, 
}) => {
  const [classesDarkMode, setClassesDarkMode] = useState('');
  useEffect(() => {
    if (colorDarkMode === 'cyan') {
      setClassesDarkMode(
        'dark:shadow-button-sh-cyan dark:border-accent-cyan dark:hover:shadow-button-sh-hv-cyan dark:text-accent-cyan',
      );
    }
    if (colorDarkMode === 'yellow') {
      setClassesDarkMode(
        'dark:shadow-button-sh-yellow dark:border-primary-yellow dark:hover:shadow-button-sh-hv-yellow dark:text-primary-yellow',
      );
    }
    if (colorDarkMode === 'purple') {
      setClassesDarkMode(
        'dark:shadow-button-sh-purple dark:border-accent-purple dark:hover:shadow-button-sh-hv-purple dark:text-accent-purple',
      );
    }
  }, [colorDarkMode]);

  let cssClasses = `w-[fit-content] px-[1.375rem] mb-2 mr-2 button-text border-solid pt-[12px] pb-[14px] border-2 hover:translate-x-[4px] hover:translate-y-[4px] ${
    className ? className : ''
  }`;

  cssClasses +=
    'bg-primary-yellow dark:bg-transparent text-primary-black shadow-button-sh border-primary-black hover:shadow-button-sh-hv  ' +
    classesDarkMode;

  const linkContent = imageURL ? (
    <div className={cssClasses}>
      <div className="flex gap-3">
        <img src={imageURL} alt={title} className="w-6 h-6" />
        <span className="relative top-[1px]">{label}</span>
      </div>
    </div>
  ) : (
    <div className={cssClasses}>{label}</div>
  );

  const link = isExternalLink ? (
    <a
      className="dark w-[fit-content] no-underline text-[18px] font-medium"
      rel="noopener noreferrer"
      target="_blank"
      href={url}
      title={title}
      onClick={onClick} 
    >
      {linkContent}
    </a>
  ) : (
    <a
      className="dark w-[fit-content] no-underline text-[18px] font-medium"
      target="_self"
      href={url}
      title={title}
      onClick={onClick} 
    >
      {linkContent}
    </a>
  );

  return link;
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  imageURL: PropTypes.string,
  isExternalLink: PropTypes.bool,
  colorDarkMode: PropTypes.string,
  onClick: PropTypes.func, 
};

Button.defaultProps = {
  isExternalLink: false,
  colorDarkMode: 'cyan',
};

export default Button;
