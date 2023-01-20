/* eslint-disable react/prop-types */
import React from 'react';
import Link from '@docusaurus/Link';

function ApiCard({ url, name }) {
  let shouldOpenInNewTab = url.includes('http') ? '_blank' : '_self';
  return (
    <Link
      href={url}
      className="bg-transparent border-gray-400 border-2 shadow overflow-hidden sm:rounded-lg"
    >
      <div>
        <div target={shouldOpenInNewTab} className="px-4 py-5 sm:px-6">
          {name}
        </div>
      </div>
    </Link>
  );
}

export default ApiCard;
