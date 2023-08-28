import React, { useState, useEffect } from 'react';
import HeroCard from '@site/src/components/HeroCard';
import Community from '../../components/Community';
import DiscordMessagesView from './discord-messages-view.js';
import Layout from '@theme/Layout';
import contributorsData from '@site/src/contributors.json';
import Head from '@docusaurus/Head';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function CommunityIndex() {
  const [isMobile, setIsMobile] = useState(
    ExecutionEnvironment.canUseDOM ? window.innerWidth <= 768 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      if (ExecutionEnvironment.canUseDOM) {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    if (ExecutionEnvironment.canUseDOM) {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

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
                    {contribution}
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

        {/* discord messages component */}
        <div
          style={{
            backgroundColor: '#1C1C1C',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '70px',
          }}
        >
          <h2> 👀 Sneakpeak into the community 👀</h2>

          <div
            style={{
              display: isMobile ? 'block' : 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <DiscordMessagesView
              channelID="1068273971432280196"
              channelName="DWN"
              style={{
                flex: 1,
                marginRight: isMobile ? '0px' : '5px',
                marginBottom: isMobile ? '10px' : '0px',
                width: isMobile ? '100%' : 'auto',
              }}
            />
            <DiscordMessagesView
              channelID="969272658501976117"
              channelName="WEB5"
              style={{
                flex: 1,
                marginLeft: isMobile ? '0px' : '5px',
                width: isMobile ? '100%' : 'auto',
              }}
            />
          </div>
        </div>

        <Community />
      </div>
    </Layout>
  );
}

export default CommunityIndex;
