import React from 'react';
import LearnCard from './LearnCard';

export default {
  title: 'LearnCard',
  component: LearnCard,
};

const TemplateDark = (args) => (
  <div className="max-w-[46rem]">
    <LearnCard {...args} />
  </div>
);

export const Dark = TemplateDark.bind({});
Dark.args = {
  title: 'Decentralized Identity',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit vesti bulum at facilisis quam, et congue tellus. Aliquam in arcu id tortor malesuada viverra quis in urna nulla tincidunt aliquam nulla nec vehicula lorem ipsum dolor sit amet, consectetur adipis cing elit.',
  datePosted: 'Wed Apr 27 2022',
  image: '/img/placeholder-media-image.png',
  url: 'https://www.youtube.com/watch?v=NpuPm1FsUQk',
  type: 'video',
  time: '9:22',
  author: 'Angie Jones',
};
