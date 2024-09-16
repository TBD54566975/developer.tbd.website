import React, { useState, useEffect } from 'react';
import contentData from '@site/src/externalContributors.json';

export default function ContributorShowcase() {
  const [filter, setFilter] = useState('all');
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(contentData);
  }, []);

  const filteredContent = content.filter((item) =>
    filter === 'all' ? true : item.type === filter
  );

  return (
    <div className='pb-20'>
      <p>
        Compelling content is how we introduce and teach developers about the decentralized web (dweb). Whether it's a short video or in-depth blog post breaking down a complex topic, this space is dedicated to your top content on our open source projects, the dweb, and more.</p>
      <p className='pb-20 , pt-10'>Have a contribution you want to share? Submit your contribution   
        <a href="/" target="_blank" rel="noopener noreferrer"> here</a>.
      </p>
      <div style={filterContainerStyle}>
        <button onClick={() => setFilter('all')} style={buttonStyle}>All</button>
        <button onClick={() => setFilter('video')} style={buttonStyle}>Videos</button>
        <button onClick={() => setFilter('blog')} style={buttonStyle}>Blog Posts</button>
        <button onClick={() => setFilter('social')} style={buttonStyle}>Social Media</button>
      </div>

      <div style={scrollableContainerStyle}>
        <div style={containerStyle}>
          {filteredContent.map((item, index) => (
            <div
              key={index}
              style={itemStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '2px 4px 7px #2ce2ea';
                e.currentTarget.style.cursor = 'pointer';  
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '2px 2px 5px rgba(0, 0, 0, 0.5)';
              }}
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.thumbnail}
                  alt={`${item.title} thumbnail`}
                  style={thumbnailStyle}
                />
              </a>
              <h3 style={titleStyle}>{item.title}</h3>
              <p style={contributorStyle}>By: {item.contributor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const filterContainerStyle = {
  marginBottom: '20px',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
};

const buttonStyle = {
  padding: '10px 15px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#ac04fc',
  color: '#fff',
};

const scrollableContainerStyle = {
  maxHeight: '750px', 
  overflowY: 'auto', 
  padding: '0 20px',
  marginBottom: '20px',
};

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  justifyItems: 'center',
};

const itemStyle = {
  textAlign: 'center',
  maxWidth: '320px',
  padding: '10px',
  borderRadius: '8px',
  transition: 'transform 0.2s, box-shadow 0.2s',
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
};

const thumbnailStyle = {
  width: '100%',
  height: 'auto',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
};

const titleStyle = {
  margin: '10px 0 5px',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#21F1FF',
};

const contributorStyle = {
  fontSize: '14px',
  color: '#FFEC18',
};
