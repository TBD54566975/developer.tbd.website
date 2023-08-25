import React, { useState, useEffect } from 'react';

function DiscordMessagesView({ channelID, channelName }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(
        `/.netlify/functions/discord-messages?channelID=${channelID}`,
      );

      if (!response.ok) {
        console.error(
          `There was an issue fetching messages: ${response.statusText}`,
        );
        return;
      }

      const data = await response.json();
      setMessages(data);
    }

    fetchMessages();
  }, [channelID]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div
      style={{
        width: '100%',
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
            style={{ width: '30px', marginRight: '10px' }}
          />
          <h2
            style={{
              margin: 0,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '1.5em',
              font: 'Uni Sans Heavy',
            }}
          >
            Discord
          </h2>
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
              }}
            >
              <img
                src={
                  message.author.avatar
                    ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`
                    : '/img/discord-avatar.png'
                }
                alt={message.author.username}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '10px',
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
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
