const glitchImages = [
  {
    src: '/img/rectangle.svg',
    alt: 'A pixelated upright rectangle',
  },
  {
    src: '/img/small-glitch-cluster.svg',
    alt: 'a glitch cluster',
  },
  {
    src: '/img/zcluster.svg',
    alt: 'a glitch cluster in a z shape',
  },
  {
    src: '/img/small-glitch-cluster-vert.svg',
    alt: 'a glitch cluster',
  },
  {
    src: '/img/checkered-glitch.svg',
    alt: 'checkered glitch cluster',
  },
  {
    src: '/img/bar-code.svg',
    alt: 'barcode glitch',
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
