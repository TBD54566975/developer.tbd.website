import React from 'react';
import Link from '@docusaurus/Link';
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
      className={`${primary ? `primary-theme-card `: ``}theme-card theme-card-${themeColor} relative p-8 rounded-xl shadow-lg tablet:w-full desktop:w-full only:w-full min-h-[240px] flex justify-between`}
    >
        {imgSrc && (
            <img
            className={`px-2 absolute bottom-8 right-4 hidden md:block ${imgClass}`}
            src={imgSrc}
            />
        )}

      <div className={`theme-card-content`}>
        {primary ? 
            <h2 className="text-2xl font-bold mb-4">{heroText}</h2> 
            :
            <h3 className="text-2xl font-bold mb-4">{heroText}</h3>
        }
        <p className="mb-8">{bodyText}</p>
        <div className="max-w-[240px] hero-button">
            <Button label={buttonText} url={buttonUrl} colorDarkMode={themeColor}/>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
