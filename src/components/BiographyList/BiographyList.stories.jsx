/* eslint-disable quotes */
import React from 'react';
import BiographyList from './BiographyList';
export default {
  title: 'BiographyList',
  component: BiographyList,
};

const Template = (args) => <BiographyList {...args} />;
export const GrowToFit = Template.bind({});
GrowToFit.args = {
  growToFit: true,
  title: 'guests',
  biographies: [
    {
      imageUrl: '/img/person-example.png',
      headline: 'Daniel Buchner',
      description:
        'Daniel is a lorem ipsum dolor sit ameta consec tetur adipis cing elit.',
    },
    {
      imageUrl: '/img/person-example.png',
      headline: 'Kim Hamilton Duffy',
      description:
        'Kim is a lorem ipsum dolor sit ameta consec tetur adipis cing elit.',
    },
    {
      imageUrl: '/img/person-example.png',
      headline: 'Brooklyn Zelenka',
      description:
        'Brooklyn is a lorem ipsum dolor sit ameta consec tetur adipis cing elit.',
    },
  ],
};

export const FixedSize = Template.bind({});
FixedSize.args = {
  growToFit: false,
  title: 'guests',
  biographies: [
    {
      imageUrl: '/img/person-example.png',
      headline: 'Daniel Buchner',
      description:
        'Daniel is a lorem ipsum dolor sit ameta consec tetur adipis cing elit.',
    },
    {
      imageUrl: '/img/person-example.png',
      headline: 'Kim Hamilton Duffy',
      description:
        'Kim is a lorem ipsum dolor sit ameta consec tetur adipis cing elit.',
    },
    {
      imageUrl: '/img/person-example.png',
      headline: 'Brooklyn Zelenka',
      description:
        'Brooklyn is a lorem ipsum dolor sit ameta consec tetur adipis cing elit.',
    },
  ],
};
