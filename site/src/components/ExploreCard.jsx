import React from 'react';

function ExploreCard({ text, icon, url, imgClass }) {
  return (
    <a
      href={url}
      className="explore-card no-underline w-70 h-56 border-[#282828] border-2 rounded-sm flex flex-col justify-between items-center"
      target="_blank"
    >
      {icon && text && (
        <img className={`m-auto h-1/2 p-4 tbd-yellow-illustration ${imgClass}`} alt={text} src={icon} />
      )}
      <div className="flex justify-between px-4 py-6 bg-[#282828] w-full">
        <h3>{text}</h3>
      </div>
    </a>
  );
}

export default ExploreCard;
