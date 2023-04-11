import React from 'react';
import Link from '@docusaurus/Link';
import Button from './Button';

function CommunityCard({ icon, title, CTA, buttonUrl, buttonText }) {
  return (
    <div className="border border-[#282828] rounded-lg p-8 w-full">
      <div className="flex flex-row justify-around">
        <img className="w-9 h-9 mr-6" src={icon} />
        <div>
          <h4>{title}</h4>
          <p>{CTA}</p>
          <div className='padding-top--xl'/>
          <Button label={buttonText} url={buttonUrl} colorDarkMode="cyan" isExternalLink="true"/>
        </div>
      </div>
    </div>
  );
}

function Community() {
  return (
    <div class="py-12">
      <h2 class="mb-2">JOIN THE COMMUNITY</h2>
      <p class="pb-4">Connect with us</p>
      <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3 gap-4">
    
        <CommunityCard
          title="GitHub"
          icon="/img/github-icon.svg"
          CTA="Check out our projects, submit a PR, or open an issue"
          buttonUrl="https://github.com/TBD54566975"
          buttonText="View"
        />
        <CommunityCard
          title="Discord"
          icon="/img/discord-icon.svg"
          CTA="Engage with fellow community members"
          buttonUrl="https://discord.gg/tbd"
          buttonText="Join"
        />
        <CommunityCard
          title="Twitter"
          icon="/img/twitter-icon.svg"
          CTA="Follow us on Twitter for news and updates"
          buttonUrl="https://twitter.com/TBDDev"
          buttonText="Follow"
        />
      </div>
    </div>

  );
}

export default Community;
