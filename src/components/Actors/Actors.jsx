import React from 'react';
import { Divider } from '../Divider';

const Actors = ({ content }) => {
  return (
    <div>
      <h1 className="h1 text-primary-yellow mb-0 desktop:mb-[0.625rem] ml-0">
        {content.title}
      </h1>
      <div className="flex gap-[2.25rem] tablet:gap-[3rem] desktop:gap-[4rem] flex-col desktop:flex-row">
        <div className="mt-[2.125rem] tablet:mt-[3.4375rem]">
          <div className="mb-[2.25rem] desktop:mb-0">
            <div className="flex gap-6 mb-1">
              <img src="/img/actors-index-1.svg" alt="1" />
              <h2 className="h2-caps text-primary-yellow flex items-center">
                {content.actors[0].title}
              </h2>
            </div>
            <p className="copy text-primary-yellow flex ml-[4.375rem] desktop:ml-0">
              {content.actors[0].description}
            </p>
          </div>
          <div className="mt-[3rem] mb-[2.25rem] desktop:block hidden">
            <Divider type="dotted" />
          </div>
          <div className="mb-[2.25rem] desktop:mb-0">
            <div className="flex gap-6 mb-1">
              <img src="/img/actors-index-2.svg" alt="2" />
              <h2 className="h2-caps text-primary-yellow flex items-center">
                {content.actors[1].title}
              </h2>
            </div>
            <p className="copy text-primary-yellow flex ml-[4.375rem] desktop:ml-0">
              {content.actors[1].description}
            </p>
          </div>
          <div className="mt-[3rem] mb-[2.25rem] desktop:block hidden">
            <Divider type="dotted" />
          </div>
          <div>
            <div className="flex gap-6 mb-1">
              <img src="/img/actors-index-3.svg" alt="3" />
              <h2 className="h2-caps text-primary-yellow flex items-center">
                {content.actors[2].title}
              </h2>
            </div>
            <p className="copy text-primary-yellow flex ml-[4.375rem] desktop:ml-0">
              {content.actors[2].description}
            </p>
          </div>
        </div>

        <img src="/img/maze.svg" alt="" className="w-full desktop:w-[48vw]" />
      </div>
    </div>
  );
};

export default Actors;
