import React from 'react';
import HomeListItem from './HomeListItem';

export default {
  title: 'HomeListItem',
  component: HomeListItem,
};

const Template = (args) => (
  <div className="max-w-[450px]">
    <HomeListItem {...args} />
  </div>
);
export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
  label: 'Read More',
  url: 'https://www.google.com',
  // eslint-disable-next-line quotes
  text: "We're building open protocols, standards, and development communities. Our projects are open source because we want everyone in the economy to benefit: individuals, businesses, institutions, and government.",
  title: 'OUR PHILOSOPHY',
};
