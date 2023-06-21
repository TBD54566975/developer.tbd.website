import React from 'react'
import Button from './Button'

function CommunityCard({ icon, title, CTA, buttonUrl, buttonText }) {
    return (
      <div className="border border-[#282828] rounded-sm p-8 w-full">
        <div className="flex flex-row justify-around">
          <img className="w-9 h-9 mr-6" src={icon} />
          <div>
            <h3 className="text-[#22f1ff]">{title}</h3>
            <p>{CTA}</p>
            <div className='padding-top--lg' />
            <Button label={buttonText} url={buttonUrl} colorDarkMode="cyan" isExternalLink="true" className="community-button "/>
          </div>
        </div>
      </div>
    );
  }

  export default CommunityCard;