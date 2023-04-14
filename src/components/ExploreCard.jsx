import React from 'react';

function ExploreCard({ text, icon, url, imgClass }) {
  return (
    <a
      href={url}
      className="no-underline w-70 h-56 border-[#282828] border-2 rounded-lg flex flex-col justify-between items-center"
      target="_blank"
    >
      {icon && text && (
        <img className={`h-1/2 p-4 tbd-yellow-illustration ${imgClass}`} alt={text} src={icon} />
      )}
      <div className="flex justify-between p-8 bg-[#282828] w-full">
        <div>{text}</div>
      </div>
    </a>
  );
}

export default ExploreCard;
