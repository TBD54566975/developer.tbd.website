const RandomAccentColor = (exclude) => {
  let colors = [
    'tbd-yellow-illustration',
    'tbd-purple-illustration',
    'tbd-cyan-illustration',
  ];
  if (exclude !== null && exclude !== undefined) {
    colors = colors.filter((color) => color !== exclude);
  }

  return colors[getRandomInt(0, colors.length)];
};

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default RandomAccentColor;
