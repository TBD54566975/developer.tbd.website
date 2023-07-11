import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const SlideOver = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5003/.well-known/ai-plugin.json')
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
      <div className={`fixed right-0 top-0 h-screen bg-white text-black transition-transform duration-200 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50 overflow-y-auto`}>
        <div className="p-4">
          <h2>Slide Over Content</h2>
          <pre>
            <code>
              {data}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SlideOver;
