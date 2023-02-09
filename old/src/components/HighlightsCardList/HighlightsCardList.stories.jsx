/* eslint-disable quotes */
import React from 'react';
import HighlightsCardList from './HighlightsCardList';
export default {
  title: 'HighlightsCardList',
  component: HighlightsCardList,
};

const Template = (args) => (
  <div className="">
    <HighlightsCardList {...args} />
  </div>
);
export const GrowToFit = Template.bind({});
GrowToFit.args = {
  title: 'HIGHLIGHTS',
  growToFit: true,
  highlights: [
    {
      title: 'What is TBD',
      thumbnail: '/img/placeholder-media-image.png',
      url: 'https://www.youtube.com/watch?v=NpuPm1FsUQk',
      type: 'video',
      duration: '9:22',
    },
    {
      title:
        'Lorem ipsum et dolor sit ametar consec tetur adipis cing elit ut dolor sit ameta consec tetur',
      thumbnail: '/img/placeholder-media-image.png',
      url: 'https://www.youtube.com/watch?v=NpuPm1FsUQk',
      type: 'video',
      duration: '9:22',
    },
    {
      title:
        'Lorem ipsum et dolor sit ametar consec tetur adipis cing elit ut dolor sit ameta consec tetur',
      thumbnail: '/img/placeholder-media-image.png',
      url: 'https://www.youtube.com/watch?v=NpuPm1FsUQk',
      type: 'video',
      duration: '9:22',
    },
  ],
};

export const FixedSize = Template.bind({});
FixedSize.args = {
  title: 'HIGHLIGHTS',
  growToFit: false,
  highlights: [
    {
      title: 'What is TBD',
      thumbnail: '/img/placeholder-media-image.png',
      url: 'https://www.youtube.com/watch?v=NpuPm1FsUQk',
      type: 'video',
      duration: '9:22',
    },
    {
      title:
        'Lorem ipsum et dolor sit ametar consec tetur adipis cing elit ut dolor sit ameta consec tetur',
      thumbnail: '/img/placeholder-media-image.png',
      url: 'https://www.youtube.com/watch?v=NpuPm1FsUQk',
      type: 'video',
      duration: '9:22',
    },
    {
      title:
        'Lorem ipsum et dolor sit ametar consec tetur adipis cing elit ut dolor sit ameta consec tetur',
      thumbnail: '/img/placeholder-media-image.png',
      url: 'https://www.youtube.com/watch?v=NpuPm1FsUQk',
      type: 'video',
      duration: '9:22',
    },
  ],
};
