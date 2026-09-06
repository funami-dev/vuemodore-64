import V64Terminal from './index.vue';

export default {
  title: 'Terminal',
  component: V64Terminal,
  argTypes: { done: { action: 'done' } },
};

const lines = [
  '**** COMMODORE 64 BASIC V2 ****',
  '64K RAM SYSTEM  38911 BASIC BYTES FREE',
  '',
  'LOAD "*",8,1',
  'SEARCHING FOR *',
  'LOADING',
];

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64Terminal },
  template: '<V64Terminal v-bind="$props" @done="done" />',
});

export const Printed = Template.bind({});
Printed.args = { lines, block: true };

export const Typewriter = Template.bind({});
Typewriter.args = { lines, typewriter: true, block: true };

export const PromptOnly = Template.bind({});
PromptOnly.args = { block: true };
