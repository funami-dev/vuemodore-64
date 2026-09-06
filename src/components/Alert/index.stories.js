import V64Alert from './index.vue';

export default { title: 'Alert', component: V64Alert };

export const Error = () => ({
  components: { V64Alert },
  template: "<V64Alert variant='error' title='Syntax error'>Line 20</V64Alert>",
});

export const Warning = () => ({
  components: { V64Alert },
  template: "<V64Alert variant='warning'>Tape may be worn</V64Alert>",
});

export const Success = () => ({
  components: { V64Alert },
  template: "<V64Alert variant='success'>Saved to drive 8</V64Alert>",
});

export const Info = () => ({
  components: { V64Alert },
  template: '<V64Alert>38911 basic bytes free</V64Alert>',
});

export const Dismissible = () => ({
  components: { V64Alert },
  template: "<V64Alert variant='error' title='Device not present' dismissible block>Check the cable</V64Alert>",
});
