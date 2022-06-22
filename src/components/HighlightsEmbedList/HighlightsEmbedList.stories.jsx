/* eslint-disable quotes */
import React from 'react';
import HighlightsEmbedList from './HighlightsEmbedList';
export default {
  title: 'HighlightsEmbedList',
  component: HighlightsEmbedList,
};

const Template = (args) => (
  <div className="">
    <HighlightsEmbedList {...args} />
  </div>
);
export const GrowToFit = Template.bind({});
GrowToFit.args = {
  title: 'HIGHLIGHTS',
  growToFit: true,
  highlights: [
    {
      title: 'What is TBD',
      url: 'https://vimeo.com/711912137',
    },
    {
      title: 'What is TBD',
      url: 'https://vimeo.com/711912137',
    },
    {
      title: 'What is TBD',
      url: 'https://vimeo.com/711912137',
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
      url: 'https://vimeo.com/711912137',
    },
    {
      title: 'What is TBD',
      url: 'https://vimeo.com/711912137',
    },
    {
      title: 'What is TBD',
      url: 'https://vimeo.com/711912137',
    },
  ],
};
