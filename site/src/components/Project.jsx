import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Project = ({
  icon,
  title,
  description,
  textButton,
  url,
  isExternalLink,
}) => {
  const Description = description;
  return (
    <div className="not-prose flex flex-col tablet:h-full tablet:pt-6 tablet:pl-[1.25rem] tablet:pr-6 last:pb-0 tablet:pb-12 tablet:last:pb-12 tablet:border-primary-yellow tablet:border-2 tablet:rounded justify-between">
      <div className="pb-4 tablet:pb-6">
        <img src={icon} alt="" className="my-0" />
      </div>
      <div className="pb-6 tablet:pb-[0.875rem]">
        <h2 className="text-2xl my-0 text-primary-yellow">{title}</h2>
      </div>
      <div className="pb-9 tablet:pb-[67px] tablet:grow">
        {typeof description === 'function' ? (
          <div className="copy primary-white my-0">
            <Description />
          </div>
        ) : (
          <p className="copy primary-white my-0">{description}</p>
        )}
      </div>
      <div>
        {isExternalLink ? (
          <Button
            label={textButton}
            url={url}
            title={title}
            isExternalLink={true}
            imageURL="/img/external-link-blue-icon.svg"
          />
        ) : (
          <Button label={textButton} url={url} title={title} />
        )}
      </div>
    </div>
  );
};

Project.propTypes = {
  /**
   * Button contents
   */
  textButton: PropTypes.string.isRequired,
  /**
   * Icon shown on top
   */
  icon: PropTypes.string.isRequired,
  /**
   * Title of the component
   */
  title: PropTypes.string.isRequired,
  /**
   * Text of the component
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  /**
   * Url for the button to go to
   */
  url: PropTypes.string.isRequired,

  /**
   * Url for the button to go to
   */
  isExternalLink: PropTypes.bool,
};
Project.defaultProps = {
  isExternalLink: false,
};

export default Project;
