import React from 'react';
import PropTypes from 'prop-types';

const Biography = ({
  imageUrl,
  headline,
  description,
  growToFit,
  twitterLink,
}) => {
  return (
    <div className={'not-prose ' + growToFit ? 'max-w-[16rem]' : null}>
      <div className="border-accent-cyan border-2 border-solid mb-6 w-fit min-w-full">
        <img
          src={imageUrl}
          alt=""
          className="min-w-full max-w-full min-h-full max-h-full"
        />
      </div>
      <div className="mb-4">
        {twitterLink ? (
          <a href={twitterLink} className="pointer" target="_blank">
            <h2 className="h2-caps underline text-accent-cyan hover:no-underline">
              {headline}
            </h2>
          </a>
        ) : (
          <h2 className="h2-caps">{headline}</h2>
        )}
      </div>
      <div>
        <h3 className="h3 text-primary-yellow">{description}</h3>
      </div>
    </div>
  );
};

Biography.PropTypes = {
  imageUrl: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  twitterLink: PropTypes.string,
};

export default Biography;
