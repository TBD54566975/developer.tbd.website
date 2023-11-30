import React from 'react';
import Link from '@docusaurus/Link';
import Button from './Button';

function CommunityCard({ icon, title, CTA, buttonUrl, buttonText }) {
  return (
    <div className="border border-[#282828] rounded-sm p-8 w-full">
      <div className="flex flex-row justify-around">
        <img className="w-9 h-9 mr-6" src={icon} />
        <div>
          <h3 className="text-[#22f1ff]">{title}</h3>
          <p>{CTA}</p>
          <div className="padding-top--lg" />
          <Button
            label={buttonText}
            url={buttonUrl}
            colorDarkMode="cyan"
            isExternalLink={true}
            className="community-button "
          />
        </div>
      </div>
    </div>
  );
}

function Community() {
  return (
    <div>
      <h2 className="mb-4">Join the Community</h2>
      <p className="mb-8">Connect with us everywhere.</p>

      <div className="community-card grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3 gap-4">
        <CommunityCard
          title="GitHub"
          icon="/img/github-icon.svg"
          CTA="Submit a PR or open an issue"
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
          title="Twitter/X"
          icon="/img/twitter-icon.svg"
          CTA="Follow us for news and updates"
          buttonUrl="https://twitter.com/TBDevs"
          buttonText="Follow"
        />
      </div>
    </div>
  );
}

export default Community;
