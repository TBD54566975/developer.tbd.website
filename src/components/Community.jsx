import React from 'react';

function CommunityCard({ icon, title, CTA }) {
  return (
    <div className="border border-[#282828] rounded-lg p-8 w-full">
      <div className="flex flex-row items-center justify-around w-60">
        <img className="w-9 h-9" src={icon} />
        <div>
          <div>{title}</div>
          <p>{CTA}</p>
        </div>
      </div>
    </div>
  );
}

function Community() {
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-4">
      <CommunityCard
        title="GitHub"
        icon="/img/github-icon.svg"
        CTA="Checkout our SDKs, submit a PR, or submit an issue"
      />
      <CommunityCard
        title="Twitter"
        icon="/img/twitter-icon.svg"
        CTA="Follow us on Twitter for news and updates"
      />
    </div>
  );
}

export default Community;
