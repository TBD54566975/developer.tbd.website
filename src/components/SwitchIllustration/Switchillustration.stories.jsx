import React from 'react';
import SwitchIllustration from './SwitchIllustration';
export default {
  title: 'SwitchIllustration',
  component: SwitchIllustration,
};

const Template = (args) => (
  <div className="">
    <SwitchIllustration {...args} />
  </div>
);
export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
  imgMobile: '/img/web5-mobile.svg',
  imgTablet: '/img/web5-tablet.svg',
  imgDesktop: '/img/web5-desktop.svg',
};
