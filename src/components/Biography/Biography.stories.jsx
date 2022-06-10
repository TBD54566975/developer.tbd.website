import React from 'react';
import Biography from './Biography';
export default {
  title: 'Biography',
  component: Biography,
};

const Template = (args) => (
  <div className="">
    <Biography {...args} />
  </div>
);
export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
  imageUrl: '/img/person-example.png',
  headline: 'Daniel Buchner',
  description:
    'Daniel is a lorem ipsum dolor sit ameta consec tetur adipis cing elit.',
};
