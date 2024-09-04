import React from 'react';
import Divider from './Divider';

const Actors = ({ content }) => {
  return (
    <div className="not-prose">
      <h1 className="h1 text-primary-yellow mb-0 desktop:mb-[0.625rem] ml-0">
        {content.title}
      </h1>
      <div
        className={`hd:min-h-[990px] flex flex-col desktop:flex-row desktop:min-h-[54vw] ${
          content.isWeb5
            ? 'gap-0 tablet:gap-y-12 gap-y-9'
            : 'desktop:gap-16 tablet:gap-[3rem] gap-[2.25rem]'
        }`}
      >
        <div className="mt-[2.125rem] tablet:mt-[3.4375rem]">
          <div className="mb-[2.25rem] desktop:mb-0">
            <div className="flex gap-6 mb-1">
              {!content.isWeb5 ? (
                <img src="/img/actors-index-1.svg" alt="1" />
              ) : null}
              <h2 className="h2-caps text-primary-yellow flex items-center">
                {content.actors[0].title}
              </h2>
            </div>
            <p
              className={`copy primary-white flex ${
                !content.isWeb5 ? 'ml-[4.375rem]' : ''
              } desktop:ml-0`}
            >
              {content.actors[0].description}
            </p>
          </div>
          <div className="mt-[3rem] mb-[2.25rem] desktop:block hidden">
            <Divider type="dotted" />
          </div>
          <div className="mb-[2.25rem] desktop:mb-0">
            <div className="flex gap-6 mb-1">
              {!content.isWeb5 ? (
                <img src="/img/actors-index-2.svg" alt="2" />
              ) : null}
              <h2 className="h2-caps text-primary-yellow flex items-center">
                {content.actors[1].title}
              </h2>
            </div>
            <p
              className={`copy primary-white flex ${
                !content.isWeb5 ? 'ml-[4.375rem]' : ''
              } desktop:ml-0`}
            >
              {content.actors[1].description}
            </p>
          </div>
          <div className="mt-[3rem] mb-[2.25rem] desktop:block hidden">
            <Divider type="dotted" />
          </div>
          <div>
            <div className="flex gap-6 mb-1">
              {!content.isWeb5 ? (
                <img src="/img/actors-index-3.svg" alt="3" />
              ) : null}
              <h2 className="h2-caps text-primary-yellow flex items-center">
                {content.actors[2].title}
              </h2>
            </div>
            <p
              className={`copy primary-white flex ${
                !content.isWeb5 ? 'ml-[4.375rem]' : ''
              } desktop:ml-0`}
            >
              {content.actors[2].description}
            </p>
          </div>
        </div>
        {content.isWeb5 ? (
          <>
            <img
              src={content.imgDesktop}
              alt=""
              className="w-full h-fit desktop:w-[48vw] desktop:block hidden relative left-[8rem] mt-[-1rem] top-16"
            />
            <div className="desktop:hidden block -ml-5 -mr-5 h-[63vw]">
              <div className=" w-[55vw] h-full relative left-[-5vw]">
                <img
                  src="/img/actors-web5-mobile-1.svg"
                  alt=""
                  className="h-[63vw]"
                />
              </div>
              <div className=" desktop:hidden block h-full w-[55vw] -top-full relative left-[50vw]">
                <img
                  src="/img/actors-web5-mobile-2.svg"
                  alt=""
                  className="h-[63vw]"
                />
              </div>
            </div>
            {/* <img
              src={content.imgMobile}
              alt=""
              className="w-full desktop:w-[48vw] desktop:hidden block"
            /> */}
          </>
        ) : (
          <img
            src={content.imgDesktop}
            alt=""
            className="w-full desktop:w-[48vw]"
          />
        )}
      </div>
    </div>
  );
};

export default Actors;
