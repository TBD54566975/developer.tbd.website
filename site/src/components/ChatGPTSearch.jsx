import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const ChatSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('Loading ....');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if(query) {
      fetch(`http://localhost:5003/ask_chat?query=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(data => {
          setData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [query]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setData('Loading ....');
      setIsOpen(true);
      setQuery(event.target.value);
    }
  }


  return (
    <div>
      <input onKeyPress={handleKeyPress} type="text" placeholder="Type your query and press enter"/>
      <div className={`fixed width right-0 top-0 h-screen bg-white text-black transition-transform duration-200 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50 overflow-y-auto w-full md:w-1/2 lg:w-1/3`}>
        <div className="p-4">
          <h2>...</h2>
          <h2>...</h2>
          <h2>...</h2>
          <h2>...</h2>
          <h2>...</h2>          
          <h2>...</h2>          
          <h2>...</h2>          
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
