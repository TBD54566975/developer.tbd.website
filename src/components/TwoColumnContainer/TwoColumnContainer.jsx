import React from 'react';

// eslint-disable-next-line react/prop-types
const TwoColumnContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-1 desktop:grid-cols-2 gap-x-32 gap-y-8">
      {children}
    </div>
  );
};

export default TwoColumnContainer;
