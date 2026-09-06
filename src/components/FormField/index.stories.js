import V64FormField from './index.vue';

export default { title: 'FormField', component: V64FormField };

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { V64FormField },
  template: `
    <V64FormField v-bind="$props">
      <input slot-scope="field" :id="field.id" :aria-describedby="field.describedBy" />
    </V64FormField>
  `,
});

export const WithAnyControl = Template.bind({});
WithAnyControl.args = { label: 'Filename', hint: 'Max 16 characters', block: true };

export const WithError = Template.bind({});
WithError.args = { label: 'Filename', error: 'Syntax error', block: true };
