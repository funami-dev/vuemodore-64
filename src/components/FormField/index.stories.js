import V64FormField from './index.vue';

export default { title: 'FormField', component: V64FormField };

export const WithAnyControl = () => ({
  components: { V64FormField },
  template: `
    <V64FormField label="Filename" hint="Max 16 characters" block>
      <input slot-scope="field" :id="field.id" :aria-describedby="field.describedBy" />
    </V64FormField>
  `,
});

export const WithError = () => ({
  components: { V64FormField },
  template: `
    <V64FormField label="Filename" error="Syntax error" block>
      <input slot-scope="field" :id="field.id" :aria-describedby="field.describedBy" />
    </V64FormField>
  `,
});
