/* eslint-disable react/prop-types */
import React from 'react';
import Link from '@docusaurus/Link';

function ApiCard({ url, name, description }) {
  let shouldOpenInNewTab = url.includes('http') ? '_blank' : '_self';
  return (
    <div className="flex flex-col bg-transparent border-gray-400 border-2 shadow overflow-hidden sm:rounded-lg px-4 py-5 sm:px-6">
      <Link href={url} className="no-underline">
        <div className="flex-col flex">
          <div target={shouldOpenInNewTab}>
            <h2>{name}</h2>
          </div>
        </div>
      </Link>
      {description && <p className="text-primary-white">{description}</p>}
    </div>
  );
}

export default ApiCard;
