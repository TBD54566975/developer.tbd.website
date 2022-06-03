import React from 'react';
import TextBlock from './TextBlock';

export default {
  title: 'TextBlock',
  component: TextBlock,
};

const Template = (args) => <TextBlock {...args} />;
export const Light = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Light.args = {
  textH1: 'All projects in the TBD family are in early prototyping.',
  textH2:
    'New contributors should expect a pace of development consistent with nascent technology: larger commits, frequent refactoring, changing APIs, and incomplete feature sets.',
  text: [
    'We believe open source is not a publishing medium. \n' +
      'These projects are open from the start to welcome your interest, invite discussion, identify early issues, and advise on design.\n' +
      'The great power of the internet has been the democratization of information. With decentralized identity, TBD is reinventing the account model of the internet – to empower people to own their identities, unlock access to financial services, and regain privacy and control over how their personal data is used.',
  ],
};

const TemplateDark = (args) => (
  <div className="dark">
    <TextBlock {...args} />
  </div>
);

export const Dark = TemplateDark.bind({});
Dark.args = {
  textH1: 'All projects in the TBD family are in early prototyping.',
  textH2:
    'New contributors should expect a pace of development consistent with nascent technology: larger commits, frequent refactoring, changing APIs, and incomplete feature sets.',
  text: [
    'We believe open source is not a publishing medium. \n' +
      'These projects are open from the start to welcome your interest, invite discussion, identify early issues, and advise on design.\n' +
      'The great power of the internet has been the democratization of information. With decentralized identity, TBD is reinventing the account model of the internet – to empower people to own their identities, unlock access to financial services, and regain privacy and control over how their personal data is used.',
  ],
};
