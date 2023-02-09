import React from 'react';
import ButtonGroup from './ButtonGroup';

export default {
  title: 'ButtonGroup',
  component: ButtonGroup,
};

const Template = (args) => <ButtonGroup {...args} />;
export const Light = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Light.args = {
  buttons: [
    {
      type: 'button',
      data: { label: 'Learn more', url: '/learn-more' },
    },
    {
      type: 'button',
      data: { label: 'Media', url: '/media' },
    },
    {
      type: 'button',
      data: { label: 'Careers', url: '/careers' },
    },
  ],
};

const TemplateDark = (args) => (
  <div className="dark">
    <ButtonGroup {...args} />
  </div>
);

export const Dark = TemplateDark.bind({});
Dark.args = {
  buttons: [
    {
      type: 'button',
      data: { label: 'Learn more', url: '/learn-more' },
    },
    {
      type: 'button',
      data: { label: 'Media', url: '/media' },
    },
    {
      type: 'button',
      data: { label: 'Careers', url: '/careers' },
    },
  ],
};
