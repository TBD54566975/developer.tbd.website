/* eslint-disable react/prop-types */
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import DetailsSummary from './DetailsSummary';

const Video = ({ url, description, transcription }) => {
  return (
    <React.Fragment>
      <div className="not-prose flex flex-col gap-12 tablet:gap-4">
        <div className=" relative aspect-video player-wrapper ">
          <ReactPlayer
            url={url}
            controls={true}
            className="border-2 border-accent-cyan w-full h-full absolute t-0 l-0"
          />
        </div>
        {description ? (
          <div className="mt-6 text-primary-yellow font-normal font-lg w-auto inline-block">
            {description}
          </div>
        ) : null}
      </div>
      {transcription ? (
        <>
          <h2 className="h2 mt-[5.125rem]">TRANSCRIPTION</h2>
          <DetailsSummary
            details={transcription.details}
            summary={transcription.summary}
          />
          <div className="h-[6rem]"></div>
        </>
      ) : null}
    </React.Fragment>
  );
};

Video.propTypes = {
  /**
   * video source
   */
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  transcription: PropTypes.object,
};
export default Video;
