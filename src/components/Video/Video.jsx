import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { Divider } from '../Divider';
import { DetailsSummary } from '../DetailsSummary';

const Video = ({ url, description, details, summary }) => {
  return (
    <div className="custom-container prose prose-pink flex flex-col gap-12 tablet:gap-4 max-w-min ">
      <div className="border-2 border-accent-cyan w-fit inline-block">
        <ReactPlayer url={url} />
      </div>
      <div className="text-primary-yellow font-normal font-lg flex">
        {description}
      </div>
      <Divider type="dotted" />
      <DetailsSummary details={details} summary={summary} />
      <Divider type="dotted" />
    </div>
  );
};

Video.propTypes = {
  /**
   * video source
   */
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isReqiured,
  details: PropTypes.string.isReqiured,
  summary: PropTypes.string.isReqiured,
};
export default Video;
