import V64Link from './index.vue';

export default {
  title: 'Link',
  component: V64Link,
  argTypes: {
    content: { control: 'text', description: 'Default slot content' },
    click: { action: 'click' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Link },
  template: '<V64Link v-bind="$props" @click="click">{{ content }}</V64Link>',
});

export const Simple = Template.bind({});
Simple.args = { href: '#', content: 'Read the manual' };

export const External = Template.bind({});
External.args = { href: 'https://example.com', target: '_blank', content: 'Commodore' };

export const Disabled = Template.bind({});
Disabled.args = { href: '#', content: 'Not available', disabled: true };
