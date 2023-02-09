import { Divider } from '.';
import React from 'react';
export default {
  title: 'Divider',
  component: Divider,
  argTypes: {
    type: {
      options: ['slash', 'dotted'],
      control: { type: 'radio' },
    },
  },
};

const TemplateDark = (args) => (
  <div className="dark bg-primary-black">
    <Divider {...args} />
  </div>
);

export const Dark = TemplateDark.bind({});
Dark.args = {};
