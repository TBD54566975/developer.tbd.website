import React, { useState, useEffect } from 'react';
import contentData from '@site/src/externalContributors.json';

export default function ContributorShowcase() {
  const [filters, setFilters] = useState({
    video: false,
    blog: false,
    social: false,
  });
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(contentData);
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const filteredContent = content.filter((item) => {
    if (!filters.video && !filters.blog && !filters.social) return true; 
    return filters[item.type];
  });

  return (
    <div className='pb-20'>
      <p>Compelling content is how we introduce and teach developers about the decentralized web (dweb). Whether it's a short video or in-depth blog post breaking down a complex topic, this space is dedicated to your top content on our open source projects, the dweb, and more.</p>
      <p className='pb-20 , pt-10'>Have a contribution you want to share? Head over to GitHub and check out <a href="https://github.com/TBD54566975/developer.tbd.website/issues/1749" target="_blank" rel="noopener noreferrer">this issue</a> to learn how!</p>
      
      <div style={filterContainerStyle}>
        <label style={labelStyle}>
          <input
            type="checkbox"
            name="video"
            checked={filters.video}
            onChange={handleCheckboxChange}
          />
          <span style={checkboxLabelText}>🎥 Videos</span>
        </label>
        <label style={labelStyle}>
          <input
            type="checkbox"
            name="blog"
            checked={filters.blog}
            onChange={handleCheckboxChange}
          />
          <span style={checkboxLabelText}>📝 Blog Posts</span>
        </label>
        <label style={labelStyle}>
          <input
            type="checkbox"
            name="social"
            checked={filters.social}
            onChange={handleCheckboxChange}
          />
          <span style={checkboxLabelText}>📲 Social Media</span>
        </label>
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
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <img
                  src={item.thumbnail}
                  alt={`${item.title} thumbnail`}
                  style={thumbnailStyle}
                />  
                <h3 style={titleStyle}>{item.title}</h3>
                <p style={contributorStyle}>By: {item.contributor}</p>
              </a>
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
  gap: '20px',
  justifyContent: 'center',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
};

const checkboxLabelText = {
  marginLeft: '8px', 
};

const scrollableContainerStyle = {
  maxHeight: '850px',
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
