import Audio from './Audio';

export default {
  title: 'Audio',
  component: Audio,
};

// eslint-disable-next-line react/react-in-jsx-scope
const Template = (args) => <Audio {...args} />;

export const Default = Template.bind({});

Default.args = {
  url: 'https://soundcloud.com/glennmorrison/beethoven-moonlight-sonata',
};
