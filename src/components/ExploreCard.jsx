import React from 'react';

function ExploreCard({ text, icon, iconAltText, url }) {
  return (
    <a
      href={url}
      className="w-70 h-56 border-[#282828] border-2 rounded-lg flex flex-col justify-between items-center"
    >
      {icon && iconAltText && (
        <img className="w-1/2 h-1/2 p-4" alt={iconAltText} src={icon} />
      )}
      <div className="flex justify-between p-8 bg-[#282828] w-full">
        <div>{text}</div>
        <div>
          <span>&rarr;</span>
        </div>
      </div>
    </a>
  );
}

export default ExploreCard;
