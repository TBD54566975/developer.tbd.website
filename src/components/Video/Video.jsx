import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const Video = ({ url }) => {
  return (
    <div>
      <ReactPlayer url={url} />
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
