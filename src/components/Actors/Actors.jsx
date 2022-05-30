import React from 'react';
import { Divider } from '../Divider';

const Actors = () => {
  return (
    <div>
      <h1 className="h1 text-primary-yellow mb-0 desktop:mb-[0.625rem] ml-0">
        Actors
      </h1>
      <div className="flex gap-[2.25rem] tablet:gap-[3rem] desktop:gap-[4rem] flex-col desktop:flex-row">
        <div className="mt-[2.125rem] tablet:mt-[3.4375rem]">
          <div className="mb-[2.25rem] desktop:mb-0">
            <div className="flex gap-6 mb-1">
              <img src="/img/actors-index-1.svg" alt="1" />
              <h2 className="h2 text-primary-yellow flex items-center">
                Wallets
              </h2>
            </div>
            <p className="copy text-primary-yellow flex ml-[4.375rem] desktop:ml-0">
              Wallets act as agents for individuals or institutions by
              facilitating exchanges with PFIs
            </p>
          </div>
          <div className="mt-[3rem] mb-[2.25rem] desktop:block hidden">
            <Divider type="dotted" />
          </div>
          <div className="mb-[2.25rem] desktop:mb-0">
            <div className="flex gap-6 mb-1">
              <img src="/img/actors-index-2.svg" alt="2" />
              <h2 className="h2 text-primary-yellow flex items-center">PFIS</h2>
            </div>
            <p className="copy text-primary-yellow flex ml-[4.375rem] desktop:ml-0">
              Participating financial institutions that offer liquidity services
              on the tbDEX network
            </p>
          </div>
          <div className="mt-[3rem] mb-[2.25rem] desktop:block hidden">
            <Divider type="dotted" />
          </div>
          <div>
            <div className="flex gap-6 mb-1">
              <img src="/img/actors-index-3.svg" alt="3" />
              <h2 className="h2 text-primary-yellow flex items-center">
                CREDENTIAL ISSUER
              </h2>
            </div>
            <p className="copy text-primary-yellow flex ml-[4.375rem] desktop:ml-0">
              Organizations or individuals (by means of their wallet) who serve
              as a source of verifiable credentials
            </p>
          </div>
        </div>
        <img src="/img/maze.svg" />
      </div>
    </div>
  );
};

export default Actors;
