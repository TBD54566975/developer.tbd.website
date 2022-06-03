import React from 'react';

const SwitchIllustration = ({ imgMobile, imgTablet, imgDesktop }) => {
  return (
    <div>
      <div className="tablet:hidden block">
        <img
          src={imgMobile}
          alt="Web2 and Web3 to Web5"
          className="min-w-full"
        />
      </div>
      <div className="hidden tablet:block desktop:hidden">
        <img
          src={imgTablet}
          alt="Web2 and Web3 to Web5"
          className="min-w-full"
        />
      </div>
      <div className="hidden desktop:block">
        <img
          src={imgDesktop}
          alt="Web2 and Web3 to Web5"
          className="min-w-full"
        />
      </div>
    </div>
  );
};

export default SwitchIllustration;
