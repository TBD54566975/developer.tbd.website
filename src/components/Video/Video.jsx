import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Divider } from '../Divider';
import { DetailsSummary } from '../DetailsSummary';

const Video = ({ url, description, details, summary }) => {
  return (
    <div className="not-prose flex flex-col gap-12 tablet:gap-4">
      <div className="border-2 border-accent-cyan w-fit inline-block">
        <ReactPlayer url={url} />
      </div>
      <div className="mt-18 text-primary-yellow font-normal font-lg w-auto inline-block">
        {description}
      </div>
      {details && summary && (
        <div className="mt-18">
          <h2 className="h2-caps">Transcription</h2>
          <DetailsSummary details={details} summary={summary} />
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
  description: PropTypes.string.isReqiured,
  details: PropTypes.string,
  summary: PropTypes.string,
};
export default Video;
