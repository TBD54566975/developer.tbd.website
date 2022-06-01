import React from 'react';
import Project from './Project';

export default {
  title: 'Project',
  component: Project,
};

const Template = (args) => <Project {...args} />;
export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
  textButton: 'Read More',
  url: 'https://www.google.com',
  // eslint-disable-next-line quotes
  description:
    'A playground as we iterate our way to a robust protocol. Mostly composed of tbDEX message schemas/formats and a mock PFI implementation.',
  title: 'OUR PHILOSOPHY',
  icon: '/img/component-icon.svg',
};
