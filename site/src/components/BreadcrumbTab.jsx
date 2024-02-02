import React, { useState } from 'react';
import CodeSnippet from '@site/src/components/CodeSnippet';

const BreadcrumbTab = ({ snippetMappings }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(snippetMappings)[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab === activeTab ? null : tab);
  };

  return (
    <div>
      <div className='breadcrumbTabs' style={{ display: 'flex' }}>
        {Object.keys(snippetMappings).map(title => (
          <div
            key={title}
            onClick={() => handleTabClick(title)}
            className={`breadcrumbTab ${activeTab === title ? 'active' : ''}`}
            style={{
              padding: '2px 15px',
              margin: '10px',
              borderRadius: '20px',
              cursor: 'pointer',
              backgroundColor: activeTab === title ? '#ffec19' : '#333333',
              color: activeTab === title ? '#000' : '#fff',
              border: '1px solid #ffec19',
              fontSize: '0.9em'
            }}
          >
            {title}
          </div>
        ))}
      </div>
      <div>
        {activeTab && <CodeSnippet snippet={snippetMappings[activeTab].snippet} language={snippetMappings[activeTab].language} />}
      </div>
    </div>
  );
};

export default BreadcrumbTab;
