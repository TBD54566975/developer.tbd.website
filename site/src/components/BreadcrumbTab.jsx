import React, { useState } from 'react';
import CodeSnippet from '@site/src/components/CodeSnippet';

const BreadcrumbTab = ({ snippetMappings, dependencies }) => {
  const [activeTab, setActiveTab] = useState(snippetMappings ? Object.keys(snippetMappings)[0] : dependencies[0].props.language);

  const handleTabClick = (tab) => {
    setActiveTab(tab === activeTab ? null : tab);
  };

  return (
    <div>
      <div className='breadcrumbTabs' style={{ display: 'flex' }}>
        {(snippetMappings ? Object.keys(snippetMappings) : dependencies.map(dep => dep.props.language)).map(title => (
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
              fontSize: '0.9em',
              textTransform: 'capitalize'
            }}
          >
            {title}
          </div>
        ))}
      </div>
      <div>
        {activeTab && dependencies && dependencies.map(dep => {
          return (
            <div key={dep.props.language} style={{ display: activeTab === dep.props.language ? 'block' : 'none' }}>
              {dep}
            </div>
          )
        })}
        {activeTab && snippetMappings && (
          <CodeSnippet
            snippet={snippetMappings[activeTab].snippet}
            snippetName={snippetMappings[activeTab].snippetName}
            language={snippetMappings[activeTab].language}
          />
        )}
      </div>
    </div>
  );
};

export default BreadcrumbTab;
