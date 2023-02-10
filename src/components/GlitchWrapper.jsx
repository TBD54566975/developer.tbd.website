import React from 'react';
import { useEffect, useState } from 'react';
import Illustration from './Illustration';
import { getGlitchMap } from '../util/glitches';

const randomIntNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// eslint-disable-next-line react/prop-types
const GlitchWrapper = ({ children }) => {
  const [glitchMap, setGlitchMap] = useState([]);

  const assignGlitches = () => {
    const numberGlitches = randomIntNumber(1, 6);
    let allZones = ['a', 'b', 'c', 'd', 'e', 'f'];

    let zones = [];
    for (let i = 0; i < numberGlitches; i++) {
      const indexZone = randomIntNumber(0, allZones.length);
      zones.push(allZones[indexZone]);
      allZones = allZones.filter((zone) => zone !== allZones[indexZone]);
    }
    const glitchMapTemp = getGlitchMap(zones);
    setGlitchMap(glitchMapTemp);
  };

  useEffect(() => {
    assignGlitches();
  }, []);

  return (
    <div className="relative">
      {glitchMap.a ? (
        <Illustration
          img={glitchMap.a.img.src}
          alt={glitchMap.a.img.alt}
          accentClass={glitchMap.a.class}
          className="hidden desktop:block absolute top-[14%] left-[-4rem]"
        />
      ) : null}
      {glitchMap.b ? (
        <Illustration
          img={glitchMap.b.img.src}
          alt={glitchMap.b.img.alt}
          accentClass={glitchMap.b.class}
          className="hidden desktop:block absolute top-[50%] left-[-4.3rem]"
        />
      ) : null}
      {glitchMap.c ? (
        <Illustration
          img={glitchMap.c.img.src}
          alt={glitchMap.c.img.alt}
          accentClass={glitchMap.c.class}
          className="hidden desktop:block absolute top-[90%] left-[-5rem]"
        />
      ) : null}

      {children}
      {glitchMap.d ? (
        <Illustration
          img={glitchMap.d.img.src}
          alt={glitchMap.d.img.alt}
          accentClass={glitchMap.d.class}
          className="hidden tablet:block absolute top-[11%] tablet:right-[-2rem] desktop:right-[-4rem]"
        />
      ) : null}
      {glitchMap.e ? (
        <Illustration
          img={glitchMap.e.img.src}
          alt={glitchMap.e.img.alt}
          accentClass={glitchMap.e.class}
          className="hidden desktop:block absolute top-[30%] tablet:right-[-2rem] desktop:right-[-4rem]"
        />
      ) : null}
      {glitchMap.f ? (
        <Illustration
          img={glitchMap.f.img.src}
          alt={glitchMap.f.img.alt}
          accentClass={glitchMap.f.class}
          className="hidden desktop:block absolute top-[82%] tablet:right-[-2rem] desktop:right-[-5rem]"
        />
      ) : null}
    </div>
  );
};

export default GlitchWrapper;
