import React from 'react';
import HeroCard from '@site/src/components/HeroCard';
import Community from '../../components/Community';
import DiscordMessagesView from './discord-messages-view.js';
import Layout from '@theme/Layout';
import contributorsData from '@site/src/contributors.json';
import Head from '@docusaurus/Head';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Gallery from '@site/src/components/Gallery';

function CommunityIndex() {
  const imageGalleryData = [
    {
      path: '/img/innovator-projects/netonomy.png',
      url: 'https://twitter.com/netonomyinc/status/1694366100664819936',
    },
    {
      path: '/img/innovator-projects/time-blind.png',
      url: 'https://dev.to/github/building-an-ai-powered-decentralized-app-for-time-management-88l',
    },
    {
      path: '/img/innovator-projects/home-node.png',
      url: 'https://developer.tbd.website/blog/homenode-manager',
    },
    {
      path: '/img/innovator-projects/qnav-links.png',
      url: 'https://github.com/flothjl/QNav#qnav-links',
    },
  ];

  const contributionMapping = {
    example: 'projects',
    question: 'engagement',
  };

  return (
    <Layout>
      <Head title="Community | TBD">
        <meta property="og:title" />
      </Head>
      <h1>Welcome to your TBD community!</h1>

      {/* contributor spotlight section */}
      <div className="pb-11">
        <h2 className="pt-6">TBD Spotlight</h2>
        <p className="pb-8">
          Shoutout to our superstar contributors! 🌟 Whether you're coding,
          brainstorming, or cheering us on, every contribution adds magic to our
          community. Ready to contribute? We're looking forward to seeing your
          name light up this space soon! 🚀
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            maxHeight: '450px',
            overflowY: 'auto',
            padding: '10px 0',
            width: '100%',
            marginBottom: '40px',
          }}
        >
          {contributorsData.map((contributor, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 8px rgba(33, 241, 255, 0.2)',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#1C1C1C',
                width: '200px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 8px 16px rgba(33, 241, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 4px 8px rgba(33, 241, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                style={{
                  width: '80px',
                  borderRadius: '50%',
                }}
              />
              <span style={{ color: '#21F1FF' }}>{contributor.login}</span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '5px',
                }}
              >
                {contributor.contributions.map((contribution, cIndex) => (
                  <span
                    key={cIndex}
                    style={{
                      padding: '2px 5px',
                      borderRadius: '4px',
                      backgroundColor: '#FFEC18',
                      fontSize: '0.8em',
                      color: 'black',
                    }}
                  >
                    {contributionMapping[contribution] || contribution}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4 pt-7 pb-20">
          <HeroCard
            heroText="Contributor Guide"
            buttonUrl="../open-source/contributing"
            buttonText="Learn More"
            bodyText="Looking for ways to contribute to the community?"
            themeColor="purple"
            primary
          />
          <HeroCard
            heroText="Incubation Projects"
            buttonUrl="../open-source/incubation"
            buttonText="Discover More"
            bodyText="TBD Incubation projects are managed by community contributors."
            themeColor="cyan"
            primary
          />
        </div>

        {/* Featured Communtiy Projects */}
        <div className="pb-20">
          <h2>TBD Innovators: Monthly Showcase</h2>
          <p className="pb-12">
            Click on each image to learn more about individual projects. Have a
            cool project that incorporates TBD's technologies? We'd love to hear
            about it! Share your work with us in Discord in our{' '}
            <a
              href="https://discord.com/channels/937858703112155166/1098207585661878402"
              target="_blank"
              rel="noopener noreferrer"
            >
              #share-what-you-do channel!
            </a>{' '}
          </p>
          <Gallery images={imageGalleryData} />
        </div>

        {/* discord messages component */}
        <div
          style={{
            backgroundColor: '#1C1C1C',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '70px',
          }}
        >
         
          <h2> 👀 Sneak peek into the community 👀</h2>

          <div className="flex flex-col md:flex-row justify-between items-center md:space-x-5 space-y-5 md:space-y-0">
            <DiscordMessagesView
              channelID="984873257666768936"
              channelName="Announcements"
              discordChannelUrl="https://discord.com/channels/937858703112155166/984873257666768936"
              style={{ width: '100%' }}
            />
            <DiscordMessagesView
              channelID="1101192919706255430"
              channelName="Events"
              discordChannelUrl="https://discord.com/channels/937858703112155166/1101192919706255430"
              style={{ width: '100%' }}
            />
          </div> 
          
        </div>
       

        <Community />
      </div>
    </Layout>
  );
}

export default CommunityIndex;
