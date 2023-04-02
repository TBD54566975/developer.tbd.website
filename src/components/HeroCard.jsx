import React from 'react';
import Link from '@docusaurus/Link';
import Button from './Button';

function HeroCard({
  heroText,
  buttonUrl,
  buttonText,
  backgroundColor = 'transparent',
  imgSrc,
}) {
  return (
    <div
      style={{ backgroundColor }}
      className={`relative p-8 rounded-xl shadow-lg tablet:w-full desktop:w-full only:w-full border-[#282828] border-2 my-8 min-h-[240px] flex flex-col justify-between`}
    >
      {imgSrc && (
        <img
          className="w-40 px-2 absolute bottom-0 right-0 hidden md:block"
          src={imgSrc}
        />
      )}

      <h2 className="text-2xl font-bold mb-4">{heroText}</h2>
      <div className="max-w-[240px]">
        <Link style={{ backgroundColor }} href={buttonUrl}>
          <Button label={buttonText} url={buttonUrl} />
        </Link>
      </div>
    </div>
  );
}

export default HeroCard;
