import React from 'react';
import Link from '@docusaurus/Link';
import Button from './Button';

function HeroCard({
  heroText,
  buttonUrl,
  buttonText,
  backgroundColor = 'transparent',
}) {
  return (
    <div
      style={{ backgroundColor }}
      className={`flex-grow p-8 rounded-xl shadow-lg sm:w-full md:w-full lg:w-2/4 only:w-full border-[#282828] border-2 my-8 min-h-[240px] flex flex-col justify-between`}
    >
      <h2 className="text-2xl font-bold mb-4">{heroText}</h2>
      <div className="max-w-[240px]">
        <Link href={buttonUrl}>
          <Button label={buttonText} url={buttonUrl} />
        </Link>
      </div>
    </div>
  );
}

export default HeroCard;
