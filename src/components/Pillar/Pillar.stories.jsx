import React from 'react';
import Pillar from './Pillar';

export default {
  title: 'Pillar',
  component: Pillar,
};

const Template = (args) => (
  <div>
    <Pillar {...args} />
  </div>
);
export const Dark = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Dark.args = {
  img: '/img/inclusivity-icon.svg',

  description:
    'Anyone with the capacity to contribute: can. We are proactive in welcoming a diverse contributor base for our code, documentation, developer relations, education, and communication efforts. Bad actors will be met with a published governance model and enforced code of conduct. Our users deserve representation in our development communities, and we promote varied perspectives and respectful debate.',
  title: 'INCLUSIVITY',
};
