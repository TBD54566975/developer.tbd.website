import Video from './Video';

export default {
  title: 'Video',
  component: Video,
};

// eslint-disable-next-line react/react-in-jsx-scope
const Template = (args) => <Video {...args} />;

export const Default = Template.bind({});

Default.args = {};
