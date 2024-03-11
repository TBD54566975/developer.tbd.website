import React, { useState } from 'react';
import Button from '../../components/Button';
import Divider from '../../components/Divider';

function Web5CTA() {

  return (
    <div>
      <h1>Web5 is open to build.</h1>
      <p className="mb-8 copy text-primary-yellow">
        The Web5 tech preview is now ready for developers to start building
        decentralized applications that return ownership and control over
        identity and data to individuals. 
      </p>
      

      <div className="theme-card theme-card-cyan relative p-8 rounded-xl shadow-lg tablet:w-full desktop:w-full only:w-full my-8 min-h-[240px] flex flex-col justify-between">
        <a href="/docs">
          <img
            className="px-2 absolute bottom-0 right-0 hidden md:block padding-bottom--md w-[45%]"
            src="/img/docs-web5-code-connect-animated.png"
          />
        </a>
        <h2 className="text-2xl font-bold mb-4">Get Started with Web5.js</h2>
        <p>Interactive guides, tutorials, and API docs</p>
        <br />
        <Button label="Web5 JS SDK" url="/docs" />
      </div>

      

      <Divider type="slash" />
    </div>
  );
}

export default Web5CTA;

