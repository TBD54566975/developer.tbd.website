import React, { useState } from 'react';
import HeroCard from '@site/src/components/HeroCard';
import Community from '../../components/Community';
import Layout from '@theme/Layout';
import contributorsData from '@site/src/contributors.json';
import Head from '@docusaurus/Head';
import Gallery from '@site/src/components/Gallery';
import CalendarComponent from '@site/src/components/Calendar';

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

  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  return (
    <Layout>
      {/* banner if you ever want to display anything on the top of the page pls use this*/}
      {/* <div
        style={{
          borderColor: '#4b3852',
          borderWidth: '1px',
          borderStyle: 'solid',
          padding: '10px 0',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '1.2rem',
        }}
      >
        We're participating in Hacktoberfest, a month-long celebration of open
        source! 🎉{' '}
        <Link to="https://github.com/TBD54566975/developer.tbd.website#tbd-developer-site">
          Find out more here
        </Link>
        .
      </div> */}

      <Head title="Community | TBD">
        <meta property="og:title" />
      </Head>

      <h1>Welcome to your TBD community!</h1>

      {/* contributor spotlight section */}
      <div className="pb-11 pt-6">
        <h2 className="pt-6">TBD Monthly Spotlight ✨</h2>
        <p className="pb-20">
          Shoutout to our superstar contributors! Whether you're coding,
          brainstorming, or cheering us on, every contribution adds magic to our
          community. Ready to contribute? We're looking forward to seeing your
          name light up this space soon! 🚀 Want a closer look at an
          individual's contributions? Simply click on a card to uncover more
          about their achievement for the month.
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            maxHeight: 'auto',
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
                perspective: '1000px',
                width: '200px',
                position: 'relative',
                marginBottom: '20px',
                cursor: 'pointer',
              }}
              onClick={() =>
                setFlippedCardIndex(flippedCardIndex === index ? null : index)
              }
            >
              <div
                style={{
                  transform:
                    flippedCardIndex === index ? 'rotateY(180deg)' : 'none',
                  transition: 'all 0.3s ease',
                  transformStyle: 'preserve-3d',
                  width: '100%',
                  height: '200px',
                }}
              >
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '200px',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 8px rgba(33, 241, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#1C1C1C',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    style={{ width: '80px', borderRadius: '50%' }}
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
                      <div
                        key={cIndex}
                        style={{
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          overflow: 'hidden',
                          padding: '2px 5px',
                          borderRadius: '4px',
                          backgroundColor: '#FFEC18',
                          fontSize: '.9em',
                          color: 'black',
                        }}
                      >
                        {contribution}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Back of the card */}
                <div
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '200px',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 8px rgba(33, 241, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#1C1C1C',
                    width: '100%',
                    textAlign: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      maxHeight: '200px',
                      overflowY: 'auto',
                    }}
                  >
                    <p>{contributor.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4 pt-7 pb-20">
          <HeroCard
            heroText="Contributor Guide"
            buttonUrl="/open-source/contributing"
            buttonText="Learn More"
            bodyText="Looking for ways to contribute to the community?"
            themeColor="purple"
            primary
          />
          <HeroCard
            heroText="Incubation Projects"
            buttonUrl="/open-source/incubation"
            buttonText="Discover More"
            bodyText="TBD Incubation projects are managed by community contributors."
            themeColor="cyan"
            primary
          />
        </div>
        <h2 className="pt-10">Upcoming Events 🥳 </h2>
        <p className="pb-10">
          Filter through our exciting events: 👀 Show & Tells for project
          highlights, 🏢 Office Hours for open discussions, 💡 Workshops for
          skill-building, 🎮 Twitch Streams for everything fun. Miss an event?
          checkout our{' '}
          <a
            href="https://www.youtube.com/playlist?list=PLji3z0eqSkXEws2wrNjyVyW3xQTW_dNlq"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube channel
          </a>{' '}
          to catch up. Whether you're with us live or watching later, we're
          thrilled to have you!
        </p>
        {/* community calendar view  */}
        <CalendarComponent />
        {/* Featured Communtiy Projects */}
        <div className="pb-20 mb-10">
          <h2 className="pt-10">TBD Innovators: Monthly Showcase</h2>
          <p className="pb-20">
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
        <Community />
      </div>
    </Layout>
  );
}

export default CommunityIndex;
