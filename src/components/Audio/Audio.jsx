import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const Audio = ({ url }) => {
  return (
    <div className="not-prose flex flex-col gap-12 tablet:gap-4">
      <div>
        <ReactPlayer
          url={url}
          height="166px"
          className="border-2 border-accent-cyan rounded-md w-full t-0 l-0"
          config={{
            soundcloud: {
              options: {
                auto_play: false,
                buying: false,
                sharing: false,
                download: false,
                show_artwork: true,
                show_playcount: false,
                show_user: false,
                single_active: true,
                visual: false,
                color: "#ffec19"
              },
            },
          }}
        />
      </div>
    </div>
  );
};

Audio.propTypes = {
  /**
   * video source
   */
  url: PropTypes.string.isRequired,
};
export default Audio;
