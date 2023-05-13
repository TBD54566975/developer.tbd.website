import React from 'react';
import HeroCard from '../../components/HeroCard';
import Button from '../../components/Button';
import Divider from '../../components/Divider';

function Web5CTA() {
    return(
            <div>
                <h1>Web5 is open to build</h1>
                <h3 className="mb-8">
                    Add decentralized identity and storage to your applications.
                </h3>

                <div class="theme-card theme-card-cyan relative p-8 rounded-xl shadow-lg tablet:w-full desktop:w-full only:w-full my-8 min-h-[240px] flex flex-col justify-between">
                    <a href="/docs">
                        <img class="px-2 absolute bottom-0 right-0 hidden md:block padding-bottom--md w-[45%]" src="/img/docs-web5-code-connect-animated.png"/>
                    </a>
                    <h2 class="text-2xl font-bold mb-4">Get Started with Web5.js</h2>
                    <p>Interactive guides, tutorials, and API docs</p>
                    <br/>
                    <Button label="Web5 JS SDK" url="/docs" />
                </div>

                <Divider type="slash" />
            </div>
    );
}
  
export default Web5CTA;
  