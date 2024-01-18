import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const LanguageSwitchHeader = ({ text }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0 }}>{text}</h1>
      <LanguageSwitcher />
    </div>
  );
};

export default LanguageSwitchHeader;