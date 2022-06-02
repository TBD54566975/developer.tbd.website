import { Actors } from '.';
import React from 'react';
import { content } from '@site/src/content/project-content-tbdex.js';
export default {
  title: 'Actors',
  component: Actors,
};

const TemplateDark = () => (
  <div className="dark bg-primary-black">
    <Actors content={content.actors} />
  </div>
);

export const Dark = TemplateDark.bind({});
