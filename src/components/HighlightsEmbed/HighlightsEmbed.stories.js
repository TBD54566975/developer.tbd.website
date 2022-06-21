import React from 'react';
import HighlightsEmbed from './HighlightsEmbed';

export default {
  title: 'HighlightsEmbed',
  component: HighlightsEmbed,
};

const TemplateDark = (args) => (
  <div className="max-w-[21.875rem]">
    <HighlightsEmbed {...args} />
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
