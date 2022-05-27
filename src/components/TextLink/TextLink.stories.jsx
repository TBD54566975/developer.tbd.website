import TextLink from './TextLink';

export default {
  title: 'TextLink',
  component: TextLink,
};

const TemplateLight = (args) => (
  <div className="bg-primary-yellow">
    <TextLink {...args} />
  </div>
);
const TemplateDark = (args) => (
  <div className="dark bg-primary-black">
    <TextLink {...args} />
  </div>
);

export const Light = TemplateLight.bind({});
Light.args = {
  href: '#',
  text: 'Link',
};

export const Dark = TemplateDark.bind({});
Dark.args = {
  href: '#',
  text: 'Link',
};