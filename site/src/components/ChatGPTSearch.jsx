import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import "../css/search.css";

const ChatSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState('.. and press ENTER to ask a question on web5, how to write code and more.');
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState("Type your question here.");
  let eventSource = null;

  const placeholders = [
    "how do I add web5 to my nodejs app?",
    "what is a web5 protocol and how do I use them",
    "show me how to build a todo app in web5",
    "How do I use web5 with a CDN?",
    // Add more placeholders here
  ];

  // Effect for setting isOpen on URL hash
  useEffect(() => {
    function checkHash() {
      setIsOpen(window.location.hash === '#ask');
    }

    // Check the hash on component mount
    checkHash();

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);

    // Cleanup: remove the event listener on unmount
    return () => {
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);


  const handleClose = () => {
    setIsOpen(false);
    window.location.hash = ""; // remove #search from the URL when manually closing the panel
  }

  useEffect(() => {

    if(query) {
      // Initialize EventSource with your server endpoint
      eventSource = new EventSource(`https://chatgpt.tbddev.org/ask_chat?query=${encodeURIComponent(query)}`);
      //eventSource = new EventSource(`http://localhost:5003/ask_chat?query=${encodeURIComponent(query)}`);

      // The message event is fired when a message comes from the server
      eventSource.onmessage = (event) => {
        // Append new data to the existing data
        // replace event.data instances of |CR| with \n
        let d = event.data.replaceAll("|CR|", "\n");
        setData((prevData) => prevData == "Asking... 🚀"? d : prevData + d);

      };

      // The error event is fired when there is an error with the connection
      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close();
      };

      // Cleanup on unmount: close the connection
      return () => eventSource && eventSource.close();
    }


    const placeholderInterval = setInterval(() => {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(placeholderInterval); // Cleanup on unmount
  }, [query]);

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      setData('Asking... 🚀');
      setIsOpen(true);
      setQuery(event.target.value);
    } else {
        event.target.rows = 1;
        event.target.rows = ((event.target.scrollHeight - event.target.clientHeight) / 24) + 1;
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
  }


  function CodeBlock(props) {
    return (
      <pre style={{backgroundColor: "#f0f0f0", padding: "1em", border: "1px solid #ccc", color: '#333'}}>
        <code style={{fontWeight: "bold"}}>
          {props.value}
        </code>
      </pre>
    );
  }

  return (
    <div>
      <div className={`fixed width right-0 top-0 h-screen bg-primary-yellow text-primary-black transition-transform duration-200 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-[9999999] overflow-y-auto w-full md:w-1/2 lg:w-1/3`}>
        <div className="p-4">
          <div className="flex justify-end my-4">
            <button onClick={handleClose} className="w-[fit-content] px-[1.375rem] mb-2 mr-2 button-text border-solid pt-[12px] pb-[14px] border-2 hover:translate-x-[4px] hover:translate-y-[4px] bg-primary-yellow dark:bg-transparent text-primary-black shadow-button-sh border-primary-black hover:shadow-button-sh-hv  dark:shadow-button-sh-cyan dark:border-accent-cyan dark:hover:shadow-button-sh-hv-cyan dark:text-accent-cyan">Close</button>
          </div>

          <label htmlFor="chatgpt-search" className='text-2xl font-bold'>Ask Me Anything: </label>
          <textarea id="chatgpt-search" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} placeholder={placeholder} className="w-full px-4 py-2 my-4 rounded bg-white" rows={1}/>
          <ReactMarkdown
                className="search-widget"
                children={padNewlines(data)}
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


function padNewlines(data) {
  let inCodeBlock = false;
  let processedData = '';
  const lines = data.split('\n');

  for(let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for code block start or end
      if(line.trim().startsWith('```')) {
          inCodeBlock = !inCodeBlock;
      }

      // If not in a code block and the next line is not empty or a code block start, add an extra newline
      if (!inCodeBlock && i < lines.length - 1 && !lines[i + 1].trim().startsWith('```')) {
          if (lines[i + 1].trim() !== '') {
              // Case for single newline
              processedData += line + '\n\n';
          } else if (i < lines.length - 2 && lines[i + 2].trim() !== '' && !lines[i + 2].trim().startsWith('```')) {
              // Case for double newline
              processedData += line + '\n\n\n\n';
              i++; // skip the next newline
          } else {
              processedData += line + '\n';
          }
      } else {
          processedData += line + '\n';
      }
  }

  return processedData;
}



export default ChatSearch;
