import React from 'react';

const SdkCard = ({ title, description, links }) => {
  return (
    <div className="col-span-1">
      <h3>{title}</h3>
      <span>{description}</span>
      <div className="api-card flex flex-col bg-transparent border-2 shadow overflow-hidden sm:rounded-sm px-4 py-5 sm:px-6 border-primary-yellow">
        <div className="api-card-icon flex-row space-x-4">
          {links.map(({ href, imgSrc, alt, text }) => (
            <div className="flex flex-col items-center" key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <img src={imgSrc} alt={alt} />
              </a>
              <span className="mt-2 text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SdkCard;
