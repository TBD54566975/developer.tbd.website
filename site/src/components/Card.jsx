/* eslint-disable react/prop-types */
import React from 'react';

function Card({ children, className }) {
  return (
    <div
      className={`flex flex-col bg-transparent border-[#282828] border-2 shadow overflow-hidden sm:rounded-lg p-8 lg:p-10 sm:p-5 ${className}`}
    >
   
      {children}
    </div>
  );
}

export default Card;
