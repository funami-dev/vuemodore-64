import V64Terminal from './index.vue';

export default { title: 'Terminal', component: V64Terminal };

const lines = [
  '**** COMMODORE 64 BASIC V2 ****',
  '64K RAM SYSTEM  38911 BASIC BYTES FREE',
  '',
  'LOAD "*",8,1',
  'SEARCHING FOR *',
  'LOADING',
];

export const Printed = () => ({
  components: { V64Terminal },
  data: () => ({ lines }),
  template: "<V64Terminal :lines='lines' block />",
});

export const Typewriter = () => ({
  components: { V64Terminal },
  data: () => ({ lines }),
  template: "<V64Terminal :lines='lines' typewriter block />",
});

export const PromptOnly = () => ({
  components: { V64Terminal },
  template: '<V64Terminal block />',
});
