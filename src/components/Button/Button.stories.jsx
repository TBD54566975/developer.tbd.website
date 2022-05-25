import React from 'react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;
export const Light = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Light.args = {
  label: 'Media',
  url: 'https://www.google.com',
};

const TemplateDark = (args) => (
  <div className="dark">
    <Button {...args} />
  </div>
);

export const Dark = TemplateDark.bind({});
Dark.args = {
  label: 'Media',
  url: 'https://www.google.com',
};
