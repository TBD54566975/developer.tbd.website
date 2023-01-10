import Audio from './Audio';
import React from 'react';

export default {
  title: 'Audio',
  component: Audio,
};

// eslint-disable-next-line react/react-in-jsx-scope
const Template = (args) => (
  <Audio
    {...args}
    config={{
      soundcloud: {
        options: {
          auto_play: false,
          buying: false,
          sharing: false,
          download: false,
          show_artwork: false,
          show_playcount: false,
          show_user: false,
          single_active: true,
          color: "#ffec19"
        },
      },
    }}
  />
);

export const Default = Template.bind({});

Default.args = {
  url: 'https://soundcloud.com/glennmorrison/beethoven-moonlight-sonata',
  options: '',
};
