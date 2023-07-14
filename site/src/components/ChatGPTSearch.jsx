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

  function CodeBlock(props) {
    return (
      <pre style={{backgroundColor: "#f0f0f0", padding: "1em", border: "1px solid #ccc"}}>
        <code style={{fontWeight: "bold"}}>
          {props.value}
        </code>
      </pre>
    );
  }

  return (    
    <div>
      <label htmlFor="chatgpt-search">Ask Me Anything: </label><input id="chatgpt-search" onKeyPress={handleKeyPress} type="text" placeholder={placeholder} size="55"/>
      <div className={`fixed width right-0 top-0 h-screen bg-primary-yellow text-primary-black transition-transform duration-200 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-[999] overflow-y-auto w-full md:w-1/2 lg:w-1/3`}>
        <div className="p-4">
          <div className="flex justify-end my-4">
            <button onClick={handleClose} className="w-[fit-content] px-[1.375rem] mb-2 mr-2 button-text border-solid pt-[12px] pb-[14px] border-2 hover:translate-x-[4px] hover:translate-y-[4px] bg-primary-yellow dark:bg-transparent text-primary-black shadow-button-sh border-primary-black hover:shadow-button-sh-hv  dark:shadow-button-sh-cyan dark:border-accent-cyan dark:hover:shadow-button-sh-hv-cyan dark:text-accent-cyan">Close</button>
          </div>

          <ReactMarkdown 
            children={data}
            components={{
              code({node, inline, className, children, ...props}) {
                if (inline) {
                  return <code className={className} {...props}>{children}</code>
                }
                return <CodeBlock {...props} value={children[0]} />
              }
  }}
/>
        </div>
      </div>
    </div>
  );
};

export default ChatSearch;
