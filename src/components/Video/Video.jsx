import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const Video = ({ url, description }) => {
  return (
    <div className="not-prose flex flex-col gap-12 tablet:gap-4">
      <div className=" relative aspect-video player-wrapper ">
        <ReactPlayer
          url={url}
          controls={true}
          className="border-2 border-accent-cyan w-full h-full absolute t-0 l-0"
        />
      </div>

      {description && (
        <div className="mt-6 text-primary-yellow font-normal font-lg w-auto inline-block">
          {description}
        </div>
      )}
    </div>
  );
};

Video.propTypes = {
  /**
   * video source
   */
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  details: PropTypes.string,
  summary: PropTypes.string,
};
export default Video;
