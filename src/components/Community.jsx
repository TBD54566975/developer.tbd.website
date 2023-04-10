import React from 'react';

function CommunityCard({ icon, title, CTA }) {
  return (
    <div className="border border-[#282828] rounded-lg p-8 w-full">
      <div className="flex flex-row justify-around">
        <img className="w-9 h-9 mr-6" src={icon} />
        <div>
          <h4>{title}</h4>
          <p>{CTA}</p>
        </div>
      </div>
    </div>
  );
}

function Community() {
  return (
    <div class="py-12">
      <h3 class="mb-2">Join the community</h3>
      <p class="pb-4">Check out our SDKs and connect with us.</p>
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
    </div>

  );
}

export default Community;
