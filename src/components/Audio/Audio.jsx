import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const Video = ({ url }) => {
  return (
    <div className="not-prose flex flex-col gap-12 tablet:gap-4">
      <div className="border-2 border-accent-cyan w-fit inline-block">
        <ReactPlayer url={url} />
      </div>
    </div>
  );
};

Video.propTypes = {
  /**
   * video source
   */
  url: PropTypes.string.isRequired,
};
export default Video;
