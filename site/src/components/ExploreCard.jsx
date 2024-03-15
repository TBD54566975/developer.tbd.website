import React, { useState } from 'react';

function ExploreCard({ text, icon, url, imgClass }) {
  // Create a state variable to control the box shadow
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      className={`explore-card no-underline w-70 h-56 border-[#282828] border-2 rounded-sm flex flex-col justify-between items-center transition-transform transform ${isHovered ? 'hover:-translate-y-1' : ''}`}
      style={{ boxShadow: isHovered ? '0 4px 8px rgba(33, 241, 255, 0.7)' : 'none' }}
      target="_blank"
      onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
      onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
    >
      {icon && text && (
        <img className={`m-auto h-1/2 p-4 bounce ${imgClass}`} alt={text} src={icon} />
      )}
      <div className="flex justify-between px-4 py-6 bg-[#282828] w-full">
        <h3>{text}</h3>
      </div>
    </a>
  );
}

export default ExploreCard;
