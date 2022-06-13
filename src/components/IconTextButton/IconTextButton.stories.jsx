import React from 'react';
import IconTextButton from './IconTextButton';
export default {
  title: 'IconTextButton',
  component: IconTextButton,
};

const TemplateDark = (args) => (
  <div className="dark">
    <IconTextButton {...args} />
  </div>
);

export const Dark = TemplateDark.bind({});
Dark.args = {
  data: {
    type: 'iconTextButton',
    data: {
      src: '/img/download-icon.svg',
      text: 'WEB5 PDF',
      buttons: [
        {
          type: 'button',
          data: {
            label: 'Download',
            url: '/docs/Decentralized Web Platform - Public.pdf',
          },
        },
      ],
    },
  },
};
