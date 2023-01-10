import React from 'react';
import { HighlightsCard } from '../HighlightsCard';
import PropTypes from 'prop-types';

const HighlightsCardList = ({ title, highlights, growToFit }) => {
  let classGrow =
    'grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]';
  if (!growToFit) {
    classGrow = 'grid grid-cols-1 tablet:grid-cols-[repeat(auto-fit,10rem)]';
  }
  return (
    <div className="not-prose">
      {title ? (
        <h2 className="h2 ml-0 text-primary-yellow mb-12">{title}</h2>
      ) : null}
      <div
        className={
          'tablet:gap-x-[2.25rem] desktop:gap-x-[2.625rem] gap-y-8 tablet:gap-y-12 desktop:gap-y-[4.5rem] ' +
          classGrow
        }
      >
        {highlights.map((project, index) => (
          <React.Fragment key={index}>
            <HighlightsCard {...project} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

HighlightsCardList.propTypes = {
  /**
   * Title of the component
   */
  title: PropTypes.string,
  /**
   * Indicates if the cards should grow in width to fit the available space
   */
  growToFit: PropTypes.bool,
  /**
   * Array of projects
   */
  highlights: PropTypes.array.isRequired,
};

HighlightsCardList.defaultProps = {
  growToFit: true,
};

export default HighlightsCardList;
