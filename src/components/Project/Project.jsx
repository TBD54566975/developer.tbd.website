import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';

const Project = ({ icon, title, description, textButton, url }) => {
  return (
    <div className="tablet:max-w-[21.75rem] tablet:pt-6 tablet:pl-[1.25rem] tablet:pr-6 pb-12 tablet:border-primary-yellow tablet:border-2 tablet:rounded">
      <div className="pb-6">
        <img src={icon} alt="" />
      </div>
      <div className="pb-[0.875rem]">
        <h2 className="h2-caps text-primary-yellow">{title}</h2>
      </div>
      <div className="pb-9 tablet:pb-[4.1875rem]">
        <p className="copy text-primary-yellow">{description}</p>
      </div>
      <div>
        <Button label={textButton} url={url} />
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
  description: PropTypes.string.isRequired,
  /**
   * Url for the button to go to
   */
  url: PropTypes.string.isRequired,
};
export default Project;
