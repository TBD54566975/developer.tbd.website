const glitchImages = [
  {
    src: '/images/rectangle.svg',
    alt: 'A pixelated upright rectangle',
  },
  {
    src: '/images/small-glitch-cluster.svg',
    alt: 'a glitch cluster',
  },
  {
    src: '/images/zcluster.svg',
    alt: 'a glitch cluster in a z shape',
  },
  {
    src: '/images/small-glitch-cluster-vert.svg',
    alt: 'a glitch cluster',
  },
];

export const getGlitchMap = (glitchZones) => {
  const glitchInvertClasses = [
    'tbd-cyan-illustration',
    'tbd-purple-illustration',
  ];

  let glitchMap = {};
  const glitchArt = [...glitchImages];

  glitchZones.forEach((glitchZone) => {
    const imgIndex = Math.floor(Math.random() * glitchArt.length);
    glitchMap[glitchZone] = {
      img: glitchArt[imgIndex],
      class:
        glitchInvertClasses[
          Math.floor(Math.random() * glitchInvertClasses.length)
        ],
    };
    glitchArt.splice(imgIndex, 1);
  });

  return glitchMap;
};
