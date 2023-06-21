/* eslint-disable react/prop-types */
import React from 'react';
import Video from './Video';
const HighlightsEmbed = ({ title, url }) => {
  return (
    <div>
      <Video url={url} />
      <div className="mt-8 mb-4">
        <h3 className="h3 font-medium text-primary-yellow">{title}</h3>
      </div>
    </div>
  );
};

export default HighlightsEmbed;
