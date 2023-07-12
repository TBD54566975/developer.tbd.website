import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const ChatSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5003/ask_chat?query=how%20do%20I%20add%20web5%20to%20my%20nodejs%20project?')
      .then(response => response.text())
      .then(data => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button onClick={handleClick}>Toggle Slide Over</button>
      <div className={`fixed width right-0 top-0 h-screen bg-white text-black transition-transform duration-200 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50 overflow-y-auto w-full md:w-1/2 lg:w-1/3`}>
        <div className="p-4">
          <h2>Slide Over Content</h2>          
          <code style={{
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word'      
          }}>       
            {data}
          </code>
          
        </div>
      </div>
    </div>
  );
};

export default ChatSearch;
