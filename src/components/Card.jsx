/* eslint-disable react/prop-types */
import React from 'react';

function Card({ children }) {
  return (
    <div className="flex flex-col bg-transparent border-gray-400 border-2 shadow overflow-hidden sm:rounded-lg px-4 py-5 sm:px-6">
      {children}
    </div>
  );
}

export default Card;
