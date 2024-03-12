import React from 'react';
import Button from './Button';

function HeroCard({
  heroText,
  bodyText,
  buttonUrl,
  buttonText,
  primary = false,
  themeColor = 'cyan',
  imgSrc,
  imgClass = 'w-32',
}) {
  return (
    <div
      className={`${
        primary ? `primary-theme-card ` : ``
      }theme-card theme-card-${themeColor} relative p-8 rounded-sm shadow-lg tablet:w-full desktop:w-full only:w-full min-h-[240px] flex justify-between`}
    >
      {imgSrc && (
        <img
          className={`px-2 absolute bottom-8 right-4 hidden desktop-xl:block ${imgClass}`}
          src={imgSrc}
        />
      )}

      <div className={`theme-card-content`}>
        {primary ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{heroText}</h2>
            <span>{bodyText}</span>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-4">{heroText}</h3>
            <p>{bodyText}</p>
          </div>
        )}
        <div className="max-w-[240px] hero-button mt-8">
          <Button
            label={buttonText}
            url={buttonUrl}
            colorDarkMode={themeColor}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
