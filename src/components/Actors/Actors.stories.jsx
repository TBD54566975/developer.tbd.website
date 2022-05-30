import { Actors } from '.';
import React from 'react';
export default {
  title: 'Actors',
  component: Actors,
};

const TemplateDark = () => (
  <div className="dark bg-primary-black">
    <Actors />
  </div>
);

export const Dark = TemplateDark.bind({});
