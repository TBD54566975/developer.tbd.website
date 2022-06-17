import React from 'react';

const Container = ({ className, children }) => {
  return (
    <div
      className={`not-prose px-5 desktop:px-20 tablet:px-8.5 ${
        className ?? ''
      }`}
    >
      <div className="mx-auto max-w-container">{children}</div>
    </div>
  );
};

export default Container;
