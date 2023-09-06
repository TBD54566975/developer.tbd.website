import React, { useState, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

function DiscordMessagesView({
  channelID,
  channelName,
  discordChannelUrl,
  style,
}) {
  const [messages, setMessages] = useState([]);
  const [screenWidth, setScreenWidth] = useState(
    ExecutionEnvironment.canUseDOM ? window.innerWidth : 1000,
  );

  const mockMessages = [
    {
      id: 'mock1',
      type: 0,
      content: 'This is a mock message.',
      author: {
        avatar: null,
        username: 'MockUser',
      },
      timestamp: new Date().getTime(),
    },
    {
      id: 'mock2',
      type: 0,
      content: 'This is a mock message.',
      author: {
        avatar: null,
        username: 'MockUser',
      },
      timestamp: new Date().getTime(),
    },
  ];

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(
        `/.netlify/functions/discord-messages?channelID=${channelID}`,
      );
      if (!response.ok) {
        console.error(
          `There was an issue fetching messages: ${response.statusText}`,
        );
        setMessages(mockMessages);
        return;
      }
      const data = await response.json();
      setMessages(data);
    }

    const handleResize = () => {
      if (ExecutionEnvironment.canUseDOM) {
        setScreenWidth(window.innerWidth);
      }
    };

    if (ExecutionEnvironment.canUseDOM) {
      window.addEventListener('resize', handleResize);
      fetchMessages();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [channelID]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const isSmallScreen = screenWidth < 480;
  const avatarSize = isSmallScreen ? '30px' : '50px';

  return (
    <div
      style={{
        ...style,
        backgroundColor: '#36393F',
        borderRadius: '8px',
        overflow: 'hidden',
        margin: '5px',
      }}
    >
      <div
        style={{
          backgroundColor: '#5864F2',
          padding: '14px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/img/discord-icon.svg"
            alt="Discord Logo"
            style={{
              width: isSmallScreen ? '15px' : '30px',
              marginRight: '10px',
            }}
          />
          <a
            href={discordChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <h2
              style={{
                margin: 0,
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1.5em',
              }}
            >
              Discord
            </h2>
          </a>
        </div>
        <span
          style={{ color: '#FFFFFF', fontSize: '0.9em', fontWeight: 'bold' }}
        >
          #{channelName}
        </span>
      </div>

      <div
        style={{
          maxHeight: '400px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          padding: '10px',
        }}
      >
        {messages
          .filter((message) => message.type === 0 && message.content)
          .map((message) => (
            <div
              key={message.id}
              style={{
                backgroundColor: '#202225',
                padding: '10px',
                margin: '5px 0',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
              }}
            >
              <img
                src={
                  message.author.avatar
                    ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                    : '/img/discord-icon.svg'
                }
                alt={message.author.username}
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: isSmallScreen ? '0' : '10px',
                  marginBottom: isSmallScreen ? '10px' : '0',
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: isSmallScreen ? '5px' : '0',
                  }}
                >
                  <strong style={{ color: '#FFFFFF' }}>
                    {message.author.username}
                  </strong>
                  <span style={{ color: '#8A8E94', fontSize: '0.9em' }}>
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                <p style={{ color: '#8A8E94', margin: '5px 0' }}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DiscordMessagesView;
