/* eslint-disable react/prop-types */
import React from 'react';

function Card({ children, className }) {
  return (
    <div
      className={`${className} flex flex-col bg-transparent border-[#282828] border-2 shadow overflow-hidden sm:rounded-lg lg:p-10 sm:p-5`}
    >
      {children}
    </div>
  );
}

export default Card;
