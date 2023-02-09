import React from 'react';
import DetailsSummary from './DetailsSummary';

export default {
  title: 'DetailsSummary',
  component: DetailsSummary,
};

const Template = (args) => <DetailsSummary {...args} />;
export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
  details: 'Full Text',
  summary: 'View More',
};
