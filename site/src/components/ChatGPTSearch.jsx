import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import ReactMarkdown from 'react-markdown';

const ChatSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('Thinking 🚀');
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState("Type your question here (and press ENTER)");

  const placeholders = [
    "how do I add web5 to my nodejs app?",
    "what is a web5 protocol and how do I use them",
    "show me how to build a todo app in web5",
    "How do I use web5 with a CDN?",
    // Add more placeholders here
  ];

  useEffect(() => {
    if(query) {
      fetch(`https://chatgpt.tbddev.org/ask_chat?query=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(data => {
          setData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const placeholderInterval = setInterval(() => {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(placeholderInterval); // Cleanup on unmount
  }, [query]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setData('Asking... 🚀');
      setIsOpen(true);
      setQuery(event.target.value);
    }
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  return (    
    <div>
      Ask Me Anything: <input onKeyPress={handleKeyPress} type="text" placeholder={placeholder} size="55"/>
      <div className={`fixed width right-0 top-0 h-screen bg-white text-black transition-transform duration-200 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50 overflow-y-auto w-full md:w-1/2 lg:w-1/3`}>
        <div className="p-4">
          <h2>...</h2>
          <h2>...</h2>
          <h2>...</h2>
          <div className="flex justify-center mt-4">
            <button onClick={handleClose} className="px-3 py-2 bg-red-500 text-white rounded">Close</button>
          </div>

          <ReactMarkdown>
            {data}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatSearch;
