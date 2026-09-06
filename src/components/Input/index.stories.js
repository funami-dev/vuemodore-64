import V64Input from './index.vue';

export default {
  title: 'Input',
  component: V64Input,
};

export const Simple = () => ({
  components: { V64Input },
  data: () => ({ name: '' }),
  template: "<V64Input v-model='name' label='Your name' placeholder='ENTER NAME' />",
});

export const WithValue = () => ({
  components: { V64Input },
  data: () => ({ name: 'COMMODORE' }),
  template: "<V64Input v-model='name' label='Your name' />",
});

export const WithError = () => ({
  components: { V64Input },
  template: "<V64Input label='Filename' value='?' error='Syntax error' />",
});

export const Password = () => ({
  components: { V64Input },
  template: "<V64Input type='password' label='Password' value='basic' />",
});

export const Disabled = () => ({
  components: { V64Input },
  template: "<V64Input label='Device' value='TAPE' disabled />",
});
