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
  url: 'https://vimeo.com/711912137',
};
