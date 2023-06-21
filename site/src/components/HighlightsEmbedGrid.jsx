/* eslint-disable react/prop-types */
import React from 'react';
import HighlightsEmbed from './HighlightsEmbed';

const HighlightsEmbedGrid = ({ title, highlights, growToFit }) => {
  let classGrow =
    'grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]';
  if (!growToFit) {
    classGrow = 'grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,21rem)]';
  }
  return (
    <div>
      {title ? (
        <h2 className="h2 ml-0 text-primary-yellow mt-0 mb-12">{title}</h2>
      ) : null}
      <div
        className={
          'tablet:gap-x-[2.25rem] desktop:gap-x-[2.625rem] gap-y-8 tablet:gap-y-12 desktop:gap-y-[4.5rem] ' +
          classGrow
        }
      >
        {highlights.map((project, index) => (
          <React.Fragment key={index}>
            <HighlightsEmbed {...project} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HighlightsEmbedGrid;
