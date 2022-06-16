import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Divider } from '../Divider';

const Video = ({ url, description }) => {
  return (
    <div className="custom-container prose prose-pink flex flex-col gap-12 tablet:gap-4 w-fit ">
      <div className="border-2 border-accent-cyan w-fit inline-block">
        <ReactPlayer url={url} />
      </div>
      <div className="text-primary-yellow font-normal font-lg flex">
        {description}
      </div>
      <Divider type="dotted" className="pb-6" />
    </div>
  );
};

Video.propTypes = {
  /**
   * video source
   */
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isReqiured,
  details: PropTypes.string,
  summary: PropTypes.string,
};
export default Video;
