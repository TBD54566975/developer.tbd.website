import React from 'react';

const SwitchIllustration = ({ imgMobile, imgTablet, imgDesktop, altText }) => {
  return (
    <div className="not-prose">
      <div className="tablet:hidden block">
        <img src={imgMobile} alt={altText} className="min-w-full" />
      </div>
      <div className="hidden tablet:block desktop:hidden">
        <img src={imgTablet} alt={altText} className="min-w-full" />
      </div>
      <div className="hidden desktop:block">
        <img src={imgDesktop} alt={altText} className="min-w-full" />
      </div>
    </div>
  );
};

export default SwitchIllustration;
