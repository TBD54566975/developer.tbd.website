import React from 'react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;
export const WithImage = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithImage.args = {
  label: 'View on Github',
  url: 'https://www.google.com',
  imageURL: '/img/github-button-icon.svg',
  colorDarkMode: 'cyan',
};

const TemplateDark = (args) => (
  <div className="dark">
    <Button {...args} />
  </div>
);

export const OnlyText = TemplateDark.bind({});
OnlyText.args = {
  label: 'Media',
  url: 'https://www.google.com',
  colorDarkMode: 'cyan',
};
