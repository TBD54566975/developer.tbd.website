import React from 'react';

function KnowledgeCheck({ url }) {
  return (
    <iframe
      style={{
        width: '100%',
        height: '500px',
        outline: '1px solid #252525',
        border: 0,
        borderRadius: 8,
        marginBottom: 16,
        zIndex: 100,
      }}
      src={url}
    ></iframe>
  );
}

export default KnowledgeCheck;
