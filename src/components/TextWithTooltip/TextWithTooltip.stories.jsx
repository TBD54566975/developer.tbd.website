import TextWithTooltip from './TextWithTooltip';
import React from 'react';

export default {
  title: 'TextWithTooltip',
  component: TextWithTooltip,
};

const TemplateDark = (args) => (
  <h1 className="h1 text-primary-yellow">
    <TextWithTooltip {...args} />
  </h1>
);

export const Dark = TemplateDark.bind({});
Dark.args = {
  content: [
    {
      type: 'text',
      data: 'We’re building the next generation of the ',
    },
    {
      type: 'tooltip',
      data: {
        trigger: 'decentralized',
        text: 'a network that is not controlled by a central entity',
      },
    },
    {
      type: 'text',
      data: ' web – returning data back to users. You’re welcome to join.',
    },
  ],
};
