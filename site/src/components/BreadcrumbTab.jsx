import React, { useState } from 'react';
import CodeSnippet from '@site/src/components/CodeSnippet';

const BreadcrumbTab = ({ snippetMappings }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(snippetMappings)[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab === activeTab ? null : tab);
  };

  const getLanguage = (tabName) => {
    var language = tabName.substring(activeTab.lastIndexOf('.') + 1);

    // This is meant to compensate for the fact that gradle is not a
    // supported language. This is a corner case that needs fixing.
    if (language === "gradle") { language = "js"; }
    return language;
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
        {activeTab && <CodeSnippet snippet={snippetMappings[activeTab]} language={getLanguage(activeTab)} />}
      </div>
    </div>
  );
};

export default BreadcrumbTab;
