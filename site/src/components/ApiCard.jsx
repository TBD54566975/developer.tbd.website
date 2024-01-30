/* eslint-disable react/prop-types */
import React from 'react';
import Link from '@docusaurus/Link';

function ApiCard({ name, description, links }) {
  const renderLinkImages = (links) => {
    return links.map(link => {
      const key = Object.keys(link)[0];
      const url = link[key];
      let imgSrc;
      let shouldOpenInNewTab = url.includes('http') ? '_blank' : '_self';

      switch (key) {
        case 'js':
          imgSrc = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
          break;
        case 'kt':
          imgSrc = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg";
          break;
        case 'swift':
          imgSrc = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg";
          break;
        case 'dart':
          imgSrc = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg";
          break;
        case 'go':
          imgSrc = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg";
          break;
        default:
          imgSrc = ''; 
      }

      return (
        <a href={url} target={shouldOpenInNewTab} rel="noopener noreferrer">
          <img src={imgSrc} alt={key} />
        </a>
      );
    });
  };

  return (
    <div className="api-card flex flex-col bg-transparent border-2 shadow overflow-hidden sm:rounded-sm px-4 py-5 sm:px-6">
      <div className="flex-col flex">
        <h2>{name}</h2>
        {description && <p class="copy">{description}</p>}
      </div>
      <div className="api-card-icon flex-row">
        {renderLinkImages(links)}
      </div>
    </div>
  );
}


export default ApiCard;
