import React from 'react';
import HighlightsCard from './HighlightsCard';

export default {
  title: 'HighlightsCard',
  component: HighlightsCard,
};

const TemplateDark = (args) => (
  <div className="max-w-[21.875rem]">
    <HighlightsCard {...args} />
  </div>
);

export const Dark = TemplateDark.bind({});
Dark.args = {
  title: 'What is TBD',
  thumbnail: '/img/placeholder-media-image.png',
  url: 'https://www.youtube.com/watch?v=NpuPm1FsUQk',
  type: 'video',
  duration: '9:22',
};
