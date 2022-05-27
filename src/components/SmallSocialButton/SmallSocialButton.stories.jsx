import React from 'react';
import SmallSocialButton from './SmallSocialButton';

export default {
  title: 'SmallSocialButton',
  component: SmallSocialButton,
};

const Template = (args) => <SmallSocialButton {...args} />;
export const Light = Template.bind({});

Light.args = {
  src: '/img/twitter-icon.svg',
  url: 'https://twitter.com/',
};

const TemplateDark = (args) => (
  <div className="dark">
    <SmallSocialButton {...args} />
  </div>
);

export const Dark = TemplateDark.bind({});

Dark.args = {
  src: '/img/twitter-icon.svg',
  url: 'https://twitter.com/',
};